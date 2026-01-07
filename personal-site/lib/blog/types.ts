export type BlogPostStatus = "publish" | "draft" | "private";

export interface BlogTaxonomy {
  title: string;
  slug: string;
}

export interface BlogImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface BlogPostBase {
  slug: string;
  title: string;
  publishedAt: string;
  author: string;
  status: BlogPostStatus;
  categories: BlogTaxonomy[];
  tags: BlogTaxonomy[];
  coverImage?: BlogImage;
  originalLink?: string;
  wordpressId?: number;
  excerpt?: string;
  contentFile: string;
}

export interface BlogPost extends Omit<BlogPostBase, "contentFile"> {
  content: string;
  contentHtml: string;
  excerpt: string;
}
