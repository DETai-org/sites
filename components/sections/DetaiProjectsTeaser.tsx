import BodyText from "../ui/BodyText";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

const placeholderProjects = [
  {
    title: "Агенты сопровождения",
    description:
      "ProjectCard заглушка: персональные помощники DETai, удерживающие дневники, динамику и обратную связь между сессиями.",
  },
  {
    title: "Исследовательские модули",
    description:
      "ProjectCard заглушка: инструменты для наблюдений, аналитики и картирования состояний внутри единой методологической рамки.",
  },
  {
    title: "Инфраструктура DETai",
    description:
      "ProjectCard заглушка: сервисы и интерфейсы, которые соединяют данные, протоколы и взаимодействие людей с AI-агентами.",
  },
];

export default function DetaiProjectsTeaser() {
  return (
    <Section id="detai-projects" className="border-y border-accent-primary/20 bg-basic-light">
      <div className="flex flex-col gap-mobile-6 md:gap-10">
        <div className="flex flex-col gap-mobile-2 md:gap-3">
          <Heading level={2}>Проекты DETai</Heading>
          <BodyText className="max-w-3xl text-basic-dark md:text-lg md:leading-relaxed">
            Практические формы применения диалектически-экзистенциальной терапии в технологической экосистеме DETai.
          </BodyText>
        </div>

        <div className="grid grid-cols-1 gap-mobile-4 md:grid-cols-3 md:gap-6">
          {placeholderProjects.map((project) => (
            <article
              key={project.title}
              className="flex h-full flex-col justify-between gap-mobile-3 rounded-xl border border-accent-primary/25 bg-basic-light p-mobile-4 shadow-sm md:gap-4 md:p-5"
              aria-label={`ProjectCard заглушка: ${project.title}`}
            >
              <div className="flex flex-col gap-mobile-2 md:gap-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-accent-primary md:text-base">
                  {project.title}
                </p>
                <p className="text-mobile-lg leading-mobile-normal text-basic-dark md:text-base md:leading-relaxed">
                  {project.description}
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-mobile-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-basic-dark md:text-sm">
                ProjectCard • заглушка
              </span>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-mobile-2 md:flex-row md:items-center md:justify-between md:gap-3">
          <p className="text-mobile-lg leading-mobile-normal text-basic-dark md:text-base md:leading-relaxed">
            Экосистема растёт: новые агенты и сервисы будут появляться по мере публикации.
          </p>
          <a
            className="inline-flex items-center gap-mobile-2 text-mobile-lg font-semibold text-basic-dark underline-offset-4 hover:underline md:text-base"
            href="/detai/projects"
          >
            Смотреть все проекты →
          </a>
        </div>
      </div>
    </Section>
  );
}
