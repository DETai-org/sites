import { basePublications } from "./publications.base";
import { Publication, PublicationType } from "./types";

export function getPublicationsByTypeClient(type: PublicationType): Publication[] {
  return basePublications.filter((publication) => publication.type === type);
}

export function getPublicationsBySlugsClient(slugs: string[]): Publication[] {
  const publicationMap = new Map(basePublications.map((publication) => [publication.slug, publication]));

  return slugs
    .map((slug) => publicationMap.get(slug))
    .filter((publication): publication is Publication => Boolean(publication));
}
