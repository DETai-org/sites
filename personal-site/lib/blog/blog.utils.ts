import { getBlogPosts } from "./blog.data";
import { BlogPost } from "./types";
import { buildBlogPostDescription } from "./blog.description";

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return getBlogPosts();
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getBlogPostsByCategory(slug: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.categories.some((category) => category.slug === slug));
}

export { buildBlogPostDescription };
