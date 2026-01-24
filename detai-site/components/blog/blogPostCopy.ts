import type { Lang } from "@/lib/blog/types";

type BlogPostCopy = {
  shareLabel: string;
  emptyContent: string;
  rubricLabel: string;
  tagsLabel: string;
};

export const blogPostCopyByLang: Record<Lang, BlogPostCopy> = {
  ru: {
    shareLabel: "Поделиться",
    emptyContent: "Контент скоро появится.",
    rubricLabel: "Рубрика",
    tagsLabel: "Теги",
  },
  en: {
    shareLabel: "Share",
    emptyContent: "Content is coming soon.",
    rubricLabel: "Rubric",
    tagsLabel: "Tags",
  },
  de: {
    shareLabel: "Teilen",
    emptyContent: "Der Inhalt erscheint in Kürze.",
    rubricLabel: "Rubrik",
    tagsLabel: "Tags",
  },
  fi: {
    shareLabel: "Jaa",
    emptyContent: "Sisältö julkaistaan pian.",
    rubricLabel: "Rubriikki",
    tagsLabel: "Tunnisteet",
  },
  cn: {
    shareLabel: "分享",
    emptyContent: "内容即将发布。",
    rubricLabel: "栏目",
    tagsLabel: "标签",
  },
};
