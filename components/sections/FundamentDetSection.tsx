import Button from "../ui/Button";
import BodyText from "../ui/BodyText";
import HeadingLevel2 from "../ui/HeadingLevel2";
import MobileExpandableText from "../ui/MobileExpandableText";
import Section from "../ui/Section";

export default function FundamentDetSection() {
  const paragraphs = [
    "✨ DET — это культурная и методологическая рамка, которая помогает видеть человека в его глубине, движении и внутренней диалектике. Это надшкольный способ мышления, соединяющий экзистенциальную психологию, исследовательскую позицию и культуру присутствия.",
    "Фундамент DET опирается на четыре уровня: концепцию, метод, платформу и проектную архитектуру. Вместе они образуют целостную систему, где смысл и практика поддерживают друг друга. Если тебе откликается идея внутренней честности, развития и диалектики — здесь начинается вход в глубинную часть DET.",
  ];

  return (
    <Section id="fundament-det">
      <div className="flex flex-col gap-mobile-6 md:gap-8">
        <HeadingLevel2>Фундамент DET</HeadingLevel2>
        <div className="hidden flex-col space-y-6 md:flex">
          {paragraphs.map((paragraph) => (
            <BodyText key={paragraph} variant="sectionDefaultOnLight">
              {paragraph}
            </BodyText>
          ))}
        </div>

        <MobileExpandableText
          className="md:hidden"
          paragraphs={paragraphs}
          textVariant="sectionDefaultOnLight"
        />
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
