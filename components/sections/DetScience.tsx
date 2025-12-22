"use client";

import { useState } from "react";
import Link from "next/link";

import BodyText from "../ui/BodyText";
import Heading from "../ui/Heading";
import Section from "../ui/Section";
import { cn } from "@/lib/utils";

type PublicationLinkType = "PDF" | "DOI" | "SITE" | "LIST";

type PublicationLink = {
  type: PublicationLinkType;
  href: string;
};

type Publication = {
  title: string;
  venue: string;
  authors?: string;
  year: number;
  href: string;
  links?: PublicationLink[];
};

const featuredArticles: Publication[] = [
  {
    title:
      "Взаимосвязь занятий атлетизмом с психологическими чертами «тёмной триады» и установкой на преодоление",
    venue: "Журнал «Психология и педагогика спортивной деятельности»",
    authors: "Колхонен А.Ю., Андреев В.В.",
    year: 2023,
    href: "#",
  },
  {
    title:
      "Представления о «добре» и «зле» студентов-психологов в «до-ковидную эпоху» и в настоящее время. Часть 1. Анализ семантического пространства категорий «добро» и «зло»",
    venue:
      "Журнал «Институт психологии Российской академии наук. Социальная и экономическая психология»",
    authors: "Юмкина Е.А., Колхонен А.Ю., Мироненко И.А.",
    year: 2023,
    href: "#",
  },
  {
    title:
      "Представления о «добре» и «зле» студентов-психологов в «до-ковидную эпоху» и в настоящее время. Часть 2. Содержательный анализ определений добра и зла",
    venue:
      "Журнал «Институт психологии Российской академии наук. Социальная и экономическая психология»",
    authors: "Юмкина Е.А., Колхонен А.Ю., Мироненко И.А.",
    year: 2023,
    href: "#",
  },
];

const dissertations: Publication[] = [
  {
    title: "Взаимосвязь этических представлений и характерологических особенностей личности",
    venue:
      "Диссертация на соискание учёной степени кандидата психологических наук",
    year: 2025,
    href: "#",
  },
];

const talks: Publication[] = [];

type TabId = "articles" | "dissertations" | "talks";

const tabs: { id: TabId; label: string }[] = [
  { id: "articles", label: "Статьи" },
  { id: "dissertations", label: "Диссертации" },
  { id: "talks", label: "Тезисы и доклады" },
];

export default function DetScience() {
  const [activeTab, setActiveTab] = useState<TabId>("articles");

  return (
    <Section
      id="det-science"
      variant="light"
      className="bg-basic-light"
      containerClassName="flex flex-col gap-mobile-5 md:gap-10"
    >
      <div className="flex flex-col gap-mobile-3 md:gap-4">
        <Heading level={2} color="basic">
          Научная обоснованность
        </Heading>
        <BodyText variant="sectionDefaultOnLight" className="max-w-4xl">
          DET вырастает из ценностей и подкрепляется научной обоснованностью — исследованием, наблюдением и моделями, которые
          помогают удерживать ясность и проверяемость.<br />
          <br />
          Мы уважаем данные и стремимся к точности, но не сводим человека к схеме: наука здесь — опора, а не рамка, которая
          отменяет живое переживание.
        </BodyText>
      </div>

      <div className="flex flex-col gap-mobile-4 md:gap-6" id="det-publications">
        <div className="flex flex-wrap items-center justify-between gap-mobile-3 md:gap-4">
          <Heading level={3} color="basic" className="text-xl md:text-3xl">
            Публикации
          </Heading>
          <Link
            href="/det/publications"
            className="text-mobile-small font-semibold text-accent-primary underline decoration-accent-primary/60 underline-offset-4 transition-colors duration-200 hover:text-accent-hover"
          >
            Смотреть все публикации →
          </Link>
        </div>

        <div
          role="tablist"
          aria-label="Категории публикаций"
          className="flex flex-wrap gap-2 overflow-x-auto rounded-xl border border-basic-dark/10 bg-basic-light p-mobile-2 md:gap-3"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              id={`det-tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`det-tabpanel-${tab.id}`}
              type="button"
              className={cn(
                "whitespace-nowrap rounded-full border px-4 py-2 text-mobile-small font-semibold transition-colors duration-200",
                activeTab === tab.id
                  ? "border-accent-primary/50 bg-accent-soft text-basic-dark shadow-sm"
                  : "border-basic-dark/10 bg-basic-light text-basic-dark hover:border-basic-dark/30"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-basic-dark/10 bg-white/70 p-mobile-3 shadow-sm md:p-6">
          {activeTab === "articles" && (
            <PublicationList
              id="det-tabpanel-articles"
              labelledBy="det-tab-articles"
              publications={featuredArticles}
            />
          )}

          {activeTab === "dissertations" && (
            <PublicationList
              id="det-tabpanel-dissertations"
              labelledBy="det-tab-dissertations"
              publications={dissertations}
            />
          )}

          {activeTab === "talks" && (
            <PlaceholderPanel id="det-tabpanel-talks" labelledBy="det-tab-talks" />
          )}
        </div>
      </div>
    </Section>
  );
}

type PublicationListProps = {
  id: string;
  labelledBy: string;
  publications: Publication[];
};

function PublicationList({ id, labelledBy, publications }: PublicationListProps) {
  return (
    <div role="tabpanel" id={id} aria-labelledby={labelledBy}>
      <div className="flex flex-col divide-y divide-basic-dark/10">
        {publications.map((publication) => (
          <article key={publication.title} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 md:gap-3">
            <div className="flex flex-col gap-mobile-2 md:flex-row md:items-start md:justify-between">
              <Link
                href={publication.href}
                className="text-lg font-semibold text-basic-dark underline decoration-accent-primary/50 underline-offset-[6px] transition-colors duration-200 hover:text-accent-hover md:text-xl"
              >
                {publication.title}
              </Link>
              {publication.links && publication.links.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {publication.links.map((link) => (
                    <Link
                      key={`${publication.title}-${link.type}`}
                      href={link.href}
                      className="rounded-full border border-basic-dark/10 px-3 py-1 text-xs font-semibold text-accent-primary transition-colors duration-200 hover:border-accent-primary/50 hover:text-accent-hover"
                    >
                      [{link.type}]
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <p className="text-mobile-small text-basic-dark md:text-lg md:leading-relaxed">
              <span className="italic">{publication.venue}</span>
              {publication.authors ? ` — ${publication.authors}` : null} —
              <span className="font-medium"> {publication.year}</span>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

type PlaceholderPanelProps = {
  id: string;
  labelledBy: string;
};

function PlaceholderPanel({ id, labelledBy }: PlaceholderPanelProps) {
  return (
    <div role="tabpanel" id={id} aria-labelledby={labelledBy}>
      <BodyText variant="sectionDefaultOnLight" className="text-mobile-small md:text-xl">
        Здесь будут появляться тезисы конференций, доклады и презентации по мере выхода — чтобы было видно, как идеи DET проходят
        проверку и обсуждение в профессиональной среде.
      </BodyText>
    </div>
  );
}
