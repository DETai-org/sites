import { projects, projectsTeaserConfig, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

import BodyText from "../ui/BodyText";
import HeadingLevel2 from "../ui/HeadingLevel2";
import ProjectCard from "../ui/ProjectCard";
import Section from "../ui/Section";

export default function DetaiProjectsTeaser() {
  const teaserProjects = projectsTeaserConfig
    .map(({ echelon, index }) => projects.filter((project) => project.echelon === echelon)[index])
    .filter((project): project is Project => Boolean(project));

  return (
    <Section id="detai-projects" variant="dark" className="border-y border-accentVar/25">
      <div className="flex flex-col gap-mobile-6 md:gap-10">
        <div className="flex flex-col gap-mobile-2 md:gap-3">
          <HeadingLevel2 color="soft">Проекты DETai</HeadingLevel2>
          <BodyText variant="sectionDefaultDark" className="max-w-3xl">
            Практические формы применения диалектически-экзистенциальной терапии в технологической экосистеме DETai.
          </BodyText>
        </div>

        <div className="grid grid-cols-1 gap-mobile-4 md:grid-cols-3 md:gap-6">
          {teaserProjects.map((project, index) => (
            <div key={project?.id ?? index} className={cn("h-full", index === 2 ? "hidden md:block" : undefined)}>
              {project ? <ProjectCard {...project} /> : null}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-mobile-2 md:flex-row md:items-center md:justify-between md:gap-3">
          <BodyText variant="sectionDefaultDark" className="text-accentSoftVar/90 dark:text-fg/90">
            Экосистема растёт: новые агенты и сервисы будут появляться по мере публикации.
          </BodyText>
          <a
            className="inline-flex items-center gap-mobile-2 text-mobile-body font-semibold text-accentSoftVar underline-offset-4 hover:underline md:text-base dark:text-fg"
            href="/detai/projects"
          >
            Смотреть все проекты →
          </a>
        </div>
      </div>
    </Section>
  );
}
