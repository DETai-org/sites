import { baseBlogPosts } from "./blog.base";
import { BlogPostBase, Lang } from "./types";

export function getAllBlogPostsClient(): BlogPostBase[] {
  return baseBlogPosts;
}

export function getBlogPostBySlugClient(slug: string): BlogPostBase | undefined {
  return baseBlogPosts.find((post) => post.slugs.ru === slug);
}

export function getBlogPostByLangSlugClient(lang: Lang, slug: string): BlogPostBase | undefined {
  return baseBlogPosts.find((post) => post.slugs[lang] === slug);
}
