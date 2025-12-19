import Image from "next/image";

import BodyText from "../ui/BodyText";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

export default function Mission() {
  return (
    <Section id="mission" variant="dark">
      <div className="flex w-full max-w-[960px] flex-col items-center gap-mobile-6 md:gap-8">
        <Heading
          level={2}
          color="soft"
          className="text-mobile-4xl font-semibold leading-mobile-tight tracking-tight md:text-5xl"
        >
          Наша миссия
        </Heading>

        <div className="group relative w-full max-w-[900px] px-mobile-3 md:px-0">
          <div className="relative flex min-h-[26rem] w-full items-center justify-center md:aspect-[2/1] md:min-h-0">
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-basic-dark transition-opacity duration-500 ease-out group-hover:pointer-events-none group-hover:opacity-0">
              <Image
                src="/assets/animations/logo.svg"
                alt="Логотип DETai"
                width={320}
                height={320}
                className="logo logo--accent-soft h-[64%] w-[64%] object-contain md:h-[70%] md:w-[70%]"
                priority={false}
              />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft md:text-sm">
                CLICK ME
              </span>
            </div>

            <div className="relative flex h-full w-full items-center justify-center px-mobile-1 py-mobile-3 text-center md:px-6 md:py-8">
              <div className="paper--object-mobile paper-shape--scroll paper-edges--scroll md:paper-ambient relative flex h-full w-full max-w-[840px] flex-col items-center justify-center px-mobile-3 py-mobile-5 md:px-10 md:py-12">
                <BodyText variant="sectionDefaultOnLight">
                  Создать новую терапевтическую логику, которая объединяет глубину экзистенциальной психологии и возможности современного
                  интеллекта — человеческого и искусственного. DET и DETai — это путь к осмысленным инструментам, которые помогают людям
                  понимать себя и развиваться.
                </BodyText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
