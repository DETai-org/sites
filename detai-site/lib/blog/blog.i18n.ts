import type { Lang } from "./types";

export const supportedLangs: Lang[] = ["ru", "en", "de", "fi", "cn"];

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
