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
  routeSlugs: Record<Lang, string>;
  description: Record<Lang, string>;
  definition: {
    postulate: Record<Lang, string>;
    conceptual_keys: Record<Lang, string[]>;
    practical_application: Record<Lang, string>;
  };
  seoKeywords: Record<Lang, string[]>;
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

export interface BlogPostFrontmatterAdministrative {
  id?: string;
  authors?: string[];
  date_ymd?: string;
  status?: BlogPostStatus;
  channels?: string[];
}

export interface BlogPostFrontmatterDescriptive {
  routeSlug?: string;
  title?: string;
  preview?: string;
  seoLead?: string;
  taxonomy?: BlogTaxonomyIds;
}

export interface BlogPostFrontmatterStructural {
  external_links?: string[];
  document_links?: string[];
}

export interface BlogPostFrontmatter {
  type?: "post";
  administrative: BlogPostFrontmatterAdministrative;
  descriptive: BlogPostFrontmatterDescriptive;
  structural: BlogPostFrontmatterStructural;
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

export type BlogCoverLayout = "square" | "landscape" | "portrait" | "none";

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
  coverLayout?: BlogCoverLayout;
  excerpt?: string;
  contentFiles: Record<Lang, string>;
  frontmatter?: BlogPostFrontmatter;
}

export interface BlogPostResolved
  extends Omit<BlogPostBase, "rubric" | "category" | "keywords">,
    BlogPostLocalizedFields,
    BlogTaxonomyLocalized {}

export interface BlogPostSummary
  extends Omit<BlogPostResolved, "slugs" | "contentFiles"> {
  lang: Lang;
  slug: string;
  excerpt: string;
}

export interface BlogPost extends BlogPostSummary {
  slugs: Record<Lang, string>;
  content: string;
  contentHtml: string;
}
