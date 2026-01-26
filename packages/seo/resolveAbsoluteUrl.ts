const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

export const resolveAbsoluteUrl = (baseUrl: string, pathOrUrl: string): string => {
  if (ABSOLUTE_URL_PATTERN.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const base = baseUrl.replace(/\/+$/, "");
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;

  return `${base}${path}`;
};
