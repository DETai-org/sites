import path from "node:path";

import { baseBlogPosts } from "./blog.base";
import { BlogPost, BlogPostBase, BlogPostSummary, Lang } from "./types";
import { buildBlogPostDescription } from "./blog.description";
import { supportedLangs } from "./blog.i18n";

type ReadFile = typeof import("fs/promises").readFile;

const markdownRoot = path.resolve(process.cwd());

export function getAllPostIds(): string[] {
  return baseBlogPosts.map((post) => post.id);
}

export function getAvailableLangsForPost(id: string): Lang[] {
  const post = baseBlogPosts.find((entry) => entry.id === id);

  if (!post) {
    return [];
  }

  return supportedLangs.filter((lang) => Boolean(post.contentFiles?.[lang]));
}

export async function getPostByLangAndSlug(
  lang: Lang,
  slug: string
): Promise<BlogPost | undefined> {
  if (typeof window !== "undefined") {
    return undefined;
  }

  const post = baseBlogPosts.find((entry) => entry.slugs[lang] === slug);

  if (!post) {
    return undefined;
  }

  const { readFile } = await import("fs/promises");
  const { content, contentHtml, excerpt } = await buildPostContent(post, lang, readFile);

  return {
    ...post,
    lang,
    slug,
    excerpt,
    content,
    contentHtml,
  };
}

export async function getPostsIndexForLang(lang: Lang): Promise<BlogPostSummary[]> {
  if (typeof window !== "undefined") {
    return [];
  }

  const { readFile } = await import("fs/promises");
  const posts = baseBlogPosts.filter((entry) => entry.contentFiles?.[lang]);

  return Promise.all(
    posts.map(async (post) => {
      const { excerpt } = await buildPostExcerpt(post, lang, readFile);

      return {
        ...post,
        lang,
        slug: post.slugs[lang],
        excerpt,
      };
    })
  );
}

export function getPostBaseById(id: string): BlogPostBase | undefined {
  return baseBlogPosts.find((entry) => entry.id === id);
}

async function buildPostContent(
  post: BlogPostBase,
  lang: Lang,
  readFile: ReadFile
): Promise<{ content: string; contentHtml: string; excerpt: string }> {
  const { content, excerpt } = await buildPostExcerpt(post, lang, readFile);
  let contentHtml = "";

  if (content.trim()) {
    try {
      contentHtml = await renderMarkdownToHtml(content);
    } catch (error) {
      console.error(
        `Не удалось преобразовать Markdown поста ${post.id} (${lang}) в HTML:`,
        error
      );
    }
  }

  return {
    content,
    contentHtml,
    excerpt,
  };
}

async function buildPostExcerpt(
  post: BlogPostBase,
  lang: Lang,
  readFile: ReadFile
): Promise<{ content: string; excerpt: string }> {
  const contentFile = post.contentFiles[lang];
  let content = "";

  if (!contentFile) {
    return {
      content,
      excerpt: post.excerpt?.trim() || "",
    };
  }

  const absolutePath = path.resolve(markdownRoot, contentFile);

  try {
    console.info(`[blog] Чтение Markdown для "${post.id}" (${lang}) из ${absolutePath}`);
    content = await readFile(absolutePath, "utf-8");
  } catch (error) {
    console.error(`Не удалось прочитать контент поста ${post.id} (${lang}):`, error);
  }

  const excerpt = post.excerpt?.trim() || buildBlogPostDescription({ content, excerpt: "" });

  return {
    content,
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
