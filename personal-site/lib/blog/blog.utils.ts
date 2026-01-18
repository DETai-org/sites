const ISO_FALLBACK_DATE = "1970-01-01T00:00:00.000Z";

export function formatBlogDate(publishedAt: string, locale: string): string {
  const parsed = Date.parse(publishedAt);

  if (Number.isNaN(parsed)) {
    console.warn(`[blog] Некорректная дата публикации: ${publishedAt}`);
    return "";
  }

  return new Date(parsed).toLocaleDateString(locale);
}

export function normalizeIsoDate(value: string | undefined): string {
  if (!value) {
    return ISO_FALLBACK_DATE;
  }

  const parsed = Date.parse(value);

  if (Number.isNaN(parsed)) {
    console.warn(`[blog] Некорректная дата публикации: ${value}`);
    return ISO_FALLBACK_DATE;
  }

  return new Date(parsed).toISOString();
}

export function resolveIsoDateFromYmd(dateYmd?: string): string | undefined {
  if (!dateYmd) {
    return undefined;
  }

  const isoCandidate = `${dateYmd}T00:00:00+00:00`;
  const parsed = Date.parse(isoCandidate);

  if (Number.isNaN(parsed)) {
    console.warn(`[blog] Некорректный date_ymd в frontmatter: ${dateYmd}`);
    return undefined;
  }

  return new Date(parsed).toISOString();
}
