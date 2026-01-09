import { Lang } from "./types";

export const supportedLangs: Lang[] = ["ru", "en", "de", "fi", "cn"];
export const defaultLang: Lang = "ru";

export function isLang(value: string): value is Lang {
  return supportedLangs.includes(value as Lang);
}

export function normalizeLang(value?: string | null): Lang | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  const base = normalized.split("-")[0];

  if (base === "zh") {
    return "cn";
  }

  return isLang(base) ? base : undefined;
}
