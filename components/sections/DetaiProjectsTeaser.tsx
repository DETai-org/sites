import BodyText from "../ui/BodyText";
import HeadingLevel2 from "../ui/HeadingLevel2";
import Section from "../ui/Section";

import DetaiProjectCard from "./DetaiProjectCard";

const AVATAR = "/images/avatars_projects/Мед.png";

type PlaceholderProject = {
  title: string;
  description: string;
  avatarSrc: string;
  echelon: 1 | 2 | 3;
  href: string;
};

const placeholderProjects: PlaceholderProject[] = [
  {
    title: "Francis Galton",
    description: "Ваш цифровой психометрист. Измеряем личность с научной строгостью и человеческим пониманием.",
    avatarSrc: AVATAR,
    echelon: 1,
    href: "/projects/galton",
  },
  {
    title: "Агенты сопровождения",
    description: "Скоро: персональные помощники DETai, удерживающие дневники, динамику и обратную связь между сессиями.",
    avatarSrc: AVATAR,
    echelon: 2,
    href: "/projects/assistants",
  },
  {
    title: "Исследовательские модули",
    description: "Скоро: инструменты для наблюдений, аналитики и картирования состояний внутри единой методологической рамки.",
    avatarSrc: AVATAR,
    echelon: 3,
    href: "/projects/matrix",
  },
];

export default function DetaiProjectsTeaser() {
  return (
    <Section id="detai-projects" variant="dark" className="border-y border-accent-primary/25">
      <div className="flex flex-col gap-mobile-6 md:gap-10">
        <div className="flex flex-col gap-mobile-2 md:gap-3">
          <HeadingLevel2 color="soft">Проекты DETai</HeadingLevel2>
          <BodyText variant="sectionDefaultDark" className="max-w-3xl">
            Практические формы применения диалектически-экзистенциальной терапии в технологической экосистеме DETai.
          </BodyText>
        </div>

        <div className="grid grid-cols-1 gap-mobile-4 md:grid-cols-3 md:gap-6">
          {placeholderProjects.map((project) => (
            <DetaiProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              avatarSrc={project.avatarSrc}
              echelon={project.echelon}
              href={project.href}
            />
          ))}
        </div>

        <div className="flex flex-col gap-mobile-2 md:flex-row md:items-center md:justify-between md:gap-3">
          <BodyText variant="sectionDefaultDark" className="text-accent-soft/90">
            Экосистема растёт: новые агенты и сервисы будут появляться по мере публикации.
          </BodyText>
          <a
            className="inline-flex items-center gap-mobile-2 text-mobile-body font-semibold text-accent-soft underline-offset-4 hover:underline md:text-base"
            href="/detai/projects"
          >
            Смотреть все проекты →
          </a>
        </div>
      </div>
    </Section>
  );
}
