"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useDeviceSignals } from "@/lib/hooks/useDeviceSignals";
import { cn } from "@/lib/utils";

import BodyText from "../ui/BodyText";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

type OrbitProject = {
  id: string;
  title: string;
  status?: string;
  hint: string;
  position: {
    top: number;
    left: number;
  };
  size: "sm" | "md" | "lg";
  visibilityClass?: string;
};

const projects: OrbitProject[] = [
  {
    id: "galton",
    title: "Francis Galton",
    status: "active",
    hint: "Усиливает: устойчивость процесса",
    position: { top: 18, left: 72 },
    size: "lg",
  },
  {
    id: "assistants",
    title: "Агенты сопровождения",
    status: "beta",
    hint: "Усиливает: сопровождение между сессиями",
    position: { top: 60, left: 82 },
    size: "md",
  },
  {
    id: "research",
    title: "Исследовательские модули",
    status: "concept",
    hint: "Усиливает: наблюдение и мета-аналитику",
    position: { top: 80, left: 38 },
    size: "sm",
    visibilityClass: "md:hidden lg:block",
  },
  {
    id: "stability",
    title: "Контур устойчивости",
    status: "concept",
    hint: "Усиливает: устойчивость и опору",
    position: { top: 52, left: 16 },
    size: "md",
  },
  {
    id: "between-sessions",
    title: "Межсессионная поддержка",
    status: "beta",
    hint: "Усиливает: связь между практиками",
    position: { top: 22, left: 28 },
    size: "sm",
    visibilityClass: "md:hidden lg:block",
  },
];

const sizeClasses: Record<OrbitProject["size"], string> = {
  sm: "h-12 w-12 md:h-14 md:w-14",
  md: "h-14 w-14 md:h-16 md:w-16",
  lg: "h-16 w-16 md:h-20 md:w-20",
};

