import BodyText from "../ui/BodyText";
import DefaultCard from "../ui/DefaultCard";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

const detValues = [
  {
    title: "Ценность диалектически-экзистенциальной терапии",
    description:
      "Первая ценность DET — уважение к внутренней двойственности человека. Мы не пытаемся “исправить” внутрений конфликт и противоречия как дефект: мы учимся видеть в них динамику, смысл и возможность для роста.",
  },
  {
    title: "Безусловная вера во внутренний потенциал",
    description:
      "Вторая ценность — безусловная вера во внутренний потенциал личности. В человеке уже заложено все потенциально возможное — и наша задача помочь проявиться тому, что может сделать жизнь глубже, честнее и устойчивее.",
  },
];

export default function DetValues() {
  return (
    <Section
      id="det-values"
      variant="dark"
      className="bg-basic-dark"
      containerClassName="flex flex-col gap-mobile-5 md:gap-10"
    >
      <div className="flex flex-col gap-mobile-3 md:gap-4">
        <Heading level={2} color="soft">
          Ценности DET
        </Heading>
        <BodyText className="max-w-3xl">
          Ценности диалектически-экзистенциальной терапии
        </BodyText>
      </div>

      <div className="grid grid-cols-1 gap-mobile-4 md:grid-cols-2 md:gap-6">
        {detValues.map((value) => (
          <DefaultCard key={value.title} title={value.title} variant="dark">
            <BodyText className="text-mobile-body text-accent-soft md:text-xl md:leading-relaxed">
              {value.description}
            </BodyText>
          </DefaultCard>
        ))}
      </div>
    </Section>
  );
}
