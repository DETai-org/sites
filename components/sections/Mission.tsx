"use client";

import Image from "next/image";
import { useState } from "react";

import { useDeviceSignals } from "@/lib/hooks/useDeviceSignals";
import { cn } from "@/lib/utils";

import Button from "../ui/Button";
import BodyText from "../ui/BodyText";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

export default function Mission() {
  const { isMobileDevice } = useDeviceSignals();
  const [isRevealed, setIsRevealed] = useState(false);

  const prefersTouch =
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const shouldToggleOnClick = isMobileDevice || prefersTouch;

  const handleToggle = () => {
    if (shouldToggleOnClick) {
      setIsRevealed((current) => !current);
    }
  };

  return (
    <Section id="mission" variant="dark">
      <div className="flex w-full max-w-[960px] flex-col items-start gap-mobile-3 md:gap-8">
        <Heading
          level={2}
          color="soft"
          className="text-mobile-4xl font-semibold leading-mobile-tight tracking-tight md:text-5xl"
        >
          Наша миссия
        </Heading>

        <div className="relative w-full max-w-[960px] overflow-hidden rounded-[18px] bg-basic-dark/80 px-0 py-mobile-2 md:px-0 md:py-8">
          <div className="flex w-full flex-col gap-mobile-4 md:flex-row md:items-start md:gap-10">
            <div
              className="group/mission relative flex w-full flex-col gap-mobile-3 md:max-w-[36rem] md:gap-4"
              role={shouldToggleOnClick ? "button" : undefined}
              tabIndex={shouldToggleOnClick ? 0 : undefined}
              aria-pressed={shouldToggleOnClick ? isRevealed : undefined}
              aria-expanded={shouldToggleOnClick ? isRevealed : undefined}
              onClick={handleToggle}
              onKeyDown={(event) => {
                if (!shouldToggleOnClick) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleToggle();
                }
              }}
            >
              <div
                className={cn(
                  "absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-basic-dark px-6 text-center transition-opacity duration-500 ease-out",
                  "group-hover/mission:pointer-events-none group-hover/mission:opacity-0 group-active/mission:pointer-events-none group-active/mission:opacity-0",
                  isRevealed && shouldToggleOnClick && "pointer-events-none opacity-0",
                  "md:items-start md:px-10 md:text-left"
                )}
              >
                <Image
                  src="/assets/animations/logo.svg"
                  alt="Логотип DETai"
                  width={320}
                  height={320}
                  className="logo logo--accent-soft h-[9rem] w-[9rem] object-contain md:h-[12rem] md:w-[12rem]"
                  priority={false}
                />
                <p className="text-sm uppercase tracking-[0.18em] text-accent-soft/70">click me</p>
              </div>

              <div
                className={cn(
                  "relative z-10 flex flex-col gap-mobile-3 text-left opacity-0 transition-opacity duration-500 ease-out md:gap-4",
                  "group-active/mission:opacity-100 group-hover/mission:opacity-100",
                  isRevealed && shouldToggleOnClick && "opacity-100"
                )}
              >
                <BodyText className="md:text-xl md:leading-relaxed">
                  Создать новую терапевтическую логику, которая объединяет глубину экзистенциальной психологии и возможности современного
                  интеллекта — человеческого и искусственного. DET и DETai — это путь к осмысленным инструментам, которые помогают людям
                  понимать себя и развиваться.
                </BodyText>

                <BodyText className="md:text-xl md:leading-relaxed" variant="sectionDefaultDark">
                  Мы создаём культуру, где диалектика и гуманизм соединяются с технологиями, чтобы поддерживать человека в осознанном
                  движении вперёд.
                </BodyText>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 rounded-xl border border-basic-light/10 bg-basic-dark/70 p-5 md:max-w-[18rem]">
              <BodyText className="text-base text-accent-soft" variant="sectionDefaultDark">
                Здесь будет текст.
              </BodyText>

              <div className="flex flex-col gap-3">
                <Button className="w-full">Кнопка 1</Button>
                <Button className="w-full" variant="secondary">
                  Кнопка 2
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
