export type BlogPostStatus = "publish" | "draft" | "private";
export type Lang = "ru" | "en" | "de" | "fi" | "cn";

export interface BlogTaxonomyRef {
  slug: string;
}

export interface BlogTaxonomy {
  slug: string;
  label: string;
}

export interface BlogTaxonomyDefinition {
  slug: string;
  labels: Record<Lang, string>;
}

export interface BlogRubricDefinition extends BlogTaxonomyDefinition {
  description: Record<Lang, string>;
  definition: {
    postulate: Record<Lang, string>;
  };
}

export interface BlogCategoryDefinition extends BlogTaxonomyDefinition {
  description: Record<Lang, string>;
}

export interface BlogKeywordDefinition extends BlogTaxonomyDefinition {}

export interface BlogTaxonomyIds {
  rubric_ids?: string[];
  category_ids?: string[];
  keyword_ids?: string[];
  keywords_raw?: string[];
}

export interface BlogPostFrontmatter {
  type?: "post";
  id?: string;
  slug?: string;
  authors?: string[];
  date_ymd?: string;
  status?: BlogPostStatus;
  title?: string;
  preview?: string;
  seoLead?: string;
  taxonomy?: BlogTaxonomyIds;
}

export interface BlogTaxonomyLocalized {
  rubric?: BlogTaxonomy;
  category?: BlogTaxonomy;
  keywords?: BlogTaxonomy[];
}

export interface BlogPostLocalizedFields {
  id: string;
  slugs: Record<Lang, string>;
  titles: Record<Lang, string>;
}

export interface BlogImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface BlogPostBase {
  postId: string;
  publishedAt: string;
  author: string;
  status: BlogPostStatus;
  rubric: BlogTaxonomyRef;
  category: BlogTaxonomyRef;
  keywords: BlogTaxonomyRef[];
  keywordsRaw: string[];
  coverImage?: BlogImage;
  originalLink?: string;
  wordpressId?: number;
  excerpt?: string;
  contentFiles: Record<Lang, string>;
  frontmatter?: BlogPostFrontmatter;
}

export interface BlogPostResolved
  extends BlogPostBase,
    BlogPostLocalizedFields,
    BlogTaxonomyLocalized {}

export interface BlogPostSummary extends Omit<BlogPostResolved, "slugs" | "contentFiles"> {
  lang: Lang;
  slug: string;
  excerpt: string;
}

export interface BlogPost extends BlogPostSummary {
  slugs: Record<Lang, string>;
  content: string;
  contentHtml: string;
}
