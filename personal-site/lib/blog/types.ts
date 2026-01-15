export type BlogPostStatus = "publish" | "draft" | "private";
export type Lang = "ru" | "en" | "de" | "fi" | "cn";

export interface BlogTaxonomy {
  label: string;
  slug: string;
}

export interface BlogImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface BlogPostBase {
  id: string;
  slugs: Record<Lang, string>;
  titles: Record<Lang, string>;
  publishedAt: string;
  author: string;
  status: BlogPostStatus;
  rubric: BlogTaxonomy;
  category: BlogTaxonomy;
  keywords: BlogTaxonomy[];
  keywordsRaw: string[];
  coverImage?: BlogImage;
  originalLink?: string;
  wordpressId?: number;
  excerpt?: string;
  contentFiles: Record<Lang, string>;
}

export interface BlogPostSummary extends Omit<BlogPostBase, "slugs" | "contentFiles"> {
  lang: Lang;
  slug: string;
  excerpt: string;
}

export interface BlogPost extends BlogPostSummary {
  slugs: Record<Lang, string>;
  content: string;
  contentHtml: string;
}
