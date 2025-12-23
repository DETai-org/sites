import { publications } from "./publications.data";
import { Publication, PublicationType } from "./types";

const publicationTypeLabels: Record<PublicationType, string> = {
  article: "Статья",
  dissertation: "Диссертация",
  thesis: "Тезисы и доклады",
};

export function getAllPublications(): Publication[] {
  return publications;
}

export function getPublicationsByType(type: PublicationType): Publication[] {
  return publications.filter((publication) => publication.type === type);
}

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publications.find((publication) => publication.slug === slug);
}

export function getPublicationTypeLabel(type: PublicationType): string {
  return publicationTypeLabels[type];
}

export function buildPublicationDescription(publication: Publication): string {
  const seoLead = publication.seoLead?.trim();

  if (seoLead && seoLead.length > 0) {
    return seoLead;
  }

  const normalizedAbstract = publication.abstract.replace(/\s+/g, " ").trim();

  if (normalizedAbstract.length <= 160) {
    return normalizedAbstract;
  }

  const slice = normalizedAbstract.slice(0, 160);
  const sentenceBoundary = slice.lastIndexOf(".");

  if (sentenceBoundary > 60) {
    return slice.slice(0, sentenceBoundary + 1).trim();
  }

  const lastSpace = slice.lastIndexOf(" ");

  return slice.slice(0, lastSpace > 0 ? lastSpace : slice.length).trim();
}
