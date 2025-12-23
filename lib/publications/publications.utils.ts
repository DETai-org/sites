import { publications } from "./publications.data";
import { Publication, PublicationType } from "./types";

export function getAllPublications(): Publication[] {
  return publications;
}

export function getPublicationsByType(type: PublicationType): Publication[] {
  return publications.filter((publication) => publication.type === type);
}

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publications.find((publication) => publication.slug === slug);
}