export default function DetaiInterfaceCultureSection() {
  const { isMobileDevice, hasNonMobileSignals } = useDeviceSignals();
  const isMobile = hasNonMobileSignals ? isMobileDevice : false;
  const [isVisible, setIsVisible] = useState(false);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const orbitLines = useMemo(
    () =>
      projects.map((project) => ({
        id: project.id,
        x: project.position.left,
        y: project.position.top,
        visibilityClass: project.visibilityClass,
      })),
    []
  );

  if (isMobile) {
    return (
      <Section id="detai-interface-culture" variant="dark" className="border-y border-accentVar/20">
        <div className="flex flex-col gap-mobile-6">
          <div className="flex flex-col gap-mobile-3">
            <Heading level={2} color="soft">
              DETai — интерфейс культуры
            </Heading>
            <BodyText variant="sectionDefaultDark" className="max-w-3xl">
              Платформа, которая усиливает психотерапевтический процесс через AI-инструменты и цифровые формы
              поддержки.
            </BodyText>
          </div>

          <div className="flex flex-col items-center gap-mobile-3">
            <div className="relative flex h-32 w-32 items-center justify-center text-center rounded-full border border-accentVar/40 bg-surface/60">
              <div className="text-lg font-semibold text-accentSoftVar">DETai</div>
            </div>
            <p className="text-center text-mobile-small text-accentSoftVar/80 md:text-base">
              Усиливающий интерфейс психотерапевтического процесса
            </p>
          </div>

          <div className="grid gap-mobile-2 text-mobile-small text-accentSoftVar/80 md:text-base">
            <p>Augmented Intelligence — усиление человеческого мышления и процесса</p>
            <p>Artificial Intelligence — технологическая основа инструментов</p>
          </div>

          <div className="grid gap-mobile-3">
            {projects.map((project) => (
              <div key={project.id} className="rounded-xl border border-accentVar/20 bg-surface/60 p-mobile-3">
                <div className="flex items-center justify-between">
                  <span className="text-mobile-body font-semibold text-accentSoftVar md:text-lg">
                    {project.title}
                  </span>
                  {project.status ? (
                    <span className="text-[0.7rem] uppercase tracking-[0.2em] text-accentSoftVar/60">
                      {project.status}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-mobile-small text-accentSoftVar/80 md:text-base">{project.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="detai-interface-culture" variant="dark" className="border-y border-accentVar/20">
      <div ref={sectionRef} className="flex flex-col gap-mobile-8 md:gap-12">
        <header className="flex flex-col gap-mobile-3">
          <Heading level={2} color="soft">
            DETai — интерфейс культуры
          </Heading>
          <BodyText variant="sectionDefaultDark" className="max-w-3xl">
            Платформа, которая усиливает психотерапевтический процесс через AI-инструменты и цифровые формы поддержки.
          </BodyText>
        </header>

        <div className="flex flex-col gap-mobile-6 md:flex-row md:items-center md:gap-10">
          <div className="relative overflow-hidden w-full aspect-[4/3] p-3 rounded-2xl border border-accentVar/30 bg-surface/70 shadow-[0_0_25px_rgb(var(--accent)_/_0.15)] md:w-[44%]">
            <div className="absolute inset-0 rounded-2xl border border-accentSoftVar/20" />
            <video
              className="relative h-full w-full rounded-xl object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/video/Golden_Robotic_Hands.webm" type="video/webm" />
            </video>
          </div>
          <div className="relative flex items-center justify-center w-full max-w-[640px] mx-auto md:w-[56%] md:mx-0">
            <div className="relative h-[380px] w-full max-w-[640px] md:h-[520px]">
            <svg
              aria-hidden="true"
              className={cn(
                "absolute inset-0 h-full w-full transition-opacity duration-700",
                isVisible ? "opacity-100" : "opacity-0"
              )}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {orbitLines.map((line) => (
                <line
                  key={line.id}
                  x1="50"
                  y1="50"
                  x2={line.x}
                  y2={line.y}
                  stroke="currentColor"
                  className={cn(
                    "text-accentSoftVar/30",
                    line.visibilityClass,
                    activeElement && activeElement !== line.id ? "opacity-70" : "opacity-100"
                  )}
                  strokeWidth="0.3"
                />
              ))}
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={cn(
                  "absolute flex h-40 w-40 flex-col items-center justify-center text-center rounded-full border border-accentVar/60 bg-surface/70 shadow-[0_0_25px_rgb(var(--accent)_/_0.35)] transition-all duration-700",
                  isVisible ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
                )}
              >
                <div className="text-xl font-semibold text-accentSoftVar">DETai</div>
                <p className="mt-2 text-[0.7rem] leading-relaxed text-accentSoftVar/70">
                  Усиливающий интерфейс психотерапевтического процесса
                </p>
              </div>
            </div>

            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-700 delay-150",
                isVisible ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
              )}
            >
              <div
                className={cn(
                  "relative flex h-[260px] w-[260px] items-center justify-center rounded-full border border-accentSoftVar/70 animate-none lg:animate-orbit-slow motion-reduce:animate-none",
                  activeElement && activeElement !== "augmented" ? "opacity-90" : "opacity-100"
                )}
                onMouseEnter={() => setActiveElement("augmented")}
                onMouseLeave={() => setActiveElement(null)}
              >
                <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accentSoftVar/80" />
                <div className="group absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    className="absolute inset-0 rounded-full cursor-default"
                    onFocus={() => setActiveElement("augmented")}
                    onBlur={() => setActiveElement(null)}
                    aria-label="Augmented Intelligence"
                  />
                  <div className="absolute -bottom-20 left-1/2 w-64 -translate-x-1/2 rounded-xl border border-accentVar/20 bg-surface/90 p-3 text-left text-[0.7rem] leading-relaxed text-accentSoftVar shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                    <span className="block text-[0.75rem] font-semibold text-accentSoftVar">
                      Augmented Intelligence
                    </span>
                    <span className="block text-accentSoftVar/80">
                      Усиление человеческого мышления и процесса
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-700 delay-300",
                isVisible ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
              )}
            >
              <div
                className={cn(
                  "group relative flex h-[320px] w-[320px] items-center justify-center rounded-full border border-dashed border-accentSoftVar/50 animate-none lg:animate-orbit-slow-reverse motion-reduce:animate-none",
                  activeElement && activeElement !== "artificial" ? "opacity-90" : "opacity-100"
                )}
                onMouseEnter={() => setActiveElement("artificial")}
                onMouseLeave={() => setActiveElement(null)}
              >
                <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accentSoftVar/50" />
                <button
                  type="button"
                  className="absolute inset-0 rounded-full cursor-default"
                  onFocus={() => setActiveElement("artificial")}
                  onBlur={() => setActiveElement(null)}
                  aria-label="Artificial Intelligence"
                />
                <div className="absolute -top-20 left-1/2 w-64 -translate-x-1/2 rounded-xl border border-accentVar/20 bg-surface/90 p-3 text-left text-[0.7rem] leading-relaxed text-accentSoftVar shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                  <span className="block text-[0.75rem] font-semibold text-accentSoftVar">Artificial Intelligence</span>
                  <span className="block text-accentSoftVar/80">Технологическая основа инструментов</span>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "absolute inset-0 flex items-start justify-center transition-all duration-700 delay-500",
                isVisible ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
              )}
            >
              <div
                className={cn(
                  "group relative flex h-40 w-[360px] items-start justify-center mt-6 rounded-t-full border border-b-0 border-accentSoftVar/50",
                  activeElement && activeElement !== "umbrella" ? "opacity-90" : "opacity-100"
                )}
                onMouseEnter={() => setActiveElement("umbrella")}
                onMouseLeave={() => setActiveElement(null)}
              >
                <button
                  type="button"
                  className="absolute inset-0 rounded-t-full cursor-default"
                  onFocus={() => setActiveElement("umbrella")}
                  onBlur={() => setActiveElement(null)}
                  aria-label="Umbrella platform"
                />
                <div className="absolute -top-16 left-1/2 w-64 -translate-x-1/2 rounded-xl border border-accentVar/20 bg-surface/90 p-3 text-left text-[0.7rem] leading-relaxed text-accentSoftVar shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                  <span className="block text-[0.75rem] font-semibold text-accentSoftVar">Umbrella platform</span>
                  <span className="block text-accentSoftVar/80">Единые принципы — разные реализации</span>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "absolute inset-0 transition-all duration-700 delay-700",
                isVisible ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
              )}
            >
              {projects.map((project) => {
                const isDimmed = activeElement && activeElement !== project.id;

                return (
                  <div
                    key={project.id}
                    className={cn("group absolute", project.visibilityClass)}
                    style={{ top: `${project.position.top}%`, left: `${project.position.left}%` }}
                  >
                    <button
                      type="button"
                      className={cn(
                        "flex flex-col items-center justify-center text-center text-[0.65rem] font-semibold text-accentSoftVar rounded-full border border-accentVar/30 bg-surface/80 shadow-md transition-all duration-300",
                        sizeClasses[project.size],
                        isDimmed ? "opacity-90" : "opacity-100"
                      )}
                      onMouseEnter={() => setActiveElement(project.id)}
                      onMouseLeave={() => setActiveElement(null)}
                      onFocus={() => setActiveElement(project.id)}
                      onBlur={() => setActiveElement(null)}
                    >
                      <span className="px-2">{project.title}</span>
                      {project.status ? (
                        <span className="mt-1 text-[0.55rem] uppercase tracking-[0.2em] text-accentSoftVar/60">
                          {project.status}
                        </span>
                      ) : null}
                    </button>
                    <div className="pointer-events-none absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2 rounded-xl border border-accentVar/20 bg-surface/90 p-3 text-left text-[0.7rem] leading-relaxed text-accentSoftVar shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                      <span className="block text-accentSoftVar/80">{project.hint}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
