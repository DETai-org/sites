"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type Phase = "idle" | "inhale_start" | "inhale_peak" | "inhale_fade";

type ParticleLayer = "ambient" | "stream";

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
  length: number;
  thickness: number;
  color: string;
  layer: ParticleLayer;
};

type CanvasLayerProps = {
  className?: string;
};

// Фиксированные интервалы фаз синхронизируются с запуском Hero-сцены
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

const GOLD_PALETTE = ["215, 186, 120", "226, 201, 146"]; // мягкие золотые оттенки бренда

export default function CanvasLayer({ className }: CanvasLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const frameRef = useRef<number>();
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const phaseRef = useRef<Phase>("idle");
  const particlesRef = useRef<Particle[]>([]);
  const spawnAccumulatorAmbientRef = useRef<number>(0);
  const spawnAccumulatorStreamRef = useRef<number>(0);
  const lastTimestampRef = useRef<number>(performance.now());
  const sizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  const switchPhase = (phase: Phase) => {
    phaseRef.current = phase;
    if (phase === "idle") {
      particlesRef.current = [];
      spawnAccumulatorAmbientRef.current = 0;
      spawnAccumulatorStreamRef.current = 0;
    }
  };

  const schedulePhases = () => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];

    const start = setTimeout(() => switchPhase("inhale_start"), TIMINGS.startDelay);
    const toPeak = setTimeout(
      () => switchPhase("inhale_peak"),
      TIMINGS.startDelay + TIMINGS.initiation,
    );
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

  const renderFrame = (
    context: CanvasRenderingContext2D,
    delta: number,
    width: number,
    height: number,
  ) => {
    context.clearRect(0, 0, width, height);
    const phase = phaseRef.current;
    const { spawnRate, speed, life, opacity } = PHASE_SETTINGS[phase];

    if (spawnRate > 0 && width > 0 && height > 0) {
      const streamFactor = 0.6; // доля новых частиц, уходящих в направленные потоки

      spawnAccumulatorAmbientRef.current += spawnRate * delta;
      while (spawnAccumulatorAmbientRef.current >= 1) {
        spawnAmbientParticles(width, height, speed, life, opacity);
        spawnAccumulatorAmbientRef.current -= 1;
      }

      spawnAccumulatorStreamRef.current += spawnRate * streamFactor * delta;
      while (spawnAccumulatorStreamRef.current >= 1) {
        spawnStreamParticles(width, height, speed, life, opacity);
        spawnAccumulatorStreamRef.current -= 1;
      }
    }

    particlesRef.current = particlesRef.current.reduce<Particle[]>((next, particle) => {
      const updated = updateParticle(particle, delta, width, height);
      if (updated) {
        drawParticle(context, updated);
        next.push(updated);
      }
      return next;
    }, []);
  };

  const spawnAmbientParticles = (
    width: number,
    height: number,
    speed: [number, number],
    life: [number, number],
    opacityRange: [number, number],
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const margin = Math.max(Math.min(width, height) * 0.025, 10);
    const radius = Math.min(width, height) * 0.16;

    const targets: Array<{
      spawn: () => [number, number];
      tx: number;
      ty: number;
    }> = [
      { spawn: () => [Math.random() * width, -margin], tx: centerX, ty: centerY - radius },
      { spawn: () => [Math.random() * width, height + margin], tx: centerX, ty: centerY + radius },
      { spawn: () => [-margin, Math.random() * height], tx: centerX - radius, ty: centerY },
      { spawn: () => [width + margin, Math.random() * height], tx: centerX + radius, ty: centerY },
    ];

    targets.forEach(({ spawn, tx, ty }) => {
      const [x, y] = spawn();
      const dx = tx - x;
      const dy = ty - y;
      const baseAngle = Math.atan2(dy, dx);
      const jitter = (Math.random() - 0.5) * 0.01; // почти прямые струи
      const swirl = (Math.random() - 0.5) * 0.04; // лёгкое втягивание воронки
      const angle = baseAngle + jitter + swirl;
      const velocity = randomBetween(speed[0], speed[1]);
      const length = randomBetween(5, 9);
      const thickness = randomBetween(1.6, 2.2);
      const opacity = randomBetween(opacityRange[0], opacityRange[1]);
      const particleLife = randomBetween(life[0], life[1]);
      const color = GOLD_PALETTE[Math.random() > 0.55 ? 1 : 0];

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        tx,
        ty,
        life: particleLife,
        initialLife: particleLife,
        opacity,
        length,
        thickness,
        color,
        layer: "ambient",
      });
    });

    // Контроль числа частиц, чтобы эффект оставался лёгким
    if (particlesRef.current.length > 360) {
      particlesRef.current.splice(0, particlesRef.current.length - 360);
    }
  };

  const spawnStreamParticles = (
    width: number,
    height: number,
    speed: [number, number],
    life: [number, number],
    opacityRange: [number, number],
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const logoRadius = Math.min(width, height) * 0.14;
    const spawnRadius = logoRadius * 2.2;

    const targets = [
      { angle: -Math.PI / 2 }, // сверху
      { angle: Math.PI / 2 }, // снизу
      { angle: Math.PI }, // слева
      { angle: 0 }, // справа
    ];

    targets.forEach(({ angle }) => {
      const spread = (Math.random() - 0.5) * 0.35; // ширина прорехи
      const a = angle + spread;

      const x = centerX + Math.cos(a) * spawnRadius;
      const y = centerY + Math.sin(a) * spawnRadius;

      const tx = centerX + Math.cos(angle) * logoRadius;
      const ty = centerY + Math.sin(angle) * logoRadius;

      const dx = tx - x;
      const dy = ty - y;
      const baseAngle = Math.atan2(dy, dx);
      const jitter = (Math.random() - 0.5) * 0.01; // почти прямые струи
      const swirl = (Math.random() - 0.5) * 0.04; // лёгкое втягивание воронки
      const angleWithSwirl = baseAngle + jitter + swirl;
      const velocity = randomBetween(speed[0], speed[1]);
      const length = randomBetween(5, 9);
      const thickness = randomBetween(1.6, 2.2);
      const opacity = randomBetween(opacityRange[0], opacityRange[1]);
      const particleLife = randomBetween(life[0], life[1]);
      const color = GOLD_PALETTE[Math.random() > 0.55 ? 1 : 0];

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angleWithSwirl) * velocity,
        vy: Math.sin(angleWithSwirl) * velocity,
        tx,
        ty,
        life: particleLife,
        initialLife: particleLife,
        opacity,
        length,
        thickness,
        color,
        layer: "stream",
      });
    });

    // Контроль числа частиц, чтобы эффект оставался лёгким
    if (particlesRef.current.length > 420) {
      particlesRef.current.splice(0, particlesRef.current.length - 420);
    }
  };

  const updateParticle = (
    particle: Particle,
    delta: number,
    width: number,
    height: number,
  ): Particle | null => {
    const damping = 0.993;
    const isStream = particle.layer === "stream";
    const pull = isStream ? 52 : 54;
    const swirlForce = isStream ? 24 : 0;
    const logoRadius = Math.min(width, height) * (isStream ? 0.14 : 0.16);
    const killRadius = isStream ? logoRadius * 0.35 : Math.min(width, height) * 0.025;
    const nextLife = particle.life - delta;
    if (nextLife <= 0) return null;

    const dx = particle.tx - particle.x;
    const dy = particle.ty - particle.y;
    const distance = Math.hypot(dx, dy);

    const ax = (dx / Math.max(distance, 1)) * pull * delta;
    const ay = (dy / Math.max(distance, 1)) * pull * delta;

    const txNorm = isStream ? -dy / Math.max(distance, 1) : 0;
    const tyNorm = isStream ? dx / Math.max(distance, 1) : 0;
    const sx = txNorm * swirlForce * delta;
    const sy = tyNorm * swirlForce * delta;

    const nx = particle.x + (particle.vx + ax + sx) * delta;
    const ny = particle.y + (particle.vy + ay + sy) * delta;

    // Лёгкое замедление для эффекта затухания
    const nvx = (particle.vx + ax + sx) * damping;
    const nvy = (particle.vy + ay + sy) * damping;

    if (nx < -width * 0.1 || nx > width * 1.1 || ny < -height * 0.1 || ny > height * 1.1) {
      return null;
    }

    let opacity = particle.opacity * 0.99;
    let length = particle.length;
    let thickness = particle.thickness;

    if (distance < killRadius) {
      if (isStream) {
        opacity *= 0.85;
        length *= 0.92;
      } else {
        return null; // базовый слой растворяется мгновенно у логотипа
      }
    }

    const lifeProgress = 1 - nextLife / particle.initialLife;
    const fadeIn = Math.min(lifeProgress * 3, 1);
    opacity *= fadeIn;

    return {
      ...particle,
      x: nx,
      y: ny,
      vx: nvx,
      vy: nvy,
      life: nextLife,
      opacity,
      length,
      thickness,
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

    const canvasElement = canvas;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    contextRef.current = context;

    // Подгоняем размер под контейнер сцены с учётом DPR, чтобы частицы не терялись
    const resize = () => {
      const parent = canvasElement.parentElement;
      const rect = parent?.getBoundingClientRect();
      const dpr = Math.max(window.devicePixelRatio || 1, 1);
      const width = rect?.width ?? 0;
      const height = rect?.height ?? 0;

      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      canvasElement.width = Math.round(width * dpr);
      canvasElement.height = Math.round(height * dpr);

      contextRef.current?.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { width, height };
    };

    resize();
    window.addEventListener("resize", resize);

    schedulePhases();
    lastTimestampRef.current = performance.now();
    frameRef.current = requestAnimationFrame(loop);

    function loop(timestamp: number) {
      const delta = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.05) * TIME_SCALE;
      lastTimestampRef.current = timestamp;
      const ctx = contextRef.current;
      if (ctx) {
        renderFrame(ctx, delta, sizeRef.current.width, sizeRef.current.height);
      }
      frameRef.current = requestAnimationFrame(loop);
    }

    return () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id));
      cancelAnimationFrame(frameRef.current ?? 0);
      window.removeEventListener("resize", resize);
      contextRef.current = null;
    };
  }, []);

  return <canvas ref={canvasRef} className={cn("absolute inset-0 pointer-events-none", className)} aria-hidden />;
}
