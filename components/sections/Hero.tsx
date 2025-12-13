import HeroScene from "./HeroScene";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

export default function Hero() {
  return (
    <Section id="hero" variant="dark" className="relative overflow-hidden" containerClassName="relative" fullWidth>
      <div className="grid grid-cols-1 items-start md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center min-h-screen gap-10 md:gap-12">
        <div className="relative z-10 flex max-w-xl flex-col gap-mobile-3 md:gap-6">
          <Heading level={1} color="soft" className="text-mobile-4xl leading-mobile-tight md:text-5xl">
            DET — Dialectical Existential Therapy.
            <br />
            Новый формат психотерапии
          </Heading>
          <p className="max-w-2xl text-lg leading-relaxed text-accent-soft md:text-xl">
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

        <HeroScene className="md:min-h-[28rem]" logoSize="28rem" />
      </div>
    </Section>
  );
}
