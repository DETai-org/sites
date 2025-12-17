import HeadingLevel2 from "../ui/HeadingLevel2";
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
        <HeadingLevel2>Для кого DET и DETai</HeadingLevel2>
        <p className="max-w-mobile text-mobile-lg leading-mobile-normal text-basic-dark md:max-w-2xl md:text-base md:leading-relaxed">
          DET — это культурная рамка понимания человека и тип внутренней позиции. DETai — её технологическое продолжение. Вместе
          они создают смыслы и инструменты для тех, кто развивается сам и помогает развиваться другим: психологам,
          исследователям, создателям сервисов и людям, которые чувствуют себя частью семьи с общим внутренним принципом.
        </p>
      </div>

      <div className="mt-mobile-6 grid grid-cols-1 gap-mobile-4 md:mt-12 md:grid-cols-2 md:gap-8">
        {audienceCards.map((card) => (
          <div
            key={card.title}
            className="flex h-full flex-col gap-mobile-3 rounded-xl border border-accent-primary/30 bg-accent-soft p-mobile-4 text-basic-dark shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:border-accent-primary hover:shadow-lg md:gap-4 md:p-6"
          >
            <h3 className="text-mobile-xl font-serif font-semibold leading-mobile-tight text-basic-dark md:text-2xl md:leading-snug">
              {card.title}
            </h3>
            <p className="text-mobile-lg leading-mobile-normal text-basic-dark md:text-base md:leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
