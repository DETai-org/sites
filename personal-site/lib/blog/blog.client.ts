import { baseBlogPosts } from "./blog.base";
import { BlogPostBase } from "./types";

export function getAllBlogPostsClient(): BlogPostBase[] {
  return baseBlogPosts;
}

export function getBlogPostBySlugClient(slug: string): BlogPostBase | undefined {
  return baseBlogPosts.find((post) => post.slug === slug);
}
