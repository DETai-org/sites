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
  1: "Эшелон I · Ядро",
  2: "Эшелон II · Пиар",
  3: "Эшелон III · Инфра/R&D",
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
    <div className="flex flex-col gap-mobile-3 md:gap-4">
      <div className="flex items-center justify-between gap-mobile-2 md:gap-3">
        <BodyText variant="sectionDefaultDark" className="text-accent-soft/80">
          {ECHELON_TITLES[echelon]}
        </BodyText>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollByCardWidth("left")}
            className="rounded-full border border-accent-primary/30 bg-basic-dark px-3 py-2 text-accent-soft transition-colors duration-150 hover:border-accent-primary/50 hover:text-accent-soft/90"
            aria-label="Прокрутить влево"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCardWidth("right")}
            className="rounded-full border border-accent-primary/30 bg-basic-dark px-3 py-2 text-accent-soft transition-colors duration-150 hover:border-accent-primary/50 hover:text-accent-soft/90"
            aria-label="Прокрутить вправо"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative -mx-mobile-4 md:-mx-10">
        <div className="bg-basic-dark px-mobile-4 pr-8 md:px-10 md:pr-16">
          <div
            ref={scrollRef}
            className="flex gap-mobile-4 overflow-x-auto overflow-y-visible scroll-smooth pb-4 md:gap-6"
          >
            {items.map((project) => (
              <div
                key={project.id}
                className="flex-shrink-0 px-1.5 md:px-2 min-w-[300px] md:min-w-[380px] md:w-[400px]"
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-basic-dark via-basic-dark to-transparent md:w-24" />
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
    <section className="w-full bg-basic-dark text-accent-soft">
      <div
        className={cn(
          "mx-auto w-full max-w-mobile px-mobile-4 py-mobile-6 md:max-w-6xl md:px-10 md:py-20",
          containerClassName,
        )}
      >
        <div className="flex flex-col gap-mobile-6 md:gap-10">
          <div className="flex flex-col gap-mobile-2 md:gap-3">
            <HeadingLevel2 color="soft">Каталог проектов DETai</HeadingLevel2>
            <BodyText variant="sectionDefaultDark" className="max-w-3xl text-accent-soft/80">
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
