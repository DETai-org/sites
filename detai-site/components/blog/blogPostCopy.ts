import type { Lang } from "@/lib/blog/types";

type BlogPostCopy = {
  emptyContent: string;
  rubricLabel: string;
  categoryLabel: string;
  minReadLabel: string;
};

export const blogPostCopyByLang: Record<Lang, BlogPostCopy> = {
  ru: {
    emptyContent: "Контент скоро появится.",
    rubricLabel: "Рубрика",
    categoryLabel: "Категория",
    minReadLabel: "мин чтения",
  },
  en: {
    emptyContent: "Content is coming soon.",
    rubricLabel: "Rubric",
    categoryLabel: "Category",
    minReadLabel: "min read",
  },
  de: {
    emptyContent: "Der Inhalt erscheint in Kürze.",
    rubricLabel: "Rubrik",
    categoryLabel: "Kategorie",
    minReadLabel: "Min. Lesezeit",
  },
  fi: {
    emptyContent: "Sisältö julkaistaan pian.",
    rubricLabel: "Rubriikki",
    categoryLabel: "Kategoria",
    minReadLabel: "min lukuaika",
  },
  cn: {
    emptyContent: "内容即将发布。",
    rubricLabel: "栏目",
    categoryLabel: "分类",
    minReadLabel: "分钟阅读",
  },
};
