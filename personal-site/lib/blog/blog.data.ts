import path from "node:path";

import { baseBlogPosts } from "./blog.base";
import { BlogPost, BlogPostBase } from "./types";
import { buildBlogPostDescription } from "./blog.description";

type ReadFile = typeof import("fs/promises").readFile;

export const blogPosts: BlogPost[] = await buildBlogPosts();

const markdownRoot = path.resolve(process.cwd(), "lib", "blog", "posts");

async function buildBlogPosts(): Promise<BlogPost[]> {
  if (typeof window !== "undefined") {
    return baseBlogPosts.map((post) => buildClientPost(post));
  }

  const { readFile } = await import("fs/promises");

  if (process.env.NODE_ENV === "production") {
    console.info(`[blog] Каталог Markdown: ${markdownRoot}`);
  }

  return Promise.all(baseBlogPosts.map((post) => buildServerPost(post, readFile)));
}

async function buildServerPost(post: BlogPostBase, readFile: ReadFile): Promise<BlogPost> {
  const absolutePath = path.resolve(markdownRoot, path.basename(post.contentFile));
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
