"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import BodyText from "../ui/BodyText";
import Heading from "../ui/Heading";
import Section from "../ui/Section";
import { cn } from "@/lib/utils";

type PracticeStatus = "active" | "soon" | "planned";

type PracticeFormat = {
  title: string;
  status: PracticeStatus;
  description: string;
  href: string;
};

type FilterOption = "all" | PracticeStatus;

const statusMeta: Record<PracticeStatus, { label: string; icon: string }> = {
  active: { label: "Сейчас доступно", icon: "🟢" },
  soon: { label: "Скоро", icon: "🟡" },
  planned: { label: "В разработке", icon: "⚪" },
};

const practiceFormats: PracticeFormat[] = [
  {
    title: "Индивидуальная работа",
    status: "active",
    description:
      "Индивидуальная психотерапия и сопровождение. Глубокая работа, где важны честность, присутствие и движение в противоречии.",
    href: "/det/practice#individual",
  },
  {
    title: "Групповая терапия",
    status: "soon",
    description:
      "Группа как пространство изменений: поддержка, обратная связь и совместная работа над тем, что в одиночку удерживать трудно.",
    href: "/det/practice#group-therapy",
  },
  {
    title: "Группы встреч и дискуссионные круги",
    status: "active",
    description:
      "Формат культуры DET: общий костёр, разговор и совместное мышление. Вход в сообщество через присутствие и диалог.",
    href: "/det/practice#circles",
  },
  {
    title: "Обучение и мастер-классы",
    status: "planned",
    description:
      "Обучающие форматы и практические разборы. Скоро добавим программы, темы и календарь событий.",
    href: "/det/practice#education",
  },
];

const filters: { id: FilterOption; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "active", label: "Сейчас доступно" },
  { id: "soon", label: "Скоро" },
  { id: "planned", label: "В разработке" },
];

export default function DetPractice() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

  const filteredFormats = useMemo(
    () =>
      practiceFormats.filter(
        (format) => activeFilter === "all" || format.status === activeFilter,
      ),
    [activeFilter],
  );

  return (
    <Section
      id="det-practice"
      variant="light"
      className="bg-basic-light"
      containerClassName="flex flex-col gap-mobile-5 md:gap-10"
    >
      <div className="flex flex-col gap-mobile-3 md:gap-4">
        <Heading level={2} color="basic">
          Практика и форматы
        </Heading>
        <BodyText variant="sectionDefaultOnLight" className="max-w-4xl">
          DET — это не набор техник, а способ держать процесс: культура присутствия, внутренняя честность и уважение к
          противоречию как источнику движения.
          <br />
          <br />
          Мы развиваем практику так, чтобы она оставалась человеческой и проверяемой: где смысл не отрывается от опыта, а
          опыт не теряет глубины.
          <br />
          <br />
          Форматы могут включать индивидуальную работу, группы встреч, дискуссионные круги, мастер-классы, лекции и
          обучение. Часть форматов сейчас в разработке — скоро откроем набор и опубликуем подробности.
          <br />
          <br />
          Технологии важны нам как усиление культуры — но сами по себе не являются её источником.
        </BodyText>
      </div>

      <div className="flex flex-wrap gap-2 overflow-x-auto rounded-xl border border-basic-dark/10 bg-white/70 p-mobile-2 md:gap-3 md:p-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={cn(
              "whitespace-nowrap rounded-full border px-4 py-2 text-mobile-small font-semibold transition-colors duration-200 md:text-base",
              activeFilter === filter.id
                ? "border-accent-primary/50 bg-accent-soft text-basic-dark shadow-sm"
                : "border-basic-dark/10 bg-basic-light text-basic-dark hover:border-basic-dark/30",
            )}
            aria-pressed={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 justify-items-stretch gap-mobile-4 md:grid-cols-2 md:justify-items-center md:gap-6">
        {filteredFormats.map((format) => (
          <article
            key={format.title}
            className="flex h-full w-full flex-col gap-mobile-3 rounded-xl border border-basic-dark/10 bg-white/70 p-mobile-4 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg md:gap-4 md:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <Heading level={3} className="text-xl font-serif font-semibold leading-snug md:text-2xl md:leading-snug">
                {format.title}
              </Heading>
              <span className="shrink-0 rounded-full bg-basic-light px-3 py-1 text-xs font-semibold text-basic-dark shadow-sm md:text-sm">
                {statusMeta[format.status].icon} {statusMeta[format.status].label}
              </span>
            </div>
            <p className="text-mobile-body text-basic-dark md:text-base md:leading-relaxed">
              {format.description}
            </p>
            <Link
              href={format.href}
              className="mt-auto inline-flex w-fit items-center gap-mobile-2 text-mobile-small font-semibold text-accent-primary underline decoration-accent-primary/60 underline-offset-4 transition-colors duration-200 hover:text-accent-hover md:gap-2 md:text-base"
            >
              Подробнее →
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
