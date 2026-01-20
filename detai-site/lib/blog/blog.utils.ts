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
