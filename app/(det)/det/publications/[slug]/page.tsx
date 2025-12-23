import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BodyText from "@/components/ui/BodyText";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import {
  getAllPublications,
  getPublicationBySlug,
} from "@/lib/publications/publications.utils";

export default function PublicationPage({ params }: { params: { slug: string } }) {
  const publication = getPublicationBySlug(params.slug);

  if (!publication) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-basic-light text-basic-dark">
      <Header />
      <main className="flex flex-1 flex-col">
        <Section
          id="det-publication-page"
          variant="light"
          className="bg-basic-light"
          containerClassName="flex flex-col gap-6 md:gap-8"
        >
          <article className="flex flex-col gap-4 md:gap-6">
            <Heading level={1} color="basic">
              {publication.title}
            </Heading>

            <div className="flex flex-col gap-1 text-mobile-small text-basic-dark/80 md:text-base">
              <div className="font-semibold">
                {publication.authors.join(", ")} · {publication.year}
              </div>
              {publication.journal ? <div>{publication.journal}</div> : null}
            </div>

            <BodyText variant="sectionDefaultOnLight" className="max-w-4xl text-basic-dark">
              {publication.abstract}
            </BodyText>

            <div className="flex flex-wrap gap-3">
              <Link
                href={publication.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent-primary px-4 py-2 text-sm font-semibold text-basic-light transition-colors duration-200 hover:bg-accent-hover"
              >
                Скачать PDF
              </Link>

              {publication.externalLinks?.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-basic-dark/15 px-4 py-2 text-sm font-semibold text-basic-dark transition-colors duration-200 hover:border-accent-primary/60 hover:text-accent-hover"
                >
                  {link.label}
                </Link>
              ))}
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
