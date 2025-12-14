"use client";

import { type RefObject, useEffect, useRef } from "react";

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
  opacity: number;
  length: number;
  thickness: number;
  color: string;
};

type CanvasGlobalParticlesLayerProps = {
  className?: string;
  anchorRef?: RefObject<HTMLElement | null>;
};

const TIMINGS = {
  startDelay: 2200,
  initiation: 900,
  peak: 1100,
  fade: 1400,
};

const TIME_SCALE = 2.0;

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

export default function CanvasGlobalParticlesLayer({ className, anchorRef }: CanvasGlobalParticlesLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const frameRef = useRef<number>();
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const phaseRef = useRef<Phase>("idle");

  const particlesRef = useRef<Particle[]>([]);
  const spawnAccumulatorRef = useRef<number>(0);

  const lastTimestampRef = useRef<number>(performance.now());
  const dprRef = useRef<number>(1);
  const deltaSamplesRef = useRef<number[]>([]);
  const deltaSumRef = useRef<number>(0);
  const isRunningRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);
  const coarsePointerRef = useRef<boolean>(false);
  const resizeScheduledRef = useRef<boolean>(false);

  const metricsRef = useRef<{ width: number; height: number; centerX: number; centerY: number; anchorSize: number }>(
    {
      width: 0,
      height: 0,
      centerX: 0,
      centerY: 0,
      anchorSize: 0,
    },
  );

  const switchPhase = (phase: Phase) => {
    phaseRef.current = phase;
    if (phase === "idle") {
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
      const overlayRateScale = 1.0;
      spawnAccumulatorRef.current += spawnRate * overlayRateScale * delta;
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
    const { centerX, centerY } = metricsRef.current;

    const spawnSpread = Math.min(width, height) * 0.4;

    const targets: Array<{
      spawn: () => [number, number];
      tx: number;
      ty: number;
    }> = [
      {
        spawn: () => [
          randomBetween(-spawnSpread, width + spawnSpread),
          randomBetween(-spawnSpread, height + spawnSpread),
        ],
        tx: centerX,
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

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        tx,
        ty,
        life: randomBetween(life[0], life[1]),
        opacity,
        length,
        thickness,
        color,
      });
    });

    if (particlesRef.current.length > 320) {
      particlesRef.current.splice(0, particlesRef.current.length - 320);
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

    const distNorm = Math.min(distance / (Math.min(width, height) * 0.5), 1);

    const pullFactor = 0.7 + (1 - distNorm) * 0.6;

    const earlyBoost = lifeRatio > 0.75 ? 2.0 : 1.0;

    const ax = (dx / Math.max(distance, 1)) * pull * pullFactor * earlyBoost * delta;
    const ay = (dy / Math.max(distance, 1)) * pull * pullFactor * earlyBoost * delta;

    const nx = particle.x + (particle.vx + ax) * delta;
    const ny = particle.y + (particle.vy + ay) * delta;

    const nvx = (particle.vx + ax) * damping;
    const nvy = (particle.vy + ay) * damping;

    if (distance < Math.min(width, height) * 0.025) {
      particle.opacity *= 0.9;
    }

    return {
      ...particle,
      x: nx,
      y: ny,
      vx: nvx,
      vy: nvy,
      life: nextLife,
      opacity: particle.opacity * 0.99,
    };
  };

  const drawParticle = (context: CanvasRenderingContext2D, particle: Particle) => {
    const angle = Math.atan2(particle.vy, particle.vx);
    context.save();
    context.translate(particle.x, particle.y);
    context.rotate(angle);
    context.beginPath();
    context.strokeStyle = `rgba(${particle.color}, ${particle.opacity.toFixed(3)})`;
    context.lineWidth = particle.thickness;
    context.lineCap = "round";
    context.moveTo(-particle.length * 0.2, 0);
    context.lineTo(particle.length * 0.8, 0);
    context.stroke();
    context.restore();
  };

  const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    contextRef.current = context;

    const performResize = () => {
      const dpr = dprRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      contextRef.current?.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rect = anchorRef?.current?.getBoundingClientRect();
      const centerX = rect ? rect.left + rect.width / 2 : width / 2;
      const centerY = rect ? rect.top + rect.height / 2 : height / 2;
      const anchorSize = Math.min(rect?.width ?? width, rect?.height ?? height);

      metricsRef.current = {
        width,
        height,
        centerX,
        centerY,
        anchorSize,
      };

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
      if (isRunningRef.current) return;
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
      if (document.visibilityState === "hidden" || !isVisibleRef.current) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    const resizeObserver = anchorRef?.current ? new ResizeObserver(() => scheduleResize()) : null;

    performResize();
    window.addEventListener("resize", scheduleResize);
    window.addEventListener("scroll", scheduleResize, { passive: true });
    if (anchorRef?.current && resizeObserver) {
      resizeObserver.observe(anchorRef.current);
    }

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

      const ctx = contextRef.current;
      if (ctx) renderFrame(ctx, delta);

      if (isRunningRef.current) {
        frameRef.current = requestAnimationFrame(loop);
      }
    }

    const visibilityHandler = () => evaluateActivity();

    const target = anchorRef?.current ?? document.documentElement;
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

    document.addEventListener("visibilitychange", visibilityHandler);
    evaluateActivity();

    return () => {
      stopAnimation();
      window.removeEventListener("resize", scheduleResize);
      window.removeEventListener("scroll", scheduleResize);
      resizeObserver?.disconnect();
      pointerQuery.removeEventListener("change", pointerListener);
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", visibilityHandler);
      contextRef.current = null;
    };
  }, [anchorRef]);

  return <canvas ref={canvasRef} className={cn("fixed inset-0 pointer-events-none z-20", className)} aria-hidden />;
}
