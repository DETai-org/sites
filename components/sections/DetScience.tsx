"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import BodyText from "../ui/BodyText";
import Heading from "../ui/Heading";
import Section from "../ui/Section";
import { cn } from "@/lib/utils";
import { getPublicationsByType } from "@/lib/publications/publications.utils";
import { Publication } from "@/lib/publications/types";

type TabId = "articles" | "dissertations" | "talks";

const tabs: { id: TabId; label: string; type: Publication["type"] }[] = [
  { id: "articles", label: "Статьи", type: "article" },
  { id: "dissertations", label: "Диссертации", type: "dissertation" },
  { id: "talks", label: "Тезисы и доклады", type: "thesis" },
];

export default function DetScience() {
  const [activeTab, setActiveTab] = useState<TabId>("articles");

  const publicationsByTab = useMemo(() => {
    return tabs.reduce<Record<TabId, Publication[]>>((acc, tab) => {
      acc[tab.id] = getPublicationsByType(tab.type);
      return acc;
    }, { articles: [], dissertations: [], talks: [] });
  }, []);

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
          помогают удерживать ясность и проверяемость.
          <br />
          <br />
          Мы уважаем данные и стремимся к точности, но не сводим человека к схеме: наука здесь — опора, а не рамка, которая отменяет
          живое переживание.
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
                "whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors duration-200 md:px-4 md:py-2 md:text-mobile-small",
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
          {tabs.map((tab) => (
            <PublicationPanel
              key={tab.id}
              id={`det-tabpanel-${tab.id}`}
              labelledBy={`det-tab-${tab.id}`}
              active={activeTab === tab.id}
              publications={publicationsByTab[tab.id]}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

type PublicationPanelProps = {
  id: string;
  labelledBy: string;
  active: boolean;
  publications: Publication[];
};

function PublicationPanel({ id, labelledBy, active, publications }: PublicationPanelProps) {
  if (!active) return null;

  if (publications.length === 0) {
    return (
      <div role="tabpanel" id={id} aria-labelledby={labelledBy}>
        <BodyText variant="sectionDefaultOnLight" className="text-mobile-small md:text-xl">
          Здесь будут появляться новые материалы — статьи, диссертации и доклады по мере выхода.
        </BodyText>
      </div>
    );
  }

  return (
    <div role="tabpanel" id={id} aria-labelledby={labelledBy}>
      <div className="flex flex-col divide-y divide-basic-dark/10">
        {publications.map((publication) => (
          <article key={publication.slug} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 md:gap-3">
            <div className="flex flex-col gap-mobile-2 md:flex-row md:items-start md:justify-between">
              <div className="flex flex-col gap-1">
                <Link
                  href={`/det/publications/${publication.slug}`}
                  className="text-base font-semibold text-basic-dark underline decoration-accent-primary/50 underline-offset-[6px] transition-colors duration-200 hover:text-accent-hover md:text-xl"
                >
                  {publication.title}
                </Link>
                <p className="text-mobile-small text-basic-dark/80 md:text-base">
                  {publication.authors.join(", ")} · {publication.year}
                </p>
                {publication.journal ? (
                  <p className="text-mobile-small text-basic-dark/70 md:text-base">{publication.journal}</p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {getSortedPdfs(publication.pdfs).map((pdf) => (
                  <Link
                    key={`${publication.slug}-${pdf.lang}`}
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-basic-dark/10 px-3 py-1 text-xs font-semibold text-accent-primary transition-colors duration-200 hover:border-accent-primary/50 hover:text-accent-hover"
                  >
                    PDF ({pdf.lang})
                  </Link>
                ))}
                {publication.externalLinks?.map((link) => (
                  <Link
                    key={`${publication.slug}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-basic-dark/10 px-3 py-1 text-xs font-semibold text-basic-dark transition-colors duration-200 hover:border-accent-primary/50 hover:text-accent-hover"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <p className="text-sm text-basic-dark md:text-lg md:leading-relaxed">{publication.abstract}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function getSortedPdfs(pdfs: Publication["pdfs"]) {
  return [...pdfs].sort((a, b) => {
    if (a.lang === b.lang) return 0;
    return a.lang === "RU" ? -1 : 1;
  });
}
