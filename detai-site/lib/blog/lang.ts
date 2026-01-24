import type { Lang } from "./types";

const htmlLangMap: Record<Lang, string> = {
  ru: "ru",
  en: "en",
  de: "de",
  fi: "fi",
  cn: "zh",
};

export function langToHtmlLang(lang: Lang): string {
  return htmlLangMap[lang];
}
