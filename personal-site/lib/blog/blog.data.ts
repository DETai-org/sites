import path from "node:path";
import { fileURLToPath } from "node:url";

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
  const postsDirectory = fileURLToPath(new URL("./posts/", import.meta.url));
  const absolutePath = path.join(postsDirectory, path.basename(post.contentFile));
  let content = "";
  let contentHtml = "";

  try {
    console.info(`[blog] Чтение Markdown для "${post.slug}" из ${absolutePath}`);
    content = await readFile(absolutePath, "utf-8");
  } catch (error) {
    console.error(`Не удалось прочитать контент поста ${post.slug}:`, error);
  }

  if (content.trim()) {
    try {
      contentHtml = await renderMarkdownToHtml(content);
    } catch (error) {
      console.error(`Не удалось преобразовать Markdown поста ${post.slug} в HTML:`, error);
    }
  }

  const excerpt = post.excerpt?.trim() || buildBlogPostDescription({ content, excerpt: "" });

  return {
    ...post,
    content,
    contentHtml,
    excerpt,
  };
}

function buildClientPost(post: BlogPostBase): BlogPost {
  const excerpt = post.excerpt?.trim() || "";

  return {
    ...post,
    content: "",
    contentHtml: "",
    excerpt,
  };
}

async function renderMarkdownToHtml(markdown: string): Promise<string> {
  const [
    { remark },
    { default: remarkGfm },
    { default: remarkRehype },
    { default: rehypeSanitize },
    { default: rehypeStringify },
  ] = await Promise.all([
    import("remark"),
    import("remark-gfm"),
    import("remark-rehype"),
    import("rehype-sanitize"),
    import("rehype-stringify"),
  ]);

  const file = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
