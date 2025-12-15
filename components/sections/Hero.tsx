import HeroScene from "./HeroScene";
import Button from "../ui/Button";
import BodyText from "../ui/BodyText";
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
      <div className="relative z-20 w-full max-w-[48rem] md:max-w-[52rem]">
        <Heading level={1} color="soft" className="text-mobile-4xl leading-mobile-tight md:text-5xl">
          DET — Dialectical Existential Therapy.
        </Heading>
        <p className="mt-4 text-lg leading-snug text-accent-soft md:text-xl lg:text-2xl">
          Новый формат психотерапии
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(30rem,1.05fr)_minmax(24rem,0.95fr)] md:items-start md:gap-10 lg:grid-cols-[minmax(36rem,1fr)_minmax(28rem,1fr)] lg:gap-14">
        <div className="order-2 flex w-full max-w-[48rem] flex-col gap-mobile-3 md:order-1 md:max-w-none md:gap-6">

          <BodyText>
            DET — диалектически-экзистенциальная терапия — это культура понимания человека.
            <br />
            DETai — это технологическая экосистема, включающая продукты, интерфейсы и AI-инструменты,
            которые воплощают культуру DET в прикладных и повседневных формах — доступных как клиентам,
            так и психотерапевтам.
          </BodyText>

          <BodyText className="mt-4" variant="default">
            Вместе DET и DETai формируют новый формат психотерапии — где диалектика, гуманизм,
            и современные технологии соединяются в единую систему терапевтической практики.
          </BodyText>

          <div className="flex flex-col items-center w-full gap-4 mt-mobile-2 md:flex-row md:items-center md:justify-start md:w-auto md:gap-4 md:mt-0 lg:gap-6">
            <Button as="a" href="#fundament-det" variant="primary">
              DETai проекты
            </Button>
            
            <Button as="a" href="#mission" variant="secondary">
              DET концепция
            </Button>
          </div>
        </div>

        <HeroScene
          className="order-1 flex-shrink-0 overflow-hidden min-h-[22rem] md:order-2 md:min-h-[30rem] md:ml-12 lg:ml-16 xl:ml-20"
          logoSize="32rem"
        />
      </div>
    </Section>
  );
}
