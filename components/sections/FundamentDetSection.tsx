import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

export default function FundamentDetSection() {
  return (
    <Section id="fundament-det">
      <div className="flex flex-col gap-mobile-6 md:gap-8">
        <Heading level={2}>Фундамент DET</Heading>
        <div className="space-y-mobile-4 text-mobile-lg leading-mobile-normal text-basic-dark md:space-y-6 md:text-base md:leading-relaxed">
          <p>
            ✨ DET — это культурная и методологическая рамка, которая помогает видеть человека в его глубине, движении и внутренней
            диалектике. Это надшкольный способ мышления, соединяющий экзистенциальную психологию, исследовательскую позицию и
            культуру присутствия.
          </p>
          <p>
            Фундамент DET опирается на четыре уровня: концепцию, метод, платформу и проектную архитектуру. Вместе они образуют
            целостную систему, где смысл и практика поддерживают друг друга. Если тебе откликается идея внутренней честности,
            развития и диалектики — здесь начинается вход в глубинную часть DET.
          </p>
        </div>
        <div className="flex flex-col gap-mobile-3 md:flex-row md:items-center md:gap-4">
          <Button as="a" href="/det" className="w-fit" variant="primary">
            DET концепция
          </Button>
          <Button as="a" href="/det/logo" className="w-fit" variant="secondary">
            Смысл логотипа DET
          </Button>
        </div>
      </div>
    </Section>
  );
}
