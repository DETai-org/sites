import { getBlogPosts } from "./blog.data";
import { BlogPost } from "./types";
import { buildBlogPostDescription } from "./blog.description";
import {
  getSanityBlogPostBySlug,
  getSanityBlogPosts,
  isSanityConfigured,
} from "./blog.sanity";

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (isSanityConfigured()) {
    const posts = await getSanityBlogPosts();
    if (posts.length) {
      return posts;
    }
  }

  return getBlogPosts();
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (isSanityConfigured()) {
    const post = await getSanityBlogPostBySlug(slug);
    if (post) {
      return post;
    }
  }

  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getBlogPostsByCategory(slug: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.categories.some((category) => category.slug === slug));
}

export { buildBlogPostDescription };
