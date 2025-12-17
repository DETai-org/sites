import BodyText from "../ui/BodyText";
import HeadingLevel2 from "../ui/HeadingLevel2";
import Section from "../ui/Section";

import DetaiProjectCard from "./DetaiProjectCard";

const placeholderProjects = [
  {
    title: "Агенты сопровождения",
    description: "Скоро: персональные помощники DETai, удерживающие дневники, динамику и обратную связь между сессиями.",
    icon: "🧭",
    status: "В разработке",
  },
  {
    title: "Исследовательские модули",
    description: "Скоро: инструменты для наблюдений, аналитики и картирования состояний внутри единой методологической рамки.",
    icon: "🧪",
    status: "Скоро",
  },
  {
    title: "Инфраструктура DETai",
    description: "Скоро: сервисы и интерфейсы, которые соединяют данные, протоколы и взаимодействие людей с AI-агентами.",
    icon: "🛠️",
    status: "В разработке",
  },
];

export default function DetaiProjectsTeaser() {
  return (
    <Section id="detai-projects" variant="dark" className="border-y border-accent-primary/25">
      <div className="flex flex-col gap-mobile-6 md:gap-10">
        <div className="flex flex-col gap-mobile-2 md:gap-3">
          <HeadingLevel2 color="soft">Проекты DETai</HeadingLevel2>
          <BodyText className="max-w-3xl text-accent-soft/90 md:text-lg md:leading-relaxed">
            Практические формы применения диалектически-экзистенциальной терапии в технологической экосистеме DETai.
          </BodyText>
        </div>

        <div className="grid grid-cols-1 gap-mobile-4 md:grid-cols-3 md:gap-6">
          {placeholderProjects.map((project) => (
              <DetaiProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                label={project.status}
                icon={project.icon}
              />
          ))}
        </div>

        <div className="flex flex-col gap-mobile-2 md:flex-row md:items-center md:justify-between md:gap-3">
          <p className="text-mobile-lg leading-mobile-normal text-accent-soft/90 md:text-base md:leading-relaxed">
            Экосистема растёт: новые агенты и сервисы будут появляться по мере публикации.
          </p>
          <a
            className="inline-flex items-center gap-mobile-2 text-mobile-lg font-semibold text-accent-soft underline-offset-4 hover:underline md:text-base"
            href="/detai/projects"
          >
            Смотреть все проекты →
          </a>
        </div>
      </div>
    </Section>
  );
}
