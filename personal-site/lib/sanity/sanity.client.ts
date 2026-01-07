import { createClient, type SanityClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION ?? "2024-01-01";

export function getSanityClient(): SanityClient | null {
  if (!projectId || !dataset) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production",
  });
}

export function isSanityConfigured(): boolean {
  return Boolean(projectId && dataset);
}
