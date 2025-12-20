import BodyText from "../ui/BodyText";
import DefaultCard from "../ui/DefaultCard";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

const audienceCards = [
  {
    title: "Психологам и терапевтам",
    description:
      "DET даёт диалектическое видение внутреннего движения человека, культуру присутствия и ценностную рамку практики. DETai добавляет прикладные AI-инструменты, которые помогают поддерживать процесс терапии и создавать новые формы взаимодействия.",
  },
  {
    title: "Людям, идущим путём внутреннего развития",
    description:
      "DET предлагает язык самопонимания, честности и выбора. DETai создаёт ежедневные формы поддержки — ботов, интерфейсы, сценарии — которые соединяют внутреннюю работу и современную технологическую культуру.",
  },
  {
    title: "Исследователям и авторам",
    description:
      "DET даёт структуру, концепции и модели, которые позволяют описывать глубинные процессы человеческой психики. DETai предоставляет пространство, где идеи можно проверять, соединять, воплощать и развивать дальше.",
  },
  {
    title: "Создателям технологий и продуктов",
    description:
      "DET задаёт ценностную основу и стиль взаимодействия, а DETai — технологическую архитектуру. Здесь рождаются продукты, которые соединяют человеческую глубину и AI, и позволяют строить смыслы, опираясь на современные технологические стандарты.",
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

      <div className="mt-mobile-6 grid grid-cols-1 gap-mobile-4 md:mt-12 md:grid-cols-2 md:gap-8">
        {audienceCards.map((card) => (
          <DefaultCard key={card.title} title={card.title}>
            <BodyText variant="infoCard">
              {card.description}
            </BodyText>
          </DefaultCard>
        ))}
      </div>
    </Section>
  );
}
