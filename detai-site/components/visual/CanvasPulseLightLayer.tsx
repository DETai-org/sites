"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type CanvasPulseLightLayerProps = {
  className?: string;
};

const CYCLE_DURATION_MS = 1000;
const SECONDARY_ALPHA_FACTOR = 0.25;
const ACCENT_PRIMARY_RGB = "201, 168, 106";
const ACCENT_SOFT_RGB = "242, 229, 194";
const ACCENT_ACTIVE_RGB = "184, 146, 79";

type Heartbeat = {
  primary: number;
  secondary: number;
};

function pulse(
  t: number,
  center: number,
  width: number,
  power: number,
  releasePower: number = power,
) {
  const distance = Math.abs(t - center);
  if (distance > width) return 0;

  const isAttack = t <= center;
  const phasePower = isAttack ? power : releasePower;

  return Math.pow(1 - distance / width, phasePower);
}

function getHeartbeat(t: number): Heartbeat {
  const beat1 = pulse(t, 0.1, 0.21, 2.1, 0.7);
  const beat2 = pulse(t, 0.42, 0.07, 2.0, 1.2);

  return {
    primary: beat1,
    secondary: beat2,
  };
}

export default function CanvasPulseLightLayer({ className }: CanvasPulseLightLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const pauseAtRef = useRef<number | null>(null);
  const metricsRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
  const isRunningRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    startTimeRef.current = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      metricsRef.current = { width: rect.width, height: rect.height };
    };

    const renderFrame = (timestamp: number) => {
      if (!isRunningRef.current) return;

      const { width, height } = metricsRef.current;
      if (width === 0 || height === 0) {
        frameRef.current = requestAnimationFrame(renderFrame);
        return;
      }

      const elapsed = (timestamp - startTimeRef.current) % CYCLE_DURATION_MS;
      const t = elapsed / CYCLE_DURATION_MS;
      const { primary, secondary } = getHeartbeat(t);

      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.34;
      const radius = baseRadius * (1 + primary * 0.32);

      const baseAlpha = 0.08;
      const pulseAlpha = 0.18;
      const secondaryContribution = pulseAlpha * SECONDARY_ALPHA_FACTOR;
      const alpha = baseAlpha + primary * pulseAlpha + secondary * secondaryContribution;
      const midStop = 0.4 + primary * 0.1;

      context.clearRect(0, 0, width, height);

      const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, `rgba(${ACCENT_PRIMARY_RGB}, ${alpha})`);
      gradient.addColorStop(midStop, `rgba(${ACCENT_SOFT_RGB}, ${alpha * 0.6})`);
      gradient.addColorStop(1, `rgba(${ACCENT_ACTIVE_RGB}, 0)`);

      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      frameRef.current = requestAnimationFrame(renderFrame);
    };

    const startAnimation = () => {
      if (isRunningRef.current || document.visibilityState === "hidden" || !isVisibleRef.current) return;

      const now = performance.now();
      if (startTimeRef.current === 0) {
        startTimeRef.current = now;
      } else if (pauseAtRef.current) {
        startTimeRef.current += now - pauseAtRef.current;
      }

      pauseAtRef.current = null;
      isRunningRef.current = true;
      frameRef.current = requestAnimationFrame(renderFrame);
    };

    const stopAnimation = () => {
      if (!isRunningRef.current) return;

      isRunningRef.current = false;
      pauseAtRef.current = performance.now();
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };

    const evaluateActivity = () => {
      if (document.visibilityState === "hidden" || !isVisibleRef.current) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas.parentElement ?? canvas);

    const target = canvas.parentElement ?? canvas;
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === target) {
          isVisibleRef.current = entry.isIntersecting;
          evaluateActivity();
        }
      });
    });

    intersectionObserver.observe(target);

    const visibilityHandler = () => evaluateActivity();
    document.addEventListener("visibilitychange", visibilityHandler);

    startAnimation();

    return () => {
      stopAnimation();
      document.removeEventListener("visibilitychange", visibilityHandler);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return <canvas ref={canvasRef} className={cn("absolute inset-0 h-full w-full pointer-events-none", className)} aria-hidden />;
}
