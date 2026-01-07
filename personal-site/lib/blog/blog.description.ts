import { BlogPost } from "./types";

export function buildBlogPostDescription(post: Pick<BlogPost, "excerpt" | "content">): string {
  const explicitExcerpt = post.excerpt?.trim();

  if (explicitExcerpt) {
    return explicitExcerpt;
  }

  const withoutHeading = post.content.replace(/^#\s.+\n+/, "");
  const normalized = withoutHeading.replace(/\s+/g, " ").trim();

  if (normalized.length <= 180) {
    return normalized;
  }

  const slice = normalized.slice(0, 180);
  const sentenceBoundary = slice.lastIndexOf(".");

  if (sentenceBoundary > 80) {
    return slice.slice(0, sentenceBoundary + 1).trim();
  }

  const lastSpace = slice.lastIndexOf(" ");

  return slice.slice(0, lastSpace > 0 ? lastSpace : slice.length).trim();
}
