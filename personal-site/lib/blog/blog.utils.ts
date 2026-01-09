import { getPostByLangAndSlug, getPostsIndexForLang } from "./blog.data";
import { BlogPost, BlogPostSummary, Lang } from "./types";
import { buildBlogPostDescription } from "./blog.description";

export async function getBlogPostByLangAndSlug(
  lang: Lang,
  slug: string
): Promise<BlogPost | undefined> {
  return getPostByLangAndSlug(lang, slug);
}

export async function getBlogPostsIndexForLang(lang: Lang): Promise<BlogPostSummary[]> {
  return getPostsIndexForLang(lang);
}

export { buildBlogPostDescription };
