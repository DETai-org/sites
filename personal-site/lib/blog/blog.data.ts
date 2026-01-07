import { baseBlogPosts } from "./blog.base";
import { BlogPost, BlogPostBase } from "./types";
import { buildBlogPostDescription } from "./blog.description";

type ReadFile = typeof import("fs/promises").readFile;

export const blogPosts: BlogPost[] = await buildBlogPosts();

async function buildBlogPosts(): Promise<BlogPost[]> {
  if (typeof window !== "undefined") {
    return baseBlogPosts.map((post) => buildClientPost(post));
  }

  const { readFile } = await import("fs/promises");

  return Promise.all(baseBlogPosts.map((post) => buildServerPost(post, readFile)));
}

async function buildServerPost(post: BlogPostBase, readFile: ReadFile): Promise<BlogPost> {
  const absolutePath = `${process.cwd()}/${post.contentFile}`;
  let content = "";

  try {
    content = await readFile(absolutePath, "utf-8");
  } catch (error) {
    console.error(`Не удалось прочитать контент поста ${post.slug}:`, error);
  }

  const excerpt = post.excerpt?.trim() || buildBlogPostDescription({ content, excerpt: "" });

  return {
    ...post,
    content,
    excerpt,
  };
}

function buildClientPost(post: BlogPostBase): BlogPost {
  const excerpt = post.excerpt?.trim() || "";

  return {
    ...post,
    content: "",
    excerpt,
  };
}
