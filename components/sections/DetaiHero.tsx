import Button from "../ui/Button";
import HeroHeadingTitle from "../ui/HeroHeadingTitle";
import Section from "../ui/Section";
import HeroScene from "./HeroScene";
import Heading from "../ui/Heading";

export default function DetaiHero() {
  const logoSize = "32rem";

  return (
    <Section
      id="detai-hero"
      variant="dark"
      className="relative min-h-screen overflow-hidden bg-[color:rgb(var(--hero-bg))] bg-no-repeat [background-image:var(--hero-glow)]"
      containerClassName="relative flex min-h-screen flex-col justify-between gap-8 py-16 md:gap-12 md:py-20"
      fullWidth
    >
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover object-right"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/video/robot_hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 [background:radial-gradient(circle_at_72%_45%,rgb(var(--hero-text)/0.08),transparent_45%),linear-gradient(to_right,rgb(var(--hero-bg)/0.95),rgb(var(--hero-bg)/0.7)_40%,rgb(var(--hero-bg)/0.35)_65%,transparent)]" />
      </div>

      <HeroScene
        className="absolute inset-0 z-30 flex min-h-full items-center justify-center pointer-events-none"
        logoSize={logoSize}
        disableParticles
      />

      <div className="relative z-20 w-full max-w-[48rem] self-start md:max-w-[52rem]">
        <HeroHeadingTitle className="text-[color:rgb(var(--hero-text))]">
          <span className="block">DETai</span>
          <span className="block whitespace-nowrap">Диалектически-экзистенциальная терапия,</span>
          <span className="block">обогащённая AI</span>
        </HeroHeadingTitle>
        <Heading
          level={2}
          className="mt-4 text-lg font-sans font-normal leading-snug text-[color:var(--hero-subtitle)] md:text-xl lg:text-2xl"
        >
          DETai — платформа AI-инструментов, которая воплощает культуру DET в прикладных формах.
        </Heading>
      </div>

      <div className="relative z-20 flex w-full max-w-[48rem] flex-col gap-6 self-start">
        <div className="mt-mobile-2 flex w-full flex-col items-start gap-4 md:mt-0 md:w-auto md:flex-row md:items-center md:justify-start md:gap-4 lg:gap-6">
          <Button as="a" href="/detai/projects" variant="primary">
            Проекты DETai
          </Button>
          <Button as="a" href="/det" variant="secondary">
            DET как культура
          </Button>
        </div>
      </div>
    </Section>
  );
}
