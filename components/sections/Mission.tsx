import Image from "next/image";

import BodyText from "../ui/BodyText";
import HeadingLevel2 from "../ui/HeadingLevel2";
import Section from "../ui/Section";

export default function Mission() {
  return (
    <Section id="mission" variant="dark">
      <div className="flex flex-col items-center gap-mobile-6 md:gap-8">
        <HeadingLevel2 color="soft">Наша миссия</HeadingLevel2>

        <div className="group w-[56.25%] max-w-full">
          <div className="detai-card-border detai-scan-border relative aspect-square w-full overflow-hidden rounded-[15px]">
            <div className="detai-card-surface absolute inset-0 z-20 flex items-center justify-center rounded-[15px] transition-opacity duration-500 ease-out group-hover:pointer-events-none group-hover:opacity-0">
              <Image
                src="/assets/animations/logo.svg"
                alt="Логотип DETai"
                width={320}
                height={320}
                className="logo logo--accent-soft h-[75%] w-[75%] object-contain"
                priority={false}
              />
            </div>

            <div className="section--paper absolute inset-0 z-10 flex items-center justify-center rounded-[15px] bg-basic-light px-mobile-4 py-mobile-6 text-center md:px-8 md:py-8">
              <BodyText variant="sectionDefaultOnLight">
                Создать новую терапевтическую логику, которая объединяет глубину экзистенциальной психологии и возможности современного
                интеллекта — человеческого и искусственного. DET и DETai — это путь к осмысленным инструментам, которые помогают людям
                понимать себя и развиваться.
              </BodyText>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
