import { publications } from "./publications.data";
import { Publication, PublicationType } from "./types";
import { buildPublicationDescription } from "./publications.description";

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

export function getPublicationsBySlugs(slugs: string[]): Publication[] {
  const publicationMap = new Map(publications.map((publication) => [publication.slug, publication]));

  return slugs
    .map((slug) => publicationMap.get(slug))
    .filter((publication): publication is Publication => Boolean(publication));
}

export function getPublicationTypeLabel(type: PublicationType): string {
  return publicationTypeLabels[type];
}

export { buildPublicationDescription };
