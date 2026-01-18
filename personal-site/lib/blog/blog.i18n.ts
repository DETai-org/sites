import { Lang } from "./types";

export const supportedLangs: Lang[] = ["ru", "en", "de", "fi", "cn"];
export const defaultLang: Lang = "ru";
export const blogLocaleByLang: Record<Lang, string> = {
  ru: "ru-RU",
  en: "en-US",
  de: "de-DE",
  fi: "fi-FI",
  cn: "zh-CN",
};

export function isLang(value: string): value is Lang {
  return supportedLangs.includes(value as Lang);
}

export function normalizeLang(value?: string | null): Lang | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  const candidates = normalized.split(",");

  for (const candidate of candidates) {
    const primary = candidate.split(";")[0]?.trim();
    if (!primary) {
      continue;
    }

    const base = primary.split("-")[0];

    if (base === "zh") {
      return "cn";
    }

    if (isLang(base)) {
      return base;
    }
  }

  return undefined;
}
