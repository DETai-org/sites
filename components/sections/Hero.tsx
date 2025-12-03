import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

export default function Hero() {
  return (
    <Section id="hero" variant="dark">
      <div className="flex flex-col gap-6 py-16 md:gap-10 md:py-24">
        <div className="flex-1 space-y-6">
          <Heading level={1} color="soft">
            DET — Dialectical Existential Therapy.
            <br />
            Новый формат психотерапии
          </Heading>
          <p className="max-w-2xl text-lg leading-relaxed text-accent-soft md:text-xl">
            Диалектически-экзистенциальная терапия — это культура понимания человека. DETai — это технологическая экосистема,
            включающая продукты, интерфейсы и AI-инструменты, которые воплощают культуру DET в прикладных и ежедневных формах —
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
