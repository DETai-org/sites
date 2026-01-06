import { blogPosts } from "./blog.data";
import { BlogPost } from "./types";
import { buildBlogPostDescription } from "./blog.description";

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(slug: string): BlogPost[] {
  return blogPosts.filter((post) => post.categories.some((category) => category.slug === slug));
}

export { buildBlogPostDescription };
