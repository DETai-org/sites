"use client";

import { useMemo, useRef } from "react";

import { projects, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

import BodyText from "../ui/BodyText";
import HeadingLevel2 from "../ui/HeadingLevel2";
import ProjectCard from "../ui/ProjectCard";

type ProjectsListSectionProps = {
  containerClassName?: string;
};

const ECHELON_TITLES: Record<Project["echelon"], string> = {
  1: "Эшелон I",
  2: "Эшелон II",
  3: "Эшелон III",
};

function getPlaceholderProjects(echelon: Project["echelon"], count: number) {
  return Array.from({ length: count }, (_, index) => ({
    id: `placeholder-${echelon}-${index}`,
    title: "Скоро",
    description: "Заглушка для тестирования карусели.",
    avatarSrc: "/images/avatars_projects/Мед.png",
    echelon,
    href: "/detai/projects",
  } satisfies Project));
}

function EchelonRow({ echelon, items }: { echelon: Project["echelon"]; items: Project[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCardWidth = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const firstCard = container.querySelector<HTMLDivElement>("[data-project-card]");
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 320;
    const gap = 20;
    const scrollAmount = (cardWidth + gap) * 2;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative flex flex-col gap-mobile-3 md:gap-4">
      <div className="flex items-start justify-between gap-mobile-2 pr-14 md:items-center md:gap-3 md:pr-0">
        <BodyText variant="sectionDefaultDark" className="text-accentSoftVar/80 dark:text-fg/80">
          {ECHELON_TITLES[echelon]}
        </BodyText>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollByCardWidth("left")}
            className="rounded-full border border-accentVar/30 bg-surface2/70 px-3 py-2 text-accentSoftVar transition-colors duration-150 hover:border-accentVar/60 hover:text-accentSoftVar/90 dark:text-fg dark:hover:text-fg/90"
            aria-label="Прокрутить влево"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCardWidth("right")}
            className="rounded-full border border-accentVar/30 bg-surface2/70 px-3 py-2 text-accentSoftVar transition-colors duration-150 hover:border-accentVar/60 hover:text-accentSoftVar/90 dark:text-fg dark:hover:text-fg/90"
            aria-label="Прокрутить вправо"
          >
            →
          </button>
        </div>
      </div>

      <div className="absolute right-0 top-0 flex items-center gap-2 md:hidden">
        <button
          type="button"
          onClick={() => scrollByCardWidth("left")}
          className="rounded-full border border-accentVar/30 bg-surface2/70 px-3 py-2 text-accentSoftVar transition-colors duration-150 hover:border-accentVar/60 hover:text-accentSoftVar/90 dark:text-fg dark:hover:text-fg/90"
          aria-label="Прокрутить влево"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollByCardWidth("right")}
          className="rounded-full border border-accentVar/30 bg-surface2/70 px-3 py-2 text-accentSoftVar transition-colors duration-150 hover:border-accentVar/60 hover:text-accentSoftVar/90 dark:text-fg dark:hover:text-fg/90"
          aria-label="Прокрутить вправо"
        >
          →
        </button>
      </div>

      <div className="relative">
        <div className="overflow-hidden pr-4 md:pr-12">
          <div
            ref={scrollRef}
            className="flex gap-mobile-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-3 md:gap-5"
          >
            {items.map((project) => (
              <div
                key={project.id}
                className="w-[82%] min-w-[260px] max-w-[320px] flex-shrink-0 h-[400px] md:h-auto md:w-[320px] md:max-w-[320px]"
              >
                <ProjectCard {...project} compactMobileText />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface2 via-surface2/70 to-transparent md:w-20" />
      </div>
    </div>
  );
}

export default function ProjectsListSection({ containerClassName }: ProjectsListSectionProps) {
  const echelonGroups = useMemo(
    () =>
      [1, 2, 3].map((echelon) => {
        const echelonProjects = projects.filter((project) => project.echelon === echelon);
        const placeholders = getPlaceholderProjects(echelon as Project["echelon"], 3);

        return {
          echelon: echelon as Project["echelon"],
          items: [...echelonProjects, ...placeholders],
        };
      }),
    [],
  );

  return (
    <section className="w-full bg-surface2 text-accentSoftVar dark:text-fg">
      <div
        className={cn(
          "mx-auto w-full px-mobile-4 py-mobile-6 md:max-w-6xl md:px-10 md:py-20",
          containerClassName,
        )}
      >
        <div className="flex flex-col gap-mobile-6 md:gap-10">
          <div className="flex flex-col gap-mobile-2 md:gap-3">
            <HeadingLevel2 color="soft">Каталог проектов DETai</HeadingLevel2>
            <BodyText variant="sectionDefaultDark" className="max-w-3xl text-accentSoftVar/80 dark:text-fg/80">
              Три эшелона проектов с готовыми и запланированными инструментами: прокручивайте, чтобы увидеть больше.
            </BodyText>
          </div>

          <div className="flex flex-col gap-mobile-6 md:gap-10">
            {echelonGroups.map((group) => (
              <EchelonRow key={group.echelon} echelon={group.echelon} items={group.items} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
