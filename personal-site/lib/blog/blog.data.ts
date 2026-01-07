import { baseBlogPosts } from "./blog.base";
import { BlogPost } from "./types";
import { buildBlogPostDescription } from "./blog.description";

export const blogPosts: BlogPost[] = await buildBlogPosts();

async function buildBlogPosts(): Promise<BlogPost[]> {
  return baseBlogPosts.map((post) => {
    const content = post.content.trim();
    const excerpt = post.excerpt?.trim() || buildBlogPostDescription({ content, excerpt: "" });

    return {
      ...post,
      content,
      excerpt,
    };
  });
}
