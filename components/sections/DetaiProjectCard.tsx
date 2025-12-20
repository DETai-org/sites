"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, type MouseEvent } from "react";

import BodyText from "../ui/BodyText";

type DetaiProjectCardProps = {
  title: string;
  description: string;
  avatarSrc: string;
  echelon: 1 | 2 | 3;
  href: string;
};

const TILT_THRESHOLD = 12;

function getEchelonLabel(echelon: 1 | 2 | 3) {
  if (echelon === 1) return "Эшелон I · Ядро";
  if (echelon === 2) return "Эшелон II · Пиар";
  return "Эшелон III · Инфра/R&D";
}

export default function DetaiProjectCard({ title, description, avatarSrc, echelon, href }: DetaiProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const pendingRef = useRef(false);
  const rectRef = useRef<DOMRect | null>(null);
  const echelonLabel = getEchelonLabel(echelon);

  const updateRect = () => {
    if (!cardRef.current) return;
    rectRef.current = cardRef.current.getBoundingClientRect();
  };

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current ?? cardRef.current?.getBoundingClientRect();

    if (!rect) return;

    const { left, top, width, height } = rect;
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

  const handleEnter = () => {
    updateRect();
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
    const handleResize = () => {
      updateRect();
    };

    updateRect();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
      onMouseEnter={handleEnter}
      onMouseLeave={resetTilt}
    >
      <Link
        href={href}
        className="block h-full transition-transform duration-200 ease-out focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-primary/60"
        aria-label={`Проект: ${title}`}
      >
        <article className="detai-card-surface relative flex h-full flex-col justify-between gap-mobile-3 overflow-hidden p-mobile-4 text-accent-soft shadow-[0_18px_48px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-out md:gap-4 md:p-5 group-hover:-translate-y-[3px]">
          <div className="flex flex-col gap-mobile-3 md:gap-4">
            <div className="flex items-start justify-between gap-mobile-3 md:gap-4">
              <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-full border border-accent-primary/20 bg-basic-dark/30">
                <Image
                  src={avatarSrc}
                  alt={`Аватар проекта: ${title}`}
                  fill
                  sizes="64px"
                  className="object-cover scale-[1.12]"
                  priority={false}
                />
              </div>

              <div className="h-18 w-18 shrink-0 rounded-lg border border-accent-primary/10 bg-basic-dark/15" aria-hidden />
            </div>

            <h3 className="font-serif text-mobile-h3 font-semibold text-accent-soft md:text-xl md:leading-tight">{title}</h3>

            <BodyText variant="projectCard" className="text-accent-soft/80">
              {description}
            </BodyText>
          </div>

          <div className="flex justify-end">
            <span className="inline-flex items-center rounded-full border border-accent-primary/20 bg-basic-dark/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-soft/90 md:text-xs">
              {echelonLabel}
            </span>
          </div>
        </article>
      </Link>
    </div>
  );
}
