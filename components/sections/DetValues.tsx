import Image from "next/image";

import BodyText from "../ui/BodyText";
import DefaultCard from "../ui/DefaultCard";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

const detValues = [
  {
    title: "Право на противоречие",
    description:
      "Уважение к внутренней двойственности человека.\u00a0\u00a0Мы не пытаемся “исправить” внутренний конфликт и противоречия как дефект: мы учимся видеть в них динамику, смысл и возможность для роста.",
  },
  {
    title: "Безусловная вера во внутренний потенциал",
    description:
      "Безусловная вера во внутренний потенциал личности.\u00a0\u00a0В человеке уже заложено все потенциально возможное — и наша задача помочь проявиться тому, что может сделать жизнь глубже, честнее и устойчивее.",
  },
];

export default function DetValues() {
  return (
    <Section
      id="det-values"
      variant="dark"
      containerClassName="flex flex-col gap-mobile-6 md:gap-10"
    >
      <div className="flex flex-col gap-mobile-3 md:gap-4">
        <Heading level={2} color="soft">
          Ценности диалектически-экзистенциальной терапии ⚜️
        </Heading>
        <BodyText className="max-w-3xl">
          Это не техники — это то, на чём держится культура DET.
        </BodyText>
      </div>

      <div className="grid grid-cols-1 gap-mobile-4 md:grid-cols-2 md:gap-6">
        {detValues.map((value, index) => (
          <DefaultCard
            key={value.title}
            title={value.title}
            variant="dark"
            className="gap-mobile-2 md:gap-3"
            titleClassName="min-h-0 text-left text-xl leading-snug md:min-h-0 md:text-[2rem] md:leading-snug"
            titlePrefixPlacement="top-left"
            titlePrefix={
              <Image
                alt={`Золотая цифра ${index + 1}`}
                className="h-20 w-20 md:h-[5.5rem] md:w-[5.5rem]"
                height={88}
                src={`/images/gold_numbers/${index + 1}_number.webp`}
                width={88}
              />
            }
          >
            <BodyText className="text-left text-mobile-body text-accentSoftVar md:text-base md:leading-relaxed dark:text-fg">
              {value.description}
            </BodyText>
          </DefaultCard>
        ))}
      </div>
    </Section>
  );
}
