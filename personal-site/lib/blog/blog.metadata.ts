export function getMetadataBase(): URL | undefined {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    process.env.VERCEL_URL;

  if (!siteUrl) {
    return undefined;
  }

  const normalized = siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`;

  return new URL(normalized);
}
