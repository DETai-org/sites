"use client";

import { useEffect, useRef, type MouseEvent } from "react";

type DetaiProjectCardProps = {
  title: string;
  description: string;
  label: string;
  icon?: string;
};

const TILT_THRESHOLD = 12;

export default function DetaiProjectCard({ title, description, label, icon }: DetaiProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const pendingRef = useRef(false);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;

    tiltRef.current = { x: y * -TILT_THRESHOLD, y: x * TILT_THRESHOLD };

    if (!pendingRef.current) {
      pendingRef.current = true;
      animationFrameRef.current = requestAnimationFrame(() => {
        pendingRef.current = false;

        if (cardRef.current) {
          const { x: tiltX, y: tiltY } = tiltRef.current;
          cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        }
      });
    }
  };

  const resetTilt = () => {
    tiltRef.current = { x: 0, y: 0 };
    if (!pendingRef.current) {
      cardRef.current?.style.setProperty("transform", "perspective(1000px) rotateX(0deg) rotateY(0deg)");
    } else {
      animationFrameRef.current = requestAnimationFrame(() => {
        cardRef.current?.style.setProperty("transform", "perspective(1000px) rotateX(0deg) rotateY(0deg)");
      });
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="detai-card-border detai-scan-border group transition-transform duration-200 ease-out"
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
    >
      <article
        tabIndex={0}
        className="detai-card-surface relative flex h-full flex-col justify-between gap-mobile-3 overflow-hidden p-mobile-4 text-accent-soft shadow-[0_18px_48px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-out focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-primary/60 md:gap-4 md:p-5 group-hover:-translate-y-0.5"
        aria-label={`Проект: ${title}`}
      >
        <div className="flex flex-col gap-mobile-3 md:gap-4">
          <div className="flex items-center justify-between gap-mobile-2 rounded-lg bg-accent-soft px-mobile-4 py-mobile-6 md:gap-3 md:px-6 md:py-8">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-basic-dark/80">Изображение</span>
              <span className="text-sm font-medium text-basic-dark/80">Демо-заглушка</span>
            </div>
            {icon ? (
              <span aria-hidden className="text-3xl md:text-4xl">
                {icon}
              </span>
            ) : null}
          </div>

          <h3 className="font-serif text-mobile-xl font-semibold leading-mobile-tight text-accent-soft md:text-xl md:leading-tight">{title}</h3>

          <p className="text-mobile-lg leading-mobile-normal text-accent-soft/80 md:text-base md:leading-relaxed">{description}</p>
        </div>

        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-accent-soft/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-soft md:text-xs">
          {label}
        </span>
      </article>
    </div>
  );
}
