import { type ReactNode } from "react";

import BodyText from "../ui/BodyText";
import DefaultCard from "../ui/DefaultCard";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

const audienceCards: { title: string; description: ReactNode }[] = [
  {
    title: "Психологам и терапевтам",
    description: (
      <>
        <strong>DET:</strong> даёт надшкольную позицию, ценностную рамку практики и профессиональное сообщество специалистов,
        объединённых общими принципами — «общий костёр», у которого мы будем собираться.
        <br />
        <strong>DETai:</strong> добавляет прикладные AI-инструменты сопровождения в практике: дневники, динамику, опоры между
        сессиями и новые формы взаимодействия, которые поддерживают и специалиста, и клиента.
      </>
    ),
  },
  {
    title: "Людям, идущим путём внутреннего развития",
    description: (
      <>
        <strong>DET:</strong> даёт глубокую помощь и путь развития, основанные на ценностной и научной базе — не только психотерапия,
        но и разные форматы поддержки: группы, встречи, практики, обучение — всё, что помогает двигаться честно и устойчиво.
        <br />
        <strong>DETai:</strong> превращает эту работу в повседневность: ежедневные опоры, боты и интерфейсы, где сила алгоритмов и AI
        помогает удерживать курс, видеть динамику и не оставаться одному между важными шагами.
      </>
    ),
  },
  {
    title: "Исследователям и авторам",
    description: (
      <>
        <strong>DET:</strong> даёт поле концепций и моделей, на основе которых можно ставить вопросы, проводить исследования и
        развивать направление как научную тему.
        <br />
        <strong>DETai:</strong> даёт ресурс для проверки и воплощения идей: техническую базу, инструменты, прототипы и пространство,
        где гипотезы можно превращать в измерения, данные и исследовательские результаты.
      </>
    ),
  },
  {
    title: "Создателям технологий и продуктов",
    description: (
      <>
        <strong>DET:</strong> даёт смысловой каркас и культуру взаимодействия — если важно «зачем» и хочется быть частью сообщества,
        которое строит новую терапевтическую логику.
        <br />
        <strong>DETai:</strong> даёт инфраструктуру, где можно создавать реальные инструменты — агенты, интерфейсы, сервисы и продукты
        под одной экосистемой — в команде людей, которым важно и “зачем”, и “как”, чтобы изменения происходили не в теориях, а в
        жизни.
      </>
    ),
  },
];

export default function AudienceSection() {
  return (
    <Section>
      <div className="flex flex-col gap-mobile-4 md:gap-6">
        <Heading level={2}>Для кого DET и DETai</Heading>
        <BodyText variant="sectionDefaultOnLight" className="max-w-mobile md:max-w-2xl">
          DET — это культурная рамка понимания человека и тип внутренней позиции. DETai — её технологическое продолжение. Вместе
          они создают смыслы и инструменты для тех, кто развивается сам и помогает развиваться другим: психологам,
          исследователям, создателям сервисов и людям, которые чувствуют себя частью семьи с общим внутренним принципом.
        </BodyText>
      </div>

      <div className="mt-mobile-4 flex justify-end md:mt-6">
        <p className="text-right font-accent text-lg leading-tight text-basic-dark md:text-xl">
          Выберите карточку — и продолжим глубже.
        </p>
      </div>

      <div className="mt-mobile-5 grid grid-cols-1 gap-mobile-4 md:mt-10 md:grid-cols-2 md:gap-8">
        {audienceCards.map((card) => (
          <DefaultCard key={card.title} title={card.title}>
            <BodyText variant="infoCard">
              {card.description}
            </BodyText>
          </DefaultCard>
        ))}
      </div>

      <div className="mt-mobile-6 flex flex-col items-end gap-mobile-2 md:mt-10">
        <p className="text-right text-mobile-small italic text-basic-dark md:text-sm">
          <em>
            Это экосистема взаимного усиления: <br />
            смысл → практика → инструменты → данные → исследование → сообщество.
          </em>
        </p>
      </div>
    </Section>
  );
}
