import type { Lang } from "@/lib/blog/types";

type BlogPostCopy = {
  emptyContent: string;
  rubricLabel: string;
  categoryLabel: string;
  minReadLabel: string;
  expandCoverLabel: string;
  collapseCoverLabel: string;
};

export const blogPostCopyByLang: Record<Lang, BlogPostCopy> = {
  ru: {
    emptyContent: "Контент скоро появится.",
    rubricLabel: "Рубрика",
    categoryLabel: "Категория",
    minReadLabel: "мин чтения",
    expandCoverLabel: "Показать полностью",
    collapseCoverLabel: "Свернуть",
  },
  en: {
    emptyContent: "Content is coming soon.",
    rubricLabel: "Rubric",
    categoryLabel: "Category",
    minReadLabel: "min read",
    expandCoverLabel: "Show full image",
    collapseCoverLabel: "Collapse",
  },
  de: {
    emptyContent: "Der Inhalt erscheint in Kürze.",
    rubricLabel: "Rubrik",
    categoryLabel: "Kategorie",
    minReadLabel: "Min. Lesezeit",
    expandCoverLabel: "Bild anzeigen",
    collapseCoverLabel: "Ausblenden",
  },
  fi: {
    emptyContent: "Sisältö julkaistaan pian.",
    rubricLabel: "Rubriikki",
    categoryLabel: "Kategoria",
    minReadLabel: "min lukuaika",
    expandCoverLabel: "Näytä kuva",
    collapseCoverLabel: "Piilota",
  },
  cn: {
    emptyContent: "内容即将发布。",
    rubricLabel: "栏目",
    categoryLabel: "分类",
    minReadLabel: "分钟阅读",
    expandCoverLabel: "查看图片",
    collapseCoverLabel: "收起",
  },
};
