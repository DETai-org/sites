import { Publication } from "./types";

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
