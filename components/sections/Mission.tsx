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

        <div className="group w-full max-w-[980px] px-mobile-1 py-mobile-2 md:px-3 md:py-4">
          <div className="detai-card-border detai-scan-border relative w-full min-h-[28rem] overflow-hidden rounded-[15px] md:aspect-[2/1] md:min-h-0">
            <div className="detai-card-surface detai-card-surface--solid absolute inset-0 z-20 flex h-full items-center justify-center rounded-[15px] transition-opacity duration-500 ease-out group-hover:pointer-events-none group-hover:opacity-0">
              <Image
                src="/assets/animations/logo.svg"
                alt="Логотип DETai"
                width={320}
                height={320}
                className="logo logo--accent-soft h-[68%] w-[68%] object-contain"
                priority={false}
              />
            </div>

            <div className="absolute inset-0 z-10 flex items-center justify-center p-mobile-1 md:p-3">
              <div className="relative flex h-[92%] w-full max-w-none flex-col items-center justify-center overflow-hidden px-mobile-4 py-mobile-6 text-center md:h-[94%] md:px-10 md:py-8 paper--object-mobile paper-shape--scroll paper-edges--scroll md:paper--ambient">
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
