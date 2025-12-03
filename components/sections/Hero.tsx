import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

export default function Hero() {
  return (
    <Section
      id="hero"
      variant="dark"
      className="relative overflow-hidden"
      containerClassName="relative flex min-h-screen flex-col items-center justify-center gap-mobile-6 md:min-h-[500px] md:flex-row md:items-center md:justify-between md:gap-10"
    >
      <div className="absolute inset-0 bg-basic-dark md:hidden" />
      <div className="absolute inset-0 bg-basic-dark/60 md:hidden" />

      <div className="relative flex w-full max-w-mobile flex-col items-center gap-mobile-4 text-center md:max-w-none md:w-1/2 md:items-start md:gap-6 md:text-left">
        <Heading level={1} color="soft" className="text-mobile-4xl md:text-5xl">
          DET — Dialectical Existential Therapy.
          <br />
          Новый формат психотерапии
        </Heading>
        <p className="hidden max-w-2xl text-lg leading-relaxed text-accent-soft md:block">
          Диалектически-экзистенциальная терапия — это культура понимания человека. DETai — это технологическая экосистема, включая продукты,
          интерфейсы и AI-инструменты, которые воплощают культуру DET в прикладных и ежедневных формах — доступных как клиентам, так и психотерапевтам.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-mobile-4 md:justify-start md:gap-6">
          <Button as="a" href="#fundament-det" variant="primary">
            Фундамент DET
          </Button>
          <Button as="a" href="#mission" variant="secondary" className="hidden md:inline-flex">
            Миссия и ценности
          </Button>
        </div>
      </div>

      <div className="relative hidden w-full md:flex md:w-1/2 md:justify-end">
        <div className="h-[500px] w-full max-w-3xl rounded-lg bg-basic-dark/80" />
      </div>
    </Section>
  );
}
