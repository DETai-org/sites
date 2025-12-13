"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type Phase = "idle" | "inhale_start" | "inhale_peak" | "inhale_fade";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  opacity: number;
  size: number;
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

const PHASE_SETTINGS: Record<Phase, { spawnRate: number; speed: [number, number] }> = {
  idle: { spawnRate: 0, speed: [0, 0] },
  inhale_start: { spawnRate: 18, speed: [45, 65] },
  inhale_peak: { spawnRate: 30, speed: [60, 90] },
  inhale_fade: { spawnRate: 10, speed: [35, 55] },
};

const BASE_COLOR = "242, 229, 194"; // оттенок accent.soft из дизайн-токенов

export default function CanvasLayer({ className }: CanvasLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>();
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const phaseRef = useRef<Phase>("idle");
  const particlesRef = useRef<Particle[]>([]);
  const spawnAccumulatorRef = useRef<number>(0);
  const lastTimestampRef = useRef<number>(performance.now());

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
    const { spawnRate, speed } = PHASE_SETTINGS[phase];

    if (spawnRate > 0 && width > 0 && height > 0) {
      spawnAccumulatorRef.current += spawnRate * delta;
      while (spawnAccumulatorRef.current >= 1) {
        spawnParticles(width, height, speed);
        spawnAccumulatorRef.current -= 1;
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

  const spawnParticles = (width: number, height: number, speed: [number, number]) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const margin = Math.max(Math.min(width, height) * 0.02, 8);
    const directions: Array<[number, number]> = [
      [Math.random() * width, -margin],
      [Math.random() * width, height + margin],
      [-margin, Math.random() * height],
      [width + margin, Math.random() * height],
    ];

    directions.forEach(([x, y]) => {
      const dx = centerX - x;
      const dy = centerY - y;
      const baseAngle = Math.atan2(dy, dx);
      const jitter = (Math.random() - 0.5) * 0.08; // лёгкое дыхание траектории
      const angle = baseAngle + jitter;
      const velocity = randomBetween(speed[0], speed[1]);
      const size = randomBetween(0.8, 1.8);
      const opacity = randomBetween(0.05, 0.15);

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: randomBetween(0.9, 1.5),
        opacity,
        size,
      });
    });

    // Контроль числа частиц, чтобы эффект оставался лёгким
    if (particlesRef.current.length > 220) {
      particlesRef.current.splice(0, particlesRef.current.length - 220);
    }
  };

  const updateParticle = (
    particle: Particle,
    delta: number,
    width: number,
    height: number,
  ): Particle | null => {
    const damping = 0.95;
    const nextLife = particle.life - delta;
    if (nextLife <= 0) return null;

    const nx = particle.x + particle.vx * delta;
    const ny = particle.y + particle.vy * delta;

    // Лёгкое замедление для эффекта затухания
    const nvx = particle.vx * damping;
    const nvy = particle.vy * damping;

    if (nx < -width * 0.1 || nx > width * 1.1 || ny < -height * 0.1 || ny > height * 1.1) {
      return null;
    }

    return {
      ...particle,
      x: nx,
      y: ny,
      vx: nvx,
      vy: nvy,
      life: nextLife,
      opacity: particle.opacity * 0.985,
    };
  };

  const drawParticle = (context: CanvasRenderingContext2D, particle: Particle) => {
    context.beginPath();
    context.fillStyle = `rgba(${BASE_COLOR}, ${particle.opacity.toFixed(3)})`;
    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    context.fill();
  };

  const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const canvasElement = canvas;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const ctx = context;

    // Подгоняем размер под контейнер сцены
    const resize = () => {
      const parent = canvasElement.parentElement;
      const rect = parent?.getBoundingClientRect();
      canvasElement.width = rect?.width ?? 0;
      canvasElement.height = rect?.height ?? 0;
    };

    resize();
    window.addEventListener("resize", resize);

    schedulePhases();
    lastTimestampRef.current = performance.now();
    frameRef.current = requestAnimationFrame(loop);

    function loop(timestamp: number) {
      const delta = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.05);
      lastTimestampRef.current = timestamp;
      renderFrame(ctx, delta, canvasElement.width, canvasElement.height);
      frameRef.current = requestAnimationFrame(loop);
    }

    return () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id));
      cancelAnimationFrame(frameRef.current ?? 0);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={cn("absolute inset-0 pointer-events-none", className)} aria-hidden />;
}
