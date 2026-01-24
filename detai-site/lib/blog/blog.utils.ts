export function formatBlogDate(publishedAt: string, locale: string): string {
  const parsed = Date.parse(publishedAt);

  if (Number.isNaN(parsed)) {
    console.warn(`[blog] Некорректная дата публикации: ${publishedAt}`);
    return "";
  }

  return new Date(parsed).toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function getReadingTime(content: string) {
  const plainText = stripMarkdown(content);
  const words = plainText.match(/\p{L}[\p{L}\p{N}'’-]*/gu) ?? [];
  return Math.max(1, Math.ceil(words.length / 200));
}

function stripMarkdown(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
