import Image from "next/image";

import BodyText from "../ui/BodyText";
import HeadingLevel2 from "../ui/HeadingLevel2";
import Section from "../ui/Section";

export default function Mission() {
  return (
    <Section id="mission" variant="dark">
      <div className="flex flex-col items-center gap-mobile-6 md:gap-8">
        <HeadingLevel2 color="soft">Наша миссия</HeadingLevel2>

        <div className="section--paper w-[56.25%] max-w-full rounded-[15px] p-2.5 md:p-3.5">
          <div className="group [perspective:1200px]">
            <div className="detai-card-border detai-scan-border relative aspect-square w-full [transform-style:preserve-3d] transition-transform duration-700 ease-out group-hover:[transform:rotateY(180deg)]">
              <div className="detai-card-surface detai-card-surface--plain section--paper absolute inset-0 flex flex-col items-center justify-center gap-mobile-4 rounded-[15px] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                <Image
                  src="/assets/animations/logo.svg"
                  alt="Логотип DETai"
                  width={160}
                  height={160}
                  className="logo logo--accent-soft h-32 w-32 md:h-40 md:w-40"
                  priority={false}
                />
                <span className="text-mobile-base font-semibold uppercase tracking-[0.1em] text-accent-soft/80 md:text-base">
                  DETai
                </span>
              </div>

              <div className="detai-card-surface detai-card-surface--plain section--paper absolute inset-0 rounded-[15px] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="flex h-full items-center justify-center px-mobile-4 md:px-8">
                  <div className="w-full rounded-[12px] bg-basic-dark/60 px-mobile-4 py-mobile-6 text-center text-white md:px-6 md:py-8">
                    <BodyText variant="sectionDefaultDark" className="text-white">
                      Создать новую терапевтическую логику, которая объединяет глубину экзистенциальной психологии и возможности современного
                      интеллекта — человеческого и искусственного. DET и DETai — это путь к осмысленным инструментам, которые помогают людям
                      понимать себя и развиваться.
                    </BodyText>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
