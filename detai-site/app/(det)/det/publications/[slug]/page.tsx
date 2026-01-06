import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ExpandableAbstract from "@/components/sections/publications/ExpandableAbstract";
import PublicationShare from "@/components/sections/publications/PublicationShare";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import {
  buildPublicationDescription,
  getAllPublications,
  getPublicationBySlug,
  getPublicationTypeLabel,
} from "@/lib/publications/publications.utils";
import { PublicationPdfLanguage } from "@/lib/publications/types";

const publicationPageContainerClassName = "flex flex-col gap-8 md:gap-10";
const actionLinkBaseClasses =
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 md:text-base";
const pdfLinkClasses = `${actionLinkBaseClasses} bg-gradient-to-br from-[rgb(var(--button-primary-from))] to-[rgb(var(--button-primary-to))] text-basic-dark shadow-[0_0_15px_rgb(var(--accent)/0.25)] hover:brightness-105 active:brightness-95`;
const externalLinkClasses = `${actionLinkBaseClasses} border-2 border-[color:var(--button-secondary-border)] text-[color:var(--button-secondary-text)] hover:bg-accentSoftVar/20`;

const publicationTypeTitle = "det-publication-page";

type PublicationPageProps = { params: { slug: string } };

function buildTitle(title: string, author: string, year: number) {
  return `${title} — ${author}, ${year} | DETai`;
}

export function generateMetadata({ params }: PublicationPageProps): Metadata {
  const publication = getPublicationBySlug(params.slug);

  if (!publication) {
    return {
      title: "Публикация не найдена | DETai",
      description: "Материал не найден.",
    };
  }

  return {
    title: buildTitle(publication.title, publication.authors[0], publication.year),
    description: buildPublicationDescription(publication),
  };
}

export default function PublicationPage({ params }: PublicationPageProps) {
  const publication = getPublicationBySlug(params.slug);

  if (!publication) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Section
          id={publicationTypeTitle}
          variant="light"
          containerClassName={publicationPageContainerClassName}
        >
          <article className="flex flex-col gap-5 md:gap-7">
            <Heading level={1} color="basic">
              {publication.title}
            </Heading>

            <div className="flex flex-col gap-1 text-mobile-small text-muted md:text-base">
              <div className="flex flex-wrap items-center gap-2 font-semibold">
                <span>{publication.authors.join(", ")}</span>
                <span>· {publication.year}</span>
                <span>· {getPublicationTypeLabel(publication.type)}</span>
                {publication.journal ? <span>· {publication.journal}</span> : null}
              </div>
            </div>

            {publication.seoLead ? (
              <p className="max-w-4xl text-base font-medium text-fg md:text-lg">
                {publication.seoLead}
              </p>
            ) : null}

            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-3">
                {getSortedPdfs(publication.pdfs).map((pdf) => (
                  <Link
                    key={`${publication.slug}-${pdf.lang}`}
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={pdfLinkClasses}
                  >
                    Открыть PDF ({pdf.lang})
                  </Link>
                ))}

                {publication.externalLinks?.map((link) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={externalLinkClasses}
                  >
                    Открыть в {link.label}
                  </Link>
                ))}
              </div>

              {publication.doi ? (
                <div className="flex flex-col gap-1 text-mobile-small text-muted/80 md:text-base">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-fg">DOI:</span>
                    <Link
                      href={`https://doi.org/${publication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-border/60 underline-offset-[6px] transition-colors duration-200 hover:text-accent-hover hover:decoration-accentVar/60"
                      title="DOI может вести на страницу регистрации и не всегда открывает статью"
                    >
                      {publication.doi}
                    </Link>
                  </div>
                  <span className="text-xs italic text-muted/80">
                    DOI может вести на страницу регистрации и не всегда открывает статью
                  </span>
                </div>
              ) : null}

              <PublicationShare />
            </div>

            <div className="paper--object paper--object-mobile flex flex-col gap-5 rounded-2xl p-mobile-3 shadow-sm md:gap-6 md:p-6">
              <section className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-fg md:text-xl">Аннотация</h2>
                <ExpandableAbstract text={publication.abstract} className="max-w-4xl" />
              </section>

              {publication.keywords?.length ? (
                <section className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold text-fg md:text-lg">Ключевые слова</h3>
                  <p className="text-mobile-small text-muted md:text-base">
                    {publication.keywords.join(", ")}
                  </p>
                </section>
              ) : null}

              {publication.citation ? (
                <section className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold text-fg md:text-lg">Как цитировать</h3>
                  <div className="flex flex-col gap-1 text-mobile-small text-muted md:text-base">
                    {publication.citation.apa ? <p>APA: {publication.citation.apa}</p> : null}
                    {publication.citation.gost ? <p>ГОСТ: {publication.citation.gost}</p> : null}
                  </div>
                </section>
              ) : null}
            </div>

            <div className="flex flex-col gap-4 border-t border-[color:rgb(var(--soft-border)/0.1)] pt-4 md:gap-5 md:pt-6">
              <Link
                href="/det/publications"
                className="text-base font-semibold text-accentVar underline decoration-accentVar/50 underline-offset-[6px] transition-colors duration-200 hover:text-accent-hover"
              >
                ← Все публикации
              </Link>

              <div className="flex flex-col gap-3 rounded-2xl border border-[color:rgb(var(--soft-border)/0.1)] bg-[color:rgb(var(--panel-bg))] p-mobile-3 text-fg shadow-sm md:gap-4 md:p-6">
                <p className="text-mobile-small md:text-base">
                  DETai — экосистема инструментов и проектов, использующая научные данные в рамках Культуры DET.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/det" className="w-fit" passHref legacyBehavior>
                    <Button as="a" variant="secondary" className="px-5 py-2 text-sm md:text-base">
                      О концепции DET
                    </Button>
                  </Link>
                  <Link href="/detai" className="w-fit" passHref legacyBehavior>
                    <Button as="a" variant="primary" className="px-5 py-2 text-sm md:text-base">
                      Проекты DETai
                    </Button>
                  </Link>
                </div>
                <p className="text-xs text-muted md:text-mobile-small">
                  Данная публикация относится к исследовательскому полю, тематически связанному с экзистенциально-диалектической психотерапией (DET).
                </p>
              </div>
            </div>
          </article>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return getAllPublications().map((publication) => ({
    slug: publication.slug,
  }));
}

function getSortedPdfs(pdfs: { lang: PublicationPdfLanguage; url: string }[]) {
  return [...pdfs].sort((a, b) => {
    if (a.lang === b.lang) return 0;
    return a.lang === "RU" ? -1 : 1;
  });
}
