"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type Phase = "idle" | "inhale_start" | "inhale_peak" | "inhale_fade";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  life: number;
  initialLife: number;
  opacity: number;
  baseOpacity: number;
  blur: number;
  length: number;
  thickness: number;
  color: string;
  initialDistance: number;
  edgeParticipant: boolean;
  edgeFadeUntil: number;
  edgeOpacityFactor: number;
  blurParticipant: boolean;
  blurStrength: number;
  mode: "inbound" | "outbound";
  canGoOutbound: boolean;
  outboundAngle: number | null;
  outboundSpeed: number | null;
};

type CanvasLocalParticlesLayerProps = {
  className?: string;
};

const TIMINGS = {
  startDelay: 2200,
  initiation: 900,
  peak: 1100,
  fade: 2400,
};

const TIME_SCALE = 1.2;

const PHASE_SETTINGS: Record<
  Phase,
  { spawnRate: number; speed: [number, number]; life: [number, number]; opacity: [number, number] }
> = {
  idle: { spawnRate: 0, speed: [0, 0], life: [0, 0], opacity: [0, 0] },
  inhale_start: { spawnRate: 32, speed: [72, 98], life: [2.6, 3.4], opacity: [0.32, 0.44] },
  inhale_peak: { spawnRate: 58, speed: [108, 138], life: [4.8, 5.4], opacity: [0.36, 0.5] },
  inhale_fade: { spawnRate: 10, speed: [46, 66], life: [1.2, 1.8], opacity: [0.24, 0.34] },
};

const GOLD_PALETTE = ["215, 186, 120", "226, 201, 146"];

const MAX_BLUR = 8.5;
const BLUR_CHANCE_RANGE: [number, number] = [0.5, 0.65];
const BLUR_STRENGTH_RANGE: [number, number] = [0.45, 1.05];
const EDGE_OPACITY_CHANCE = 0.2;
const EDGE_OPACITY_SOFT_RANGE: [number, number] = [0.65, 0.82];
const EDGE_OPACITY_STRONG_RANGE: [number, number] = [0.15, 0.35];
const EDGE_FADE_RANGE: [number, number] = [0.2, 0.5];
const OUTBOUND_CHANCE = 0.16;
const OUTBOUND_LIFE_BONUS = 1.0;
const OUTBOUND_OPACITY_DECAY = 0.995;
const INBOUND_OPACITY_DECAY = 0.99;

