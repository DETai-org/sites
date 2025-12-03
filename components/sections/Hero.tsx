import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

export default function Hero() {
  return (
    <Section id="hero" variant="dark" className="relative overflow-hidden" containerClassName="relative">
      <div className="relative flex min-h-screen flex-col items-start justify-start gap-mobile-4 pt-mobile-4 md:hidden">
        <div className="absolute inset-0 h-full bg-basic-dark" />
        <div className="absolute inset-0 h-full bg-basic-dark/50" />

        <div className="relative flex w-full flex-col items-start gap-mobile-3 text-left">
          <Heading level={1} color="soft" className="text-mobile-4xl leading-mobile-tight md:text-5xl">
            DET — Dialectical Existential Therapy.
          </Heading>
          <Heading
            level={1}
            color="soft"
            className="text-mobile-fluid md:text-4xl md:leading-tight"
          >
            Новый формат психотерапии
          </Heading>
          <p className="hidden max-w-2xl text-lg leading-relaxed text-accent-soft md:block">
            Диалектически-экзистенциальная терапия — это культура понимания человека. DETai — это технологическая экосистема,
            включая продукты, интерфейсы и AI-инструменты, которые воплощают культуру DET в прикладных и ежедневных формах —
            доступных как клиентам, так и психотерапевтам.
          </p>
          <div className="flex flex-wrap items-center justify-start gap-mobile-4 md:gap-6">
            <Button as="a" href="#fundament-det" variant="primary">
              Фундамент DET
            </Button>
            <Button as="a" href="#mission" variant="secondary" className="hidden md:inline-flex">
              Миссия и ценности
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden flex-col gap-6 py-16 md:flex md:gap-10 md:py-24">
        <div className="flex-1 space-y-6">
          <Heading level={1} color="soft">
            DET — Dialectical Existential Therapy.
            <br />
            Новый формат психотерапии
          </Heading>
          <p className="max-w-2xl text-lg leading-relaxed text-accent-soft md:text-xl">
            Диалектически-экзистенциальная терапия — это культура понимания человека. DETai — это технологическая экосистема,
            включая продукты, интерфейсы и AI-инструменты, которые воплощают культуру DET в прикладных и ежедневных формах —
            доступных как клиентам, так и психотерапевтам.
          </p>
          <div className="flex flex-wrap items-center gap-4">
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
