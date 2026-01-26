import { resolveAbsoluteUrl } from "./resolveAbsoluteUrl";

export const resolveOgImageUrl = (
  baseUrl: string,
  coverImageSrc?: string,
): string | undefined => {
  if (!coverImageSrc) {
    return undefined;
  }

  return resolveAbsoluteUrl(baseUrl, coverImageSrc);
};
