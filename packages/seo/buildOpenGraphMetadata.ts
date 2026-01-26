import type { Metadata } from "next";

import { DEFAULT_OG_TYPE, DEFAULT_SITE_NAME } from "./defaults";
import type { OgInput } from "./types";
import { resolveAbsoluteUrl } from "./resolveAbsoluteUrl";
import { resolveOgImageUrl } from "./resolveOgImageUrl";

const isValidBaseUrl = (value: string): boolean => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const normalizeDescription = (description?: string): string => {
  return description?.trim() ?? "";
};

export const buildOpenGraphMetadata = (input: OgInput): Metadata => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const hasValidBaseUrl = Boolean(baseUrl && isValidBaseUrl(baseUrl));
  const description = normalizeDescription(input.description);
  const type = input.type ?? DEFAULT_OG_TYPE;

  const openGraphBase = {
    title: input.title,
    description,
    type,
    siteName: DEFAULT_SITE_NAME,
    locale: input.locale,
    publishedTime: input.publishedTime,
    authors: input.authors?.map((author) => author.url ?? author.name),
  };

  if (!hasValidBaseUrl) {
    return {
      title: input.title,
      description,
      openGraph: openGraphBase,
      twitter: {
        card: "summary",
        title: input.title,
        description,
      },
    };
  }

  const absoluteUrl = resolveAbsoluteUrl(baseUrl as string, input.urlPath);
  const ogImage = resolveOgImageUrl(baseUrl as string, input.coverImageSrc);

  return {
    title: input.title,
    description,
    metadataBase: new URL(baseUrl as string),
    openGraph: {
      ...openGraphBase,
      url: absoluteUrl,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: input.title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
};
