"use client";

import { useState, type MouseEvent } from "react";

type DetaiProjectCardProps = {
  title: string;
  description: string;
  label: string;
  icon?: string;
};

const TILT_THRESHOLD = 12;

export default function DetaiProjectCard({ title, description, label, icon }: DetaiProjectCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;

    setTilt({ x: y * -TILT_THRESHOLD, y: x * TILT_THRESHOLD });
  };

  return (
    <div
      className="detai-card-border group transition-transform duration-200 ease-out"
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
    >
      <article
        className="flex h-full flex-col justify-between gap-mobile-3 rounded-[10px] bg-accent-hover p-mobile-4 text-basic-dark shadow-[0_18px_48px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-out md:gap-4 md:p-5"
        aria-label={`ProjectCard заглушка: ${title}`}
      >
        <div className="flex flex-col gap-mobile-3 md:gap-4">
          <div className="flex items-center justify-between gap-mobile-2 rounded-lg bg-accent-soft px-mobile-4 py-mobile-6 md:gap-3 md:px-6 md:py-8">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-basic-dark/70">Изображение</span>
              <span className="text-sm font-medium text-basic-dark/70">Демо-заглушка</span>
            </div>
            {icon ? (
              <span aria-hidden className="text-3xl md:text-4xl">
                {icon}
              </span>
            ) : null}
          </div>

          <p className="text-mobile-lg leading-mobile-normal text-basic-dark md:text-base md:leading-relaxed">{description}</p>

          <h3 className="font-serif text-mobile-xl font-semibold leading-mobile-tight text-basic-dark md:text-xl md:leading-tight">{title}</h3>
        </div>

        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-basic-light/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-basic-dark md:text-xs">
          {label}
        </span>
      </article>
    </div>
  );
}
