import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BodyText from "@/components/ui/BodyText";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import {
  buildPublicationDescription,
  getPublicationTypeLabel,
  getPublicationsByType,
} from "@/lib/publications/publications.utils";
import { Publication, PublicationType } from "@/lib/publications/types";

const publicationSections: { id: PublicationType; label: string; description: string }[] = [
  {
    id: "article",
    label: "Статьи",
    description: "Рецензируемые статьи и публикации, раскрывающие теорию и практику DET.",
  },
  {
    id: "dissertation",
    label: "Диссертации",
    description: "Защищённые и готовящиеся диссертационные исследования по тематике DET.",
  },
  {
    id: "thesis",
    label: "Тезисы и доклады",
    description: "Материалы конференций, презентации и краткие доклады.",
  },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Section
          id="det-publications-page"
          variant="light"
          containerClassName="flex flex-col gap-6 md:gap-10"
        >
          <div className="flex flex-col gap-mobile-3 md:gap-5">
            <Heading level={1} color="basic">
              Публикации
            </Heading>
            <BodyText variant="sectionDefaultOnLight" className="max-w-4xl">
              Централизованный список научных материалов DET. Каждая позиция открывается отдельной страницей, откуда доступен PDF и ссылки на внешние источники.
            </BodyText>
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            {publicationSections.map((section) => (
              <PublicationGroup
                key={section.id}
                section={section}
                publications={getPublicationsByType(section.id)}
              />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

type PublicationGroupProps = {
  section: { id: PublicationType; label: string; description: string };
  publications: Publication[];
};

function PublicationGroup({ section, publications }: PublicationGroupProps) {
  return (
    <section className="paper--object paper--object-mobile flex flex-col gap-3 rounded-2xl border border-[color:rgb(var(--soft-border)/0.1)] p-mobile-3 shadow-sm md:gap-4 md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-fg md:text-2xl">{section.label}</h2>
          <p className="text-mobile-small text-muted md:text-base">{section.description}</p>
        </div>
        <span className="rounded-full bg-[color:rgb(var(--soft-border)/0.05)] px-3 py-1 text-xs font-semibold text-fg md:text-sm">
          {publications.length} {publications.length === 1 ? "публикация" : "публикации"}
        </span>
      </div>

      {publications.length === 0 ? (
        <BodyText variant="sectionDefaultOnLight" className="text-mobile-small md:text-base">
          Материалы в этой категории появятся позже.
        </BodyText>
      ) : (
        <div className="flex flex-col divide-y divide-[color:rgb(var(--soft-border)/0.1)]">
          {publications.map((publication) => (
            <article key={publication.slug} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 md:gap-3">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/det/publications/${publication.slug}`}
                    className="text-base font-semibold text-fg underline decoration-accentVar/50 underline-offset-[6px] transition-colors duration-200 hover:text-accent-hover md:text-xl"
                  >
                    {publication.title}
                  </Link>
                  <div className="text-mobile-small text-muted md:text-base">
                    {publication.authors.join(", ")} · {publication.year} · {getPublicationTypeLabel(publication.type)}
                  </div>
                  {publication.journal ? (
                    <div className="text-mobile-small text-muted/80 md:text-base">{publication.journal}</div>
                  ) : null}
                </div>
              </div>
              <p className="pt-1 text-mobile-small text-muted md:text-base">
                {buildPublicationDescription(publication)}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
