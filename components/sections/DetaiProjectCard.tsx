"use client";

import Image from "next/image";
import { useEffect, useRef, type MouseEvent } from "react";

type DetaiProjectCardProps = {
  title: string;
  description: string;
  label: string;
  avatarSrc: string;
  echelon: 1 | 2 | 3;
  tags?: string[];
};

const TILT_THRESHOLD = 12;

function getEchelonLabel(echelon: 1 | 2 | 3) {
  if (echelon === 1) return "Эшелон I · Ядро";
  if (echelon === 2) return "Эшелон II · Пиар";
  return "Эшелон III · Инфра/R&D";
}

export default function DetaiProjectCard({ title, description, label, avatarSrc, echelon, tags }: DetaiProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const pendingRef = useRef(false);
  const echelonLabel = getEchelonLabel(echelon);

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
        className="detai-card-surface relative flex h-full flex-col justify-between gap-mobile-3 overflow-hidden p-mobile-4 text-accent-soft shadow-[0_18px_48px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-out focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-primary/60 md:gap-4 md:p-5 group-hover:-translate-y-[3px]"
        aria-label={`Проект: ${title}`}
      >
        <div className="flex flex-col gap-mobile-3 md:gap-4">
          <div className="flex items-start justify-between gap-3">
            {/* Левая колонка: аватар */}
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-accent-primary/20 bg-basic-dark/30">
              <Image
                src={avatarSrc}
                alt={`Аватар проекта: ${title}`}
                fill
                sizes="48px"
                className="object-cover"
                priority={false}
              />
            </div>

            {/* Правая колонка: эшелон и теги */}
            <div className="flex min-w-0 flex-1 flex-col items-end gap-2">
              <span className="inline-flex items-center rounded-full border border-accent-primary/20 bg-basic-dark/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-soft/90 md:text-xs">
                {/** Текст эшелона (см. функцию ниже) */}
                {echelonLabel}
              </span>

              <div className="flex flex-wrap justify-end gap-1">
                {(tags ?? []).slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-accent-primary/15 bg-basic-dark/25 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-accent-soft/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
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
