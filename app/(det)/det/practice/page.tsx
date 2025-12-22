import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BodyText from "@/components/ui/BodyText";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";

const practiceSections = [
  {
    id: "individual",
    title: "Индивидуальная работа",
    status: "🟢 Сейчас доступно",
    description:
      "Индивидуальная психотерапия и сопровождение — формат, где работа строится вокруг присутствия, честности и движения в противоречии.",
    note: "Скоро добавим подробное описание процесса и способы записи.",
  },
  {
    id: "group-therapy",
    title: "Групповая терапия",
    status: "🟡 Скоро",
    description:
      "Групповая терапия — пространство, где изменения поддерживаются общностью, обратной связью и совместным удержанием динамики.",
    note: "Скоро откроем набор и добавим информацию о темах и формате группы.",
  },
  {
    id: "circles",
    title: "Группы встреч и дискуссионные круги",
    status: "🟢 Сейчас доступно",
    description:
      "Группы встреч и дискуссионные круги — формат культуры DET: общий костёр, разговор, совместное мышление и присутствие.",
    note: "Скоро добавим календарь встреч и правила участия.",
  },
  {
    id: "education",
    title: "Обучение и мастер-классы",
    status: "⚪ В разработке",
    description:
      "Обучение и мастер-классы — события и программы, которые помогают осваивать язык DET, практики присутствия и диалектическое мышление.",
    note: "Скоро опубликуем темы, формат и календарь.",
  },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-basic-light text-basic-dark">
      <Header />
      <main className="flex flex-1 flex-col">
        <Section
          variant="light"
          className="bg-basic-light"
          containerClassName="flex flex-col gap-mobile-5 md:gap-10"
        >
          <div className="flex flex-col gap-mobile-3 md:gap-4">
            <Heading level={1} color="basic">
              Практика DET
            </Heading>
            <BodyText variant="sectionDefaultOnLight" className="max-w-4xl">
              Здесь собраны форматы практики DET — от индивидуальной работы до групп и обучающих событий.
              <br />
              <br />
              Страница в разработке: скоро добавим подробности, расписание и способы участия для каждого формата.
            </BodyText>
          </div>

          <div className="flex flex-col gap-mobile-4 md:gap-6">
            {practiceSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="flex flex-col gap-mobile-3 rounded-2xl border border-basic-dark/10 bg-white/70 p-mobile-4 shadow-sm md:gap-4 md:p-6"
              >
                <div className="flex flex-col gap-mobile-2 md:flex-row md:items-center md:justify-between md:gap-3">
                  <Heading level={2} className="text-2xl font-serif font-semibold leading-snug md:text-[2rem] md:leading-snug">
                    {section.title}
                  </Heading>
                  <span className="rounded-full bg-basic-light px-4 py-2 text-mobile-small font-semibold text-basic-dark shadow-sm md:text-base">
                    {section.status}
                  </span>
                </div>
                <p className="text-mobile-body text-basic-dark md:text-base md:leading-relaxed">
                  {section.description}
                </p>
                {section.status !== "🟢 Сейчас доступно" && (
                  <p className="text-mobile-small font-semibold text-accent-primary md:text-base">
                    Подробности появятся скоро
                  </p>
                )}
                <p className="text-mobile-small text-basic-dark md:text-base md:leading-relaxed">{section.note}</p>
              </section>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
