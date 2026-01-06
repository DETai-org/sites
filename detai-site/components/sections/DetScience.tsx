"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import BodyText from "../ui/BodyText";
import Heading from "../ui/Heading";
import Section from "../ui/Section";
import { cn } from "@/lib/utils";
import { buildPublicationDescription } from "@/lib/publications/publications.description";
import { getPublicationsBySlugsClient } from "@/lib/publications/publications.client";
import { publicationsTeaserConfig } from "@/lib/publications/publicationsTeaser.config";
import { Publication } from "@/lib/publications/types";

type TabId = "articles" | "dissertations" | "talks";

const tabs: {
  id: TabId;
  label: string;
  type: Publication["type"];
  limitDesktop: number;
  limitMobile: number;
  slugs: string[];
}[] = [
  {
    id: "dissertations",
    label: "Диссертации",
    type: "dissertation",
    limitDesktop: publicationsTeaserConfig.dissertations.limitDesktop,
    limitMobile: publicationsTeaserConfig.dissertations.limitMobile,
    slugs: publicationsTeaserConfig.dissertations.slugs,
  },
  {
    id: "articles",
    label: "Статьи",
    type: "article",
    limitDesktop: publicationsTeaserConfig.articles.limitDesktop,
    limitMobile: publicationsTeaserConfig.articles.limitMobile,
    slugs: publicationsTeaserConfig.articles.slugs,
  },
  {
    id: "talks",
    label: "Тезисы и доклады",
    type: "thesis",
    limitDesktop: publicationsTeaserConfig.thesis.limitDesktop,
    limitMobile: publicationsTeaserConfig.thesis.limitMobile,
    slugs: publicationsTeaserConfig.thesis.slugs,
  },
];

export default function DetScience() {
  const [activeTab, setActiveTab] = useState<TabId>("dissertations");

  const publicationsByTab = useMemo(() => {
    return tabs.reduce<Record<TabId, Publication[]>>((acc, tab) => {
      acc[tab.id] = getPublicationsBySlugsClient(tab.slugs).slice(0, tab.limitDesktop);
      return acc;
    }, { articles: [], dissertations: [], talks: [] });
  }, []);

  return (
    <Section
      id="det-science"
      variant="light"
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
        <div className="flex flex-wrap items-center gap-mobile-2 md:gap-3">
          <Heading level={3} color="basic" className="text-xl md:text-3xl">
            Публикации
          </Heading>
        </div>

        <div
          role="tablist"
          aria-label="Категории публикаций"
          className="flex flex-wrap gap-2 overflow-x-auto rounded-xl border border-[color:rgb(var(--soft-border)/0.1)] bg-[color:rgb(var(--panel-bg))] p-mobile-2 md:gap-3"
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
                  ? "border-accentVar/50 bg-accentSoftVar text-fg shadow-sm"
                  : "border-[color:rgb(var(--soft-border)/0.1)] bg-[color:rgb(var(--panel-bg))] text-fg hover:border-[color:rgb(var(--soft-border)/0.2)]"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="paper--object paper--object-mobile rounded-2xl border border-[color:rgb(var(--soft-border)/0.1)] p-mobile-3 shadow-sm md:p-6">
          {tabs.map((tab) => (
            <PublicationPanel
              key={tab.id}
              id={`det-tabpanel-${tab.id}`}
              labelledBy={`det-tab-${tab.id}`}
              active={activeTab === tab.id}
              publications={publicationsByTab[tab.id]}
              limitMobile={tab.limitMobile}
            />
          ))}
        </div>

        <div className="flex flex-col gap-mobile-2 md:flex-row md:items-center md:justify-between md:gap-3">
          <BodyText variant="sectionDefaultOnLight" className="text-mobile-small text-muted md:text-base">
            Полный каталог и свежие обновления — в разделе «Публикации».
          </BodyText>
          <Link
            href="/det/publications"
            className="inline-flex items-center gap-mobile-1 text-mobile-body font-semibold text-accentVar underline decoration-accentVar/60 underline-offset-4 transition-colors duration-200 hover:text-accent-hover md:text-base"
          >
            Смотреть все публикации →
          </Link>
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
  limitMobile: number;
};

function PublicationPanel({ id, labelledBy, active, publications, limitMobile }: PublicationPanelProps) {
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
      <div className="flex flex-col divide-y divide-[color:rgb(var(--soft-border)/0.1)]">
        {publications.map((publication, index) => (
          <article
            key={publication.slug}
            className={cn(
              "flex flex-col gap-2 py-4 first:pt-0 last:pb-0 md:gap-3",
              index >= limitMobile ? "hidden md:flex" : undefined,
            )}
          >
            <div className="flex flex-col gap-mobile-2 md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-4">
              <div className="flex flex-col gap-1">
                <Link
                  href={`/det/publications/${publication.slug}`}
                  className="text-base font-semibold text-fg underline decoration-accentVar/50 underline-offset-[6px] transition-colors duration-200 hover:text-accent-hover md:text-xl"
                >
                  {publication.title}
                </Link>
                <p className="text-mobile-small text-muted md:text-base">
                  {publication.authors.join(", ")} · {publication.year}
                </p>
                {publication.journal ? (
                  <p className="text-mobile-small text-muted/80 md:text-base">{publication.journal}</p>
                ) : null}
              </div>

              <div className="mt-1 flex flex-wrap items-start gap-2 md:mt-0 md:w-28 md:flex-col md:items-end">
                {getSortedPdfs(publication.pdfs).map((pdf) => (
                  <Link
                    key={`${publication.slug}-${pdf.lang}`}
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-28 justify-center rounded-full bg-surface2 px-3 py-1 text-xs font-semibold text-accentSoftVar transition-colors duration-200 hover:bg-accentVar"
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
                    className="inline-flex w-28 justify-center rounded-full border border-[color:rgb(var(--soft-border)/0.15)] bg-[color:rgb(var(--panel-bg))] px-3 py-1 text-xs font-semibold text-fg transition-colors duration-200 hover:border-accentVar/60 hover:text-accent-hover"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <p className="text-sm text-fg md:text-lg md:leading-relaxed">
              {buildPublicationDescription(publication)}
            </p>
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
