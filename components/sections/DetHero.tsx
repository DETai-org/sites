import Image from "next/image";

import BodyText from "../ui/BodyText";
import Heading from "../ui/Heading";
import Section from "../ui/Section";
import HeroScene from "./HeroScene";

export default function DetHero() {
  return (
    <Section
      id="det-hero"
      variant="light"
      className="relative overflow-hidden bg-accent-soft"
      containerClassName="relative grid min-h-[70vh] grid-cols-1 items-center gap-8 md:min-h-[80vh] md:grid-cols-[minmax(28rem,0.9fr)_minmax(24rem,1.1fr)] md:gap-12"
      fullWidth
    >
      <div className="order-1 flex flex-col gap-mobile-3 md:gap-6">
        <Heading level={1} className="text-4xl md:text-5xl">
          DET — Dialectical Existential Therapy.
        </Heading>

        <BodyText variant="sectionDefaultOnLight" className="text-lg md:text-xl md:leading-relaxed">
          Внутренняя двойственность — наш дар, а не наш баг.
        </BodyText>
        <BodyText
          variant="sectionDefaultOnLight"
          className="text-mobile-small md:text-xl md:leading-relaxed"
        >
          Единство и борьба противоположностей — не то, что ломает, а то, что делает нас сильнее.
        </BodyText>
      </div>

      <HeroScene
        className="order-2 flex min-h-[22rem] flex-col items-center justify-center md:order-2 md:min-h-[30rem] lg:min-h-[34rem]"
      >
        <Image
          src="/assets/animations/logo.svg"
          alt="DET logo"
          width={288}
          height={288}
          className="logo logo--basic-dark h-[14rem] w-[14rem] object-contain md:h-[18rem] md:w-[18rem]"
        />
      </HeroScene>
    </Section>
  );
}
