import HeroScene from "./HeroScene";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

export default function Hero() {
  return (
    <Section
      id="hero"
      variant="dark"
      className="relative overflow-hidden"
      containerClassName="relative flex flex-col gap-8 md:gap-12"
      fullWidth
    >
      <div className="relative z-20 w-full max-w-screen-md">
        <Heading level={1} color="soft" className="text-mobile-4xl leading-mobile-tight md:text-5xl">
          DET — Dialectical Existential Therapy.
        </Heading>
        <p className="mt-4 text-lg leading-snug text-accent-soft md:text-xl lg:text-2xl">
          Новый формат психотерапии
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,48ch)_1fr] md:items-center md:gap-12">
        <div className="order-2 flex w-full max-w-screen-md flex-col gap-mobile-3 md:order-1 md:gap-6">
          <p className="text-lg leading-relaxed text-accent-soft md:text-xl">
            Диалектически-экзистенциальная терапия — это культура понимания человека. DETai — это технологическая экосистема,
            включая продукты, интерфейсы и AI-инструменты, которые воплощают культуру DET в прикладных и ежедневных формах —
            доступных как клиентам, так и психотерапевтам.
          </p>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <Button as="a" href="#fundament-det" variant="primary">
              Фундамент DET
            </Button>
            <Button as="a" href="#mission" variant="secondary">
              Миссия и ценности
            </Button>
          </div>
        </div>

        <HeroScene className="order-1 flex-shrink-0 min-h-[22rem] md:order-2 md:ml-8 md:min-h-[30rem] lg:ml-12" logoSize="32rem" />
      </div>
    </Section>
  );
}
