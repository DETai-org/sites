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
  opacity: number;
  length: number;
  thickness: number;
  color: string;
};

type CanvasParticlesLayerProps = {
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

export default function CanvasParticlesLayer({ className }: CanvasParticlesLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const frameRef = useRef<number>();
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const phaseRef = useRef<Phase>("idle");

  // =========================
  // СЛОЙ A (BASE) — твой исходный эффект 1-в-1, привязан к hero-rect
  // =========================
  const baseParticlesRef = useRef<Particle[]>([]);
  const baseSpawnAccumulatorRef = useRef<number>(0);

  // =========================
  // СЛОЙ B (OVERLAY) — доп. поток слева + дальние спавны, «пыль поверх всего»
  // =========================
  const overlayParticlesRef = useRef<Particle[]>([]);
  const overlaySpawnAccumulatorRef = useRef<number>(0);

  const lastTimestampRef = useRef<number>(performance.now());

  // Метрики viewport + якорь (hero-rect)
  const metricsRef = useRef<{
    width: number;
    height: number;
    // центр логотипа/якоря в КООРДИНАТАХ VIEWPORT (canvas fixed)
    centerX: number;
    centerY: number;
    // размер якоря = min(w,h) hero-rect
    anchorSize: number;
    // hero-rect в координатах viewport
    rectLeft: number;
    rectTop: number;
    rectWidth: number;
    rectHeight: number;
  }>({
    width: 0,
    height: 0,
    centerX: 0,
    centerY: 0,
    anchorSize: 0,
    rectLeft: 0,
    rectTop: 0,
    rectWidth: 0,
    rectHeight: 0,
  });

  const switchPhase = (phase: Phase) => {
    phaseRef.current = phase;
    if (phase === "idle") {
      baseParticlesRef.current = [];
      overlayParticlesRef.current = [];
      baseSpawnAccumulatorRef.current = 0;
      overlaySpawnAccumulatorRef.current = 0;
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

  const renderFrame = (context: CanvasRenderingContext2D, delta: number) => {
    const m = metricsRef.current;
    const phase = phaseRef.current;
    const { spawnRate, speed, life, opacity } = PHASE_SETTINGS[phase];

    // очищаем ВЕСЬ viewport-canvas
    context.clearRect(0, 0, m.width, m.height);

    // ---------- СЛОЙ A (BASE): спавн/обновление в координатах hero-rect ----------
    if (spawnRate > 0 && m.rectWidth > 0 && m.rectHeight > 0) {
      baseSpawnAccumulatorRef.current += spawnRate * delta;
      while (baseSpawnAccumulatorRef.current >= 1) {
        spawnParticlesBaseLayer(
          m.rectLeft,
          m.rectTop,
          m.rectWidth,
          m.rectHeight,
          speed,
          life,
          opacity,
        );
        baseSpawnAccumulatorRef.current -= 1;
      }
    }

    baseParticlesRef.current = baseParticlesRef.current.reduce<Particle[]>((next, particle) => {
      const updated = updateParticle(particle, delta, m.width, m.height);
      if (updated) {
        drawParticle(context, updated);
        next.push(updated);
      }
      return next;
    }, []);

    // ---------- СЛОЙ B (OVERLAY): доп. поток слева + дальние спавны по viewport ----------
    if (spawnRate > 0 && m.width > 0 && m.height > 0) {
      // Можно слегка усилить второй слой относительно базового
      const overlayRateScale = 1.0; // хочешь плотнее — поставь 1.2–1.6
      overlaySpawnAccumulatorRef.current += spawnRate * overlayRateScale * delta;
      while (overlaySpawnAccumulatorRef.current >= 1) {
        spawnParticlesOverlayLayer(m.width, m.height, speed, life, opacity);
        overlaySpawnAccumulatorRef.current -= 1;
      }
    }

    overlayParticlesRef.current = overlayParticlesRef.current.reduce<Particle[]>((next, particle) => {
      const updated = updateParticle(particle, delta, m.width, m.height);
      if (updated) {
        drawParticle(context, updated);
        next.push(updated);
      }
      return next;
    }, []);
  };

  // =========================
  // СЛОЙ A (BASE) — исходный spawnParticles, но привязан к hero-rect
  // Логика полностью та же, только координаты смещены на rectLeft/rectTop.
  // =========================
  const spawnParticlesBaseLayer = (
    rectLeft: number,
    rectTop: number,
    rectWidth: number,
    rectHeight: number,
    speed: [number, number],
    life: [number, number],
    opacityRange: [number, number],
  ) => {
    // ВНИМАНИЕ: тут именно локальные размеры hero, как в исходнике
    const width = rectWidth;
    const height = rectHeight;

    const centerXLocal = width / 2;
    const centerYLocal = height / 2;
    const margin = Math.min(width, height) * 0.03;

    const radius = Math.min(width, height) * 0.16;

    const targets: Array<{
      spawn: () => [number, number];
      tx: number;
      ty: number;
    }> = [
      { spawn: () => [Math.random() * width, -margin], tx: centerXLocal, ty: centerYLocal - radius },
      {
        spawn: () => [Math.random() * width, height + margin],
        tx: centerXLocal,
        ty: centerYLocal + radius,
      },
      { spawn: () => [-margin, Math.random() * height], tx: centerXLocal - radius, ty: centerYLocal },
      { spawn: () => [width + margin, Math.random() * height], tx: centerXLocal + radius, ty: centerYLocal },
    ];

    targets.forEach(({ spawn, tx, ty }) => {
      const [xLocal, yLocal] = spawn();

      // Переносим всё в КООРДИНАТЫ VIEWPORT (потому что canvas fixed)
      const x = rectLeft + xLocal;
      const y = rectTop + yLocal;
      const txAbs = rectLeft + tx;
      const tyAbs = rectTop + ty;

      const dx = txAbs - x;
      const dy = tyAbs - y;
      const baseAngle = Math.atan2(dy, dx);
      const jitter = (Math.random() - 0.5) * 0.01; // почти прямые струи
      const swirl = (Math.random() - 0.5) * 0.04; // лёгкое втягивание воронки
      const angle = baseAngle + jitter + swirl;

      const velocity = randomBetween(speed[0], speed[1]);
      const length = randomBetween(5, 9);
      const thickness = randomBetween(1.6, 2.2);
      const opacity = randomBetween(opacityRange[0], opacityRange[1]);
      const color = GOLD_PALETTE[Math.random() > 0.55 ? 1 : 0];

      baseParticlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        tx: txAbs,
        ty: tyAbs,
        life: randomBetween(life[0], life[1]),
        opacity,
        length,
        thickness,
        color,
      });
    });

    // Контроль числа частиц — как в оригинале
    if (baseParticlesRef.current.length > 260) {
      baseParticlesRef.current.splice(0, baseParticlesRef.current.length - 260);
    }
  };

  // =========================
  // СЛОЙ B (OVERLAY) — твой diff (левый поток + дальние спавны),
  // но корректно привязан к якорю (hero-rect) в координатах viewport.
  // =========================
  const spawnParticlesOverlayLayer = (
    width: number,
    height: number,
    speed: [number, number],
    life: [number, number],
    opacityRange: [number, number],
  ) => {
    const { centerX, centerY, anchorSize } = metricsRef.current;

    const nearMargin = Math.min(width, height) * 0.03;
    const farMargin = Math.max(width, height) * 0.22;

    const radius = Math.min(anchorSize || Math.min(width, height), Math.min(width, height)) * 0.16;
    const leftStreamBand = (anchorSize || Math.min(width, height)) * 0.7;

    const targets: Array<{
      spawn: () => [number, number];
      tx: number;
      ty: number;
    }> = [
      // Близкие к герою точки — сохраняют струйность вокруг логотипа
      { spawn: () => [Math.random() * width, -nearMargin], tx: centerX, ty: centerY - radius },
      { spawn: () => [Math.random() * width, height + nearMargin], tx: centerX, ty: centerY + radius },
      { spawn: () => [-nearMargin, Math.random() * height], tx: centerX - radius, ty: centerY },
      { spawn: () => [width + nearMargin, Math.random() * height], tx: centerX + radius, ty: centerY },

      // Дополнительный левый поток из области текста — усиливает струйность в сторону логотипа
      {
        spawn: () => [
          -farMargin * randomBetween(1.1, 1.6),
          centerY + (Math.random() - 0.5) * leftStreamBand,
        ],
        tx: centerX - radius * 0.3,
        ty: centerY,
      },
      {
        spawn: () => [
          -nearMargin * 2.4,
          centerY + (Math.random() - 0.5) * leftStreamBand * 0.85,
        ],
        tx: centerX - radius * 0.18,
        ty: centerY,
      },

      // Дальние спавны — ощущение «приходит извне коробки»
      { spawn: () => [Math.random() * width, -farMargin], tx: centerX, ty: centerY },
      { spawn: () => [Math.random() * width, height + farMargin], tx: centerX, ty: centerY },
      { spawn: () => [-farMargin, Math.random() * height], tx: centerX, ty: centerY },
      { spawn: () => [width + farMargin, Math.random() * height], tx: centerX, ty: centerY },
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

      overlayParticlesRef.current.push({
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

    // Контроль числа частиц — как в diff
    if (overlayParticlesRef.current.length > 320) {
      overlayParticlesRef.current.splice(0, overlayParticlesRef.current.length - 320);
    }
  };

  // Общий update — оставляем твою физику как есть
  const updateParticle = (particle: Particle, delta: number, width: number, height: number): Particle | null => {
    const damping = 0.993;
    const pull = 84;

    const nextLife = particle.life - delta;
    if (nextLife <= 0) return null;

    const dx = particle.tx - particle.x;
    const dy = particle.ty - particle.y;
    const distance = Math.hypot(dx, dy);

    // нормализация дистанции относительно сцены
    const distNorm = Math.min(distance / (Math.min(width, height) * 0.5), 1);

    // чем дальше — тем слабее, но НЕ в ноль
    const pullFactor = 0.7 + (1 - distNorm) * 0.6;

    const ax = (dx / Math.max(distance, 1)) * pull * pullFactor * delta;
    const ay = (dy / Math.max(distance, 1)) * pull * pullFactor * delta;

    const nx = particle.x + (particle.vx + ax) * delta;
    const ny = particle.y + (particle.vy + ay) * delta;

    // Лёгкое замедление для эффекта затухания
    const nvx = (particle.vx + ax) * damping;
    const nvy = (particle.vy + ay) * damping;

    // ВАЖНО: kill-зону не используем, чтобы не было ощущения "коробки"
    // смерть — по life и растворению у логотипа

    if (distance < Math.min(width, height) * 0.025) {
      particle.opacity *= 0.9; // РАСТВОРЕНИЕ В ЛОГО ❗❗❗
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

    const resize = () => {
      // canvas = viewport
      const dpr = Math.max(window.devicePixelRatio || 1, 1);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      contextRef.current?.setTransform(dpr, 0, 0, dpr, 0, 0);

      // hero-rect (родитель), чтобы якорь (логотип) оставался там же, где был
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();

      const rectLeft = rect?.left ?? 0;
      const rectTop = rect?.top ?? 0;
      const rectWidth = rect?.width ?? 0;
      const rectHeight = rect?.height ?? 0;

      const centerX = rectLeft + rectWidth / 2;
      const centerY = rectTop + rectHeight / 2;
      const anchorSize = Math.min(rectWidth || width, rectHeight || height);

      metricsRef.current = {
        width,
        height,
        centerX,
        centerY,
        anchorSize,
        rectLeft,
        rectTop,
        rectWidth,
        rectHeight,
      };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", resize, { passive: true });

    schedulePhases();
    lastTimestampRef.current = performance.now();
    frameRef.current = requestAnimationFrame(loop);

    function loop(timestamp: number) {
      const delta = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.05) * TIME_SCALE;
      lastTimestampRef.current = timestamp;

      const ctx = contextRef.current;
      if (ctx) renderFrame(ctx, delta);

      frameRef.current = requestAnimationFrame(loop);
    }

    return () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id));
      cancelAnimationFrame(frameRef.current ?? 0);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", resize);
      contextRef.current = null;
    };
  }, []);

  // canvas теперь fixed и поверх всего
  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 pointer-events-none z-20", className)}
      aria-hidden
    />
  );
}
