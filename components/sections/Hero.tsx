"use client";

import { type TouchEvent, useEffect, useState } from "react";

import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

const SWIPE_THRESHOLD = 40;

export default function Hero() {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      const matches = event.matches;
      setIsDesktop(matches);
      setIsDescriptionVisible(matches);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (isDesktop) return;

    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (isDesktop || touchStartX === null) return;

    const deltaX = (event.changedTouches[0]?.clientX ?? 0) - touchStartX;

    if (deltaX > SWIPE_THRESHOLD) {
      setIsDescriptionVisible(true);
    }

    setTouchStartX(null);
  };

  return (
    <Section
      id="hero"
      variant="dark"
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
    >
      <div className="flex flex-col gap-mobile-6 md:gap-10">
        <div className="flex-1 space-y-mobile-4 md:space-y-6">
          <Heading level={1} color="soft">
            DET — Dialectical Existential Therapy.
            <br />
            Новый формат психотерапии
          </Heading>
          {!isDesktop && !isDescriptionVisible ? (
            <div className="flex w-full items-center justify-center">
              <div className="flex items-center gap-2 rounded-full border border-accent-soft/30 bg-basic-dark/70 px-4 py-2 text-mobile-sm text-accent-soft shadow-lg backdrop-blur-md">
                <span className="text-mobile-lg font-semibold text-accent-primary">→</span>
                <span className="whitespace-nowrap font-medium">Свайп вправо, чтобы раскрыть описание</span>
              </div>
            </div>
          ) : (
            <p className="max-w-mobile text-mobile-lg leading-mobile-normal text-accent-soft md:max-w-2xl md:text-lg md:leading-relaxed">
              Диалектически-экзистенциальная терапия — это культура понимания человека. DETai — это технологическая экосистема,
              включающая продукты, интерфейсы и AI-инструменты, которые воплощают культуру DET в прикладных и ежедневных формах —
              доступных как клиентам, так и психотерапевтам.
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-mobile-4 md:justify-start md:gap-6">
            <Button as="a" href="#fundament-det" variant="primary">
              Фундамент DET
            </Button>
            <Button as="a" href="#mission" variant="secondary">
              Миссия и ценности
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
