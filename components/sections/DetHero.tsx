import BodyText from "../ui/BodyText";
import HeroHeadingTitle from "../ui/HeroHeadingTitle";
import Section from "../ui/Section";
import HeroScene from "./HeroScene";
import AnimatedLogo from "../visual/AnimatedLogo";

const brandDarkColor: [number, number, number, number] = [
  30 / 255,
  27 / 255,
  25 / 255,
  1,
];

export default function DetHero() {
  return (
    <Section
      id="det-hero"
      variant="light"
      className="relative overflow-hidden bg-[color:rgb(var(--det-hero-bg))] bg-no-repeat [background-image:var(--det-hero-glow)]"
      containerClassName="relative flex min-h-[70vh] flex-col justify-center gap-8 md:min-h-[80vh] md:gap-12"
      fullWidth
    >
      <div className="relative z-20 w-full max-w-[48rem] md:max-w-[52rem]">
        <HeroHeadingTitle className="text-fg">
          DET — Dialectical Existential Therapy.
        </HeroHeadingTitle>
        <p className="mt-4 text-lg leading-snug text-fg md:text-xl lg:text-2xl">
          Новый формат психотерапии
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(30rem,1.05fr)_minmax(24rem,0.95fr)] md:items-start md:gap-10 lg:grid-cols-[minmax(36rem,1fr)_minmax(28rem,1fr)] lg:gap-14">
        <div className="order-2 flex w-full max-w-[48rem] flex-col gap-mobile-3 md:order-1 md:max-w-none md:gap-6">
          <BodyText variant="sectionDefaultOnLight">
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
          className="order-1 flex-shrink-0 min-h-[22rem] md:order-2 md:min-h-[30rem] md:ml-12 lg:ml-16 xl:ml-20 overflow-hidden"
        >
          <AnimatedLogo
            size="32rem"
            className="max-h-[28rem] max-w-[28rem]"
            colorOverride={brandDarkColor}
          />
        </HeroScene>
      </div>
    </Section>
  );
}