export default function CanvasLocalParticlesLayer({ className }: CanvasLocalParticlesLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const frameRef = useRef<number>();
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const phaseRef = useRef<Phase>("idle");
  const hasCompletedRef = useRef<boolean>(false);

  const particlesRef = useRef<Particle[]>([]);
  const spawnAccumulatorRef = useRef<number>(0);

  const lastTimestampRef = useRef<number>(performance.now());
  const dprRef = useRef<number>(1);
  const deltaSamplesRef = useRef<number[]>([]);
  const deltaSumRef = useRef<number>(0);
  const coarsePointerRef = useRef<boolean>(false);
  const isRunningRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);
  const resizeScheduledRef = useRef<boolean>(false);

  const metricsRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  const switchPhase = (phase: Phase) => {
    const previousPhase = phaseRef.current;
    phaseRef.current = phase;
    if (phase === "idle") {
      if (previousPhase !== "idle") {
        hasCompletedRef.current = true;
      }
      particlesRef.current = [];
      spawnAccumulatorRef.current = 0;
    }
  };

  const schedulePhases = () => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];

    const start = setTimeout(() => switchPhase("inhale_start"), TIMINGS.startDelay);
    const toPeak = setTimeout(() => switchPhase("inhale_peak"), TIMINGS.startDelay + TIMINGS.initiation);
    const toFade = setTimeout(
      () => switchPhase("inhale_fade"),
      TIMINGS.startDelay + TIMINGS.initiation + TIMINGS.peak,
    );
    const toIdle = setTimeout(
      () => switchPhase("idle"),
      TIMINGS.startDelay + TIMINGS.initiation + TIMINGS.peak + TIMINGS.fade,
    );

    timeoutsRef.current.push(start, toPeak, toFade, toIdle);
  };

  const renderFrame = (context: CanvasRenderingContext2D, delta: number) => {
    const m = metricsRef.current;
    const phase = phaseRef.current;
    const { spawnRate, speed, life, opacity } = PHASE_SETTINGS[phase];

    context.clearRect(0, 0, m.width, m.height);

    if (spawnRate > 0 && m.width > 0 && m.height > 0) {
      spawnAccumulatorRef.current += spawnRate * delta;
      while (spawnAccumulatorRef.current >= 1) {
        spawnParticlesLayer(m.width, m.height, speed, life, opacity);
        spawnAccumulatorRef.current -= 1;
      }
    }

    particlesRef.current = particlesRef.current.reduce<Particle[]>((next, particle) => {
      const updated = updateParticle(particle, delta, m.width, m.height);
      if (updated) {
        drawParticle(context, updated);
        next.push(updated);
      }
      return next;
    }, []);
  };

  const spawnParticlesLayer = (
    width: number,
    height: number,
    speed: [number, number],
    life: [number, number],
    opacityRange: [number, number],
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const margin = Math.min(width, height) * 0.03;
    const spawnSpread = Math.min(width, height) * 0.18;
    const SPAWN_SIDE_MULTIPLIER = {
      top: 1.9,
      left: 1.7,
      right: 1.0,
      bottom: 1.0,
    };


    const radius = Math.min(width, height) * 0.16;

    const targets: Array<{
      spawn: () => [number, number];
      tx: number;
      ty: number;
    }> = [
      {
        spawn: () => [
          Math.random() * width,
          -margin +
            randomBetween(
              -spawnSpread * SPAWN_SIDE_MULTIPLIER.top,
              spawnSpread * SPAWN_SIDE_MULTIPLIER.top,
            ),
        ],
        tx: centerX,
        ty: centerY - radius,
      },
      {
        spawn: () => [Math.random() * width, height + margin + randomBetween(-spawnSpread, spawnSpread)],
        tx: centerX,
        ty: centerY + radius,
      },
      {
        spawn: () => [
          -margin +
            randomBetween(
              -spawnSpread * SPAWN_SIDE_MULTIPLIER.left,
              spawnSpread * SPAWN_SIDE_MULTIPLIER.left,
            ),
          Math.random() * height,
        ],
        tx: centerX - radius,
        ty: centerY,
      },
      {
        spawn: () => [width + margin + randomBetween(-spawnSpread, spawnSpread), Math.random() * height],
        tx: centerX + radius,
        ty: centerY,
      },
    ];

    targets.forEach(({ spawn, tx, ty }) => {
      const [x, y] = spawn();
      const dx = tx - x;
      const dy = ty - y;
      const baseAngle = Math.atan2(dy, dx);
      const jitter = (Math.random() - 0.5) * 0.01;
      const swirl = (Math.random() - 0.5) * 0.04;
      const angle = baseAngle + jitter + swirl;

      const velocity = randomBetween(speed[0], speed[1]);
      const length = randomBetween(5, 9);
      const thickness = randomBetween(1.6, 2.2);
      const opacity = randomBetween(opacityRange[0], opacityRange[1]);
      const color = GOLD_PALETTE[Math.random() > 0.55 ? 1 : 0];
      const initialDistance = Math.hypot(dx, dy);
      const blurClusterChance = clusteredChance(x, y, width, height, BLUR_CHANCE_RANGE);
      const blurParticipant = Math.random() < blurClusterChance;
      const blurStrength = blurParticipant ? randomBetween(BLUR_STRENGTH_RANGE[0], BLUR_STRENGTH_RANGE[1]) : 0;
      const edgeParticipant = Math.random() < EDGE_OPACITY_CHANCE;
      const edgeFadeUntil = edgeParticipant ? randomBetween(EDGE_FADE_RANGE[0], EDGE_FADE_RANGE[1]) : 0;
      const edgeOpacityFactor = edgeParticipant
        ? Math.random() < 0.45
          ? randomBetween(EDGE_OPACITY_STRONG_RANGE[0], EDGE_OPACITY_STRONG_RANGE[1])
          : randomBetween(EDGE_OPACITY_SOFT_RANGE[0], EDGE_OPACITY_SOFT_RANGE[1])
        : 1;
      const canGoOutbound = Math.random() < OUTBOUND_CHANCE;

      const lifespan = randomBetween(life[0], life[1]);

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        tx,
        ty,
        life: lifespan,
        initialLife: lifespan,
        opacity,
        baseOpacity: opacity,
        blur: 0,
        length,
        thickness,
        color,
        initialDistance,
        edgeParticipant,
        edgeFadeUntil,
        edgeOpacityFactor,
        blurParticipant,
        blurStrength,
        mode: "inbound",
        canGoOutbound,
        outboundAngle: null,
        outboundSpeed: null,
      });
    });

    if (particlesRef.current.length > 260) {
      particlesRef.current.splice(0, particlesRef.current.length - 260);
    }
  };

  const updateParticle = (particle: Particle, delta: number, width: number, height: number): Particle | null => {
    const damping = 0.993;
    const pull = 84;

    const nextLife = particle.life - delta;
    if (nextLife <= 0) return null;

    const lifeRatio = particle.life / (particle.life + delta);

    const dx = particle.tx - particle.x;
    const dy = particle.ty - particle.y;
    const distance = Math.hypot(dx, dy);
    const minDimension = Math.min(width, height);

    const distNorm = Math.min(distance / (minDimension * 0.5), 1);
    const edgeEase = easeOutCubic(Math.pow(distNorm, 1.12));
    const blur = particle.blurParticipant ? MAX_BLUR * particle.blurStrength * Math.pow(edgeEase, 1.4) : 0;

    const pullFactor = 0.7 + (1 - distNorm) * 0.6;
    const earlyBoost = lifeRatio > 0.75 && particle.mode === "inbound" ? 2.0 : 1.0;

    const directionX = dx / Math.max(distance, 1);
    const directionY = dy / Math.max(distance, 1);

    const outboundThreshold = minDimension * 0.04;
    const shouldSwitchOutbound =
      particle.mode === "inbound" && particle.canGoOutbound && distance < outboundThreshold;

    const outboundAngleJitter = (Math.random() - 0.5) * 0.25;
    const outboundDirAngle =
      particle.outboundAngle ?? Math.atan2(-directionY, -directionX) + outboundAngleJitter;
    const outboundSpeed = particle.outboundSpeed ?? randomBetween(64, 108);

    const ax =
      particle.mode === "inbound"
        ? directionX * pull * pullFactor * earlyBoost * delta
        : Math.cos(outboundDirAngle) * pull * 0.12 * delta;
    const ay =
      particle.mode === "inbound"
        ? directionY * pull * pullFactor * earlyBoost * delta
        : Math.sin(outboundDirAngle) * pull * 0.12 * delta;

    const nx = particle.x + (particle.vx + ax) * delta;
    const ny = particle.y + (particle.vy + ay) * delta;

    const nvx =
      particle.mode === "inbound"
        ? (particle.vx + ax) * damping
        : (Math.cos(outboundDirAngle) * outboundSpeed + particle.vx * 0.6) * damping;
    const nvy =
      particle.mode === "inbound"
        ? (particle.vy + ay) * damping
        : (Math.sin(outboundDirAngle) * outboundSpeed + particle.vy * 0.6) * damping;

    const travelProgress = particle.initialDistance
      ? clamp(1 - distance / particle.initialDistance, 0, 1)
      : 1;

    const edgeOpacityBlend =
      particle.edgeParticipant && particle.mode === "inbound"
        ? lerp(
            particle.edgeOpacityFactor,
            1,
            easeOutQuad(clamp(travelProgress / Math.max(particle.edgeFadeUntil, 0.0001), 0, 1)),
          )
        : 1;

    const opacityDecay =
      particle.mode === "outbound" ? OUTBOUND_OPACITY_DECAY : INBOUND_OPACITY_DECAY;

    const nearCenterFade = particle.mode === "inbound" && distance < minDimension * 0.025 ? 0.9 : 1;

    const nextBaseOpacity = particle.baseOpacity * opacityDecay * nearCenterFade;
    const updatedOpacity = nextBaseOpacity * edgeOpacityBlend;

    const nextMode = shouldSwitchOutbound ? "outbound" : particle.mode;
    const nextLifeValue = shouldSwitchOutbound ? nextLife + OUTBOUND_LIFE_BONUS : nextLife;
    const nextOutboundAngle = shouldSwitchOutbound ? outboundDirAngle : particle.outboundAngle;
    const nextOutboundSpeed = shouldSwitchOutbound ? outboundSpeed : particle.outboundSpeed;

    return {
      ...particle,
      x: nx,
      y: ny,
      vx: nvx,
      vy: nvy,
      life: nextLifeValue,
      opacity: updatedOpacity,
      baseOpacity: nextBaseOpacity,
      blur,
      mode: nextMode,
      outboundSpeed: nextOutboundSpeed,
      outboundAngle: nextOutboundAngle,
    };
  };

  const drawParticle = (context: CanvasRenderingContext2D, particle: Particle) => {
    const angle = Math.atan2(particle.vy, particle.vx);
    context.save();
    context.translate(particle.x, particle.y);
    context.rotate(angle);
    context.beginPath();
    context.filter = `blur(${particle.blur.toFixed(2)}px)`;
    context.strokeStyle = `rgba(${particle.color}, ${particle.opacity.toFixed(3)})`;
    context.lineWidth = particle.thickness;
    context.lineCap = "round";
    context.moveTo(-particle.length * 0.2, 0);
    context.lineTo(particle.length * 0.8, 0);
    context.stroke();
    context.filter = "none";
    context.restore();
  };

  const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;
  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
  const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
  const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const clusteredChance = (
    x: number,
    y: number,
    width: number,
    height: number,
    [minChance, maxChance]: [number, number],
  ) => {
    const nx = width ? x / width : 0;
    const ny = height ? y / height : 0;
    const wave =
      (Math.sin(nx * 9.3 + ny * 5.1) +
        Math.sin(nx * 4.7 - ny * 8.2) * 0.6 +
        Math.sin((nx + ny) * 3.3) * 0.4 +
        2) /
      4;
    return lerp(minChance, maxChance, clamp(wave, 0, 1));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    contextRef.current = context;

    const performResize = () => {
      const dpr = dprRef.current;
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();

      const width = rect?.width ?? 0;
      const height = rect?.height ?? 0;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      contextRef.current?.setTransform(dpr, 0, 0, dpr, 0, 0);

      metricsRef.current = { width, height };

      resizeScheduledRef.current = false;
    };

    const scheduleResize = () => {
      if (resizeScheduledRef.current) return;
      resizeScheduledRef.current = true;
      requestAnimationFrame(performResize);
    };

    const updateDpr = (avgDelta: number) => {
      const deviceDpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const lowFps = avgDelta > 0.03;
      const highFps = avgDelta < 0.022;
      const currentDpr = dprRef.current;
      let nextDpr = currentDpr;

      if (coarsePointerRef.current || lowFps) {
        nextDpr = 1;
      } else if (highFps) {
        nextDpr = deviceDpr;
      }

      if (nextDpr !== currentDpr) {
        dprRef.current = nextDpr;
        scheduleResize();
      }
    };

    const startAnimation = () => {
      if (isRunningRef.current || hasCompletedRef.current) return;
      isRunningRef.current = true;
      schedulePhases();
      lastTimestampRef.current = performance.now();
      frameRef.current = requestAnimationFrame(loop);
    };

    const stopAnimation = () => {
      if (!isRunningRef.current) return;
      isRunningRef.current = false;
      timeoutsRef.current.forEach((id) => clearTimeout(id));
      timeoutsRef.current = [];
      cancelAnimationFrame(frameRef.current ?? 0);
    };

    const evaluateActivity = () => {
      if (hasCompletedRef.current) return;
      if (document.visibilityState === "hidden" || !isVisibleRef.current) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    const resizeObserver = new ResizeObserver(() => scheduleResize());

    performResize();
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener("resize", scheduleResize);

    function loop(timestamp: number) {
      const delta = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.05) * TIME_SCALE;
      lastTimestampRef.current = timestamp;

      deltaSamplesRef.current.push(delta);
      deltaSumRef.current += delta;
      if (deltaSamplesRef.current.length > 30) {
        deltaSumRef.current -= deltaSamplesRef.current.shift() ?? 0;
      }

      const avgDelta = deltaSumRef.current / deltaSamplesRef.current.length;
      updateDpr(avgDelta);

      if (hasCompletedRef.current && phaseRef.current === "idle") {
        isRunningRef.current = false;
        return;
      }

      const ctx = contextRef.current;
      if (ctx) renderFrame(ctx, delta);

      if (isRunningRef.current) {
        frameRef.current = requestAnimationFrame(loop);
      }
    }

    const target = canvas.parentElement ?? document.documentElement;
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === target) {
          isVisibleRef.current = entry.isIntersecting;
          evaluateActivity();
        }
      });
    });

    const pointerQuery = window.matchMedia("(pointer: coarse)");
    coarsePointerRef.current = pointerQuery.matches;
    const pointerListener = (event: MediaQueryListEvent) => {
      coarsePointerRef.current = event.matches;
      updateDpr(deltaSumRef.current / Math.max(deltaSamplesRef.current.length, 1));
    };

    pointerQuery.addEventListener("change", pointerListener);

    if (target) {
      intersectionObserver.observe(target);
    }

    const visibilityHandler = () => evaluateActivity();
    document.addEventListener("visibilitychange", visibilityHandler);
    evaluateActivity();

    return () => {
      stopAnimation();
      window.removeEventListener("resize", scheduleResize);
      resizeObserver.disconnect();
      pointerQuery.removeEventListener("change", pointerListener);
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", visibilityHandler);
      contextRef.current = null;
    };
  }, []);

  return <canvas ref={canvasRef} className={cn("absolute inset-0 pointer-events-none z-10", className)} aria-hidden />;
}
