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
    <section className="w-full bg-gray-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-3xl">Для кого DET и DETai</h2>
          <p className="max-w-4xl text-base leading-relaxed text-gray-800 md:text-lg">
            DET — это культурная рамка понимания человека и тип внутренней позиции. DETai — её технологическое продолжение.
            Вместе они создают смыслы и инструменты для тех, кто развивается сам и помогает развиваться другим: психологам,
            исследователям, создателям сервисов и людям, которые чувствуют себя частью семьи с общим внутренним принципом.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
          {audienceCards.map((card) => (
            <div
              key={card.title}
              className="flex h-full flex-col gap-3 rounded-xl bg-white p-6 text-gray-900 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold leading-snug md:text-2xl">{card.title}</h3>
              <p className="text-sm leading-relaxed text-gray-700 md:text-base">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
