"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type CanvasPulseLightLayerProps = {
  className?: string;
};

const CYCLE_DURATION_MS = 1000;

function pulse(t: number, center: number, width: number, power: number) {
  const distance = Math.abs(t - center);
  if (distance > width) return 0;
  return Math.pow(1 - distance / width, power);
}

function getHeartbeat(t: number) {
  const beat1 = pulse(t, 0.1, 0.08, 2.5);
  const beat2 = pulse(t, 0.38, 0.06, 2.0);

  return Math.max(beat1, beat2);
}

export default function CanvasPulseLightLayer({ className }: CanvasPulseLightLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const metricsRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

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
      const { width, height } = metricsRef.current;
      if (width === 0 || height === 0) {
        frameRef.current = requestAnimationFrame(renderFrame);
        return;
      }

      const elapsed = (timestamp - startTimeRef.current) % CYCLE_DURATION_MS;
      const t = elapsed / CYCLE_DURATION_MS;
      const heartbeat = getHeartbeat(t);

      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.34;
      const radius = baseRadius * (1 + heartbeat * 0.32);

      const baseAlpha = 0.08;
      const pulseAlpha = 0.18;
      const alpha = baseAlpha + heartbeat * pulseAlpha;
      const midStop = 0.4 + heartbeat * 0.1;

      context.clearRect(0, 0, width, height);

      const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, `rgba(255, 220, 160, ${alpha})`);
      gradient.addColorStop(midStop, `rgba(255, 200, 120, ${alpha * 0.6})`);
      gradient.addColorStop(1, "rgba(255, 200, 120, 0)");

      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      frameRef.current = requestAnimationFrame(renderFrame);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas.parentElement ?? canvas);

    frameRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      resizeObserver.disconnect();
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return <canvas ref={canvasRef} className={cn("absolute inset-0 h-full w-full pointer-events-none", className)} aria-hidden />;
}
