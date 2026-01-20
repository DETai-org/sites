import path from "node:path";

import matter from "gray-matter";

import { baseBlogPosts } from "./blog.base";
import {
  BlogPost,
  BlogPostBase,
  BlogPostFrontmatter,
  BlogPostLocalizedFields,
  BlogPostResolved,
  BlogPostSummary,
  Lang,
} from "./types";
import { blogCategories, blogKeywords, blogRubrics, getTaxonomyLabel } from "./taxonomy";

type ReadFile = typeof import("fs/promises").readFile;

const markdownRoot = path.resolve(process.cwd());
const supportedLangs: Lang[] = ["ru", "en", "de", "fi", "cn"];
const defaultLang: Lang = "ru";
const ISO_FALLBACK_DATE = "1970-01-01T00:00:00.000Z";

export async function getAllPostIds(): Promise<string[]> {
  const { readFile } = await import("fs/promises");
  const ids = await Promise.all(
    baseBlogPosts.map(async (post) => {
      const frontmatters = await buildFrontmatterMap(post, readFile);
      return resolveLocalizedFields(frontmatters).fields.id;
    })
  );

  return ids;
}

export function getAvailableLangsForPost(post: BlogPostBase): Lang[] {
  return supportedLangs.filter((lang) => Boolean(post.contentFiles?.[lang]));
}

export async function getPostByLangAndSlug(
  lang: Lang,
  slug: string
): Promise<BlogPost | undefined> {
  if (typeof window !== "undefined") {
    return undefined;
  }

  const { readFile } = await import("fs/promises");
  const match = await findPostBySlug(baseBlogPosts, lang, slug, readFile);

  if (!match) {
    return undefined;
  }

  const { post, frontmatters } = match;
  const { content, contentHtml, excerpt, frontmatter } = await buildPostContent(
    post,
    lang,
    readFile
  );
  const resolvedPost = resolvePostMeta(post, frontmatters, lang);

  return {
    ...resolvedPost,
    lang,
    slug: resolvedPost.slugs[lang],
    excerpt,
    content,
    contentHtml,
    frontmatter,
  };
}

export async function getPostsIndexForLang(lang: Lang): Promise<BlogPostSummary[]> {
  if (typeof window !== "undefined") {
    return [];
  }

  const { readFile } = await import("fs/promises");
  const posts = baseBlogPosts.filter((entry) => entry.contentFiles?.[lang]);

  const summaries = await Promise.all(
    posts.map(async (post) => {
      const { excerpt, frontmatter } = await buildPostExcerpt(post, lang, readFile);
      const frontmatters = await buildFrontmatterMap(post, readFile);
      const resolvedPost = resolvePostMeta(post, frontmatters, lang);

      return {
        ...resolvedPost,
        lang,
        slug: resolvedPost.slugs[lang],
        excerpt,
        frontmatter,
      };
    })
  );

  return summaries.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPostRoutes(): Promise<Array<{ lang: Lang; slug: string }>> {
  const { readFile } = await import("fs/promises");
  const routes: Array<{ lang: Lang; slug: string }> = [];

  for (const post of baseBlogPosts) {
    for (const lang of supportedLangs) {
      const frontmatter = await readFrontmatter(post, lang, readFile);
      const slug =
        frontmatter?.descriptive?.routeSlug ?? frontmatter?.administrative?.id;
      if (slug) {
        routes.push({ lang, slug });
      }
    }
  }

  return routes;
}

export async function getPostBaseById(id: string): Promise<BlogPostBase | undefined> {
  const { readFile } = await import("fs/promises");

  for (const post of baseBlogPosts) {
    const frontmatters = await buildFrontmatterMap(post, readFile);
    const resolvedId = resolveLocalizedFields(frontmatters).fields.id;
    if (resolvedId === id) {
      return post;
    }
  }

  return undefined;
}

export async function getPostSlugById(id: string, lang: Lang): Promise<string | undefined> {
  const { readFile } = await import("fs/promises");

  for (const post of baseBlogPosts) {
    const frontmatters = await buildFrontmatterMap(post, readFile);
    const resolvedId = resolveLocalizedFields(frontmatters).fields.id;

    if (resolvedId === id) {
      return (
        frontmatters[lang]?.descriptive?.routeSlug ??
        frontmatters[defaultLang]?.descriptive?.routeSlug ??
        frontmatters[lang]?.administrative?.id ??
        frontmatters[defaultLang]?.administrative?.id
      );
    }
  }

  return undefined;
}

async function buildPostContent(
  post: BlogPostBase,
  lang: Lang,
  readFile: ReadFile
): Promise<{
  content: string;
  contentHtml: string;
  excerpt: string;
  frontmatter?: BlogPostFrontmatter;
}> {
  const { content, excerpt, frontmatter } = await buildPostExcerpt(post, lang, readFile);
  let contentHtml = "";

  if (content.trim()) {
    try {
      contentHtml = await renderMarkdownToHtml(content);
    } catch (error) {
      console.error(
        `Не удалось преобразовать Markdown поста (${lang}) в HTML:`,
        error
      );
    }
  }

  return {
    content,
    contentHtml,
    excerpt,
    frontmatter,
  };
}

async function buildPostExcerpt(
  post: BlogPostBase,
  lang: Lang,
  readFile: ReadFile
): Promise<{ content: string; excerpt: string; frontmatter?: BlogPostFrontmatter }> {
  const contentFile = post.contentFiles[lang];
  let content = "";
  let frontmatter: BlogPostFrontmatter | undefined;

  if (!contentFile) {
    return {
      content,
      excerpt: post.excerpt?.trim() || "",
      frontmatter,
    };
  }

  const absolutePath = path.resolve(markdownRoot, contentFile);

  try {
    console.info(`[blog] Чтение Markdown для (${lang}) из ${absolutePath}`);
    const rawMarkdown = await readFile(absolutePath, "utf-8");
    const parsed = matter(rawMarkdown);
    content = parsed.content;
    frontmatter = parsed.data as BlogPostFrontmatter;
  } catch (error) {
    console.error(`Не удалось прочитать контент поста (${lang}):`, error);
  }

  const excerpt =
    post.excerpt?.trim() ||
    frontmatter?.descriptive?.preview?.trim() ||
    buildBlogPostDescription({ content, excerpt: "" });

  return {
    content,
    excerpt,
    frontmatter,
  };
}

function resolvePostMeta(
  post: BlogPostBase,
  frontmatters: Partial<Record<Lang, BlogPostFrontmatter>>,
  lang: Lang
): BlogPostResolved {
  const { fields, langFallback } = resolveLocalizedFields(frontmatters);
  const canonicalFrontmatter = frontmatters[defaultLang] ?? frontmatters[langFallback];
  const localizedFrontmatter =
    frontmatters[lang] ?? frontmatters[langFallback] ?? canonicalFrontmatter;
  const resolvedStatus = canonicalFrontmatter?.administrative?.status || post.status;
  const basePublishedAt = normalizeIsoDate(post.publishedAt);
  const frontmatterPublishedAt = resolveIsoDateFromYmd(
    canonicalFrontmatter?.administrative?.date_ymd
  );
  const resolvedPublishedAt = frontmatterPublishedAt ?? basePublishedAt;
  const taxonomy = canonicalFrontmatter?.descriptive?.taxonomy;
  const rubricSlug = taxonomy?.rubric_ids?.[0] ?? post.rubric.slug;
  const categorySlug = taxonomy?.category_ids?.[0] ?? post.category.slug;
  const keywordSlugs = taxonomy?.keyword_ids ?? post.keywords.map((keyword) => keyword.slug);
  const keywordsRaw =
    localizedFrontmatter?.descriptive?.taxonomy?.keywords_raw?.length
      ? localizedFrontmatter.descriptive.taxonomy.keywords_raw
      : post.keywordsRaw;

  return {
    ...post,
    ...fields,
    status: resolvedStatus,
    publishedAt: resolvedPublishedAt,
    rubric: resolveTaxonomy(rubricSlug, blogRubrics, lang),
    category: resolveTaxonomy(categorySlug, blogCategories, lang),
    keywords: keywordSlugs.map((slug) => ({
      slug,
      label: getTaxonomyLabel(blogKeywords, slug, lang),
    })),
    keywordsRaw,
  };
}

function resolveTaxonomy(
  slug: string,
  definitions: Array<{ slug: string; labels: Record<Lang, string> }>,
  lang: Lang
): BlogPostResolved["rubric"] {
  return {
    slug,
    label: getTaxonomyLabel(definitions, slug, lang),
  };
}

function resolveLocalizedFields(
  frontmatters: Partial<Record<Lang, BlogPostFrontmatter>>
): { fields: BlogPostLocalizedFields; langFallback: Lang } {
  const fallbackLang = frontmatters[defaultLang]
    ? defaultLang
    : (supportedLangs.find((lang) => frontmatters[lang]) ?? defaultLang);

  const fallbackFrontmatter = frontmatters[fallbackLang];
  const fallbackId = fallbackFrontmatter?.administrative?.id ?? "unknown-post";

  const slugs = supportedLangs.reduce<Record<Lang, string>>((acc, lang) => {
    const slug =
      frontmatters[lang]?.descriptive?.routeSlug ??
      frontmatters[fallbackLang]?.descriptive?.routeSlug ??
      frontmatters[lang]?.administrative?.id ??
      frontmatters[fallbackLang]?.administrative?.id ??
      fallbackId;
    acc[lang] = slug;
    return acc;
  }, {} as Record<Lang, string>);

  const titles = supportedLangs.reduce<Record<Lang, string>>((acc, lang) => {
    const title =
      frontmatters[lang]?.descriptive?.title ??
      frontmatters[fallbackLang]?.descriptive?.title ??
      fallbackId;
    acc[lang] = title;
    return acc;
  }, {} as Record<Lang, string>);

  return {
    fields: {
      id: fallbackId,
      slugs,
      titles,
    },
    langFallback: fallbackLang,
  };
}

async function findPostBySlug(
  posts: BlogPostBase[],
  lang: Lang,
  slug: string,
  readFile: ReadFile
): Promise<{ post: BlogPostBase; frontmatters: Partial<Record<Lang, BlogPostFrontmatter>> } | undefined> {
  for (const post of posts) {
    const frontmatter = await readFrontmatter(post, lang, readFile);
    const routeSlug =
      frontmatter?.descriptive?.routeSlug ?? frontmatter?.administrative?.id;
    if (routeSlug === slug) {
      const frontmatters = await buildFrontmatterMap(post, readFile);
      return { post, frontmatters };
    }
  }

  return undefined;
}

async function buildFrontmatterMap(
  post: BlogPostBase,
  readFile: ReadFile
): Promise<Partial<Record<Lang, BlogPostFrontmatter>>> {
  const entries = await Promise.all(
    supportedLangs.map(async (lang) => {
      const frontmatter = await readFrontmatter(post, lang, readFile);
      return [lang, frontmatter] as const;
    })
  );

  return entries.reduce<Partial<Record<Lang, BlogPostFrontmatter>>>((acc, [lang, data]) => {
    if (data) {
      acc[lang] = data;
    }
    return acc;
  }, {});
}

async function readFrontmatter(
  post: BlogPostBase,
  lang: Lang,
  readFile: ReadFile
): Promise<BlogPostFrontmatter | undefined> {
  const contentFile = post.contentFiles[lang];

  if (!contentFile) {
    return undefined;
  }

  const absolutePath = path.resolve(markdownRoot, contentFile);

  try {
    const rawMarkdown = await readFile(absolutePath, "utf-8");
    const parsed = matter(rawMarkdown);
    return parsed.data as BlogPostFrontmatter;
  } catch (error) {
    console.error(`Не удалось прочитать frontmatter поста (${lang}):`, error);
    return undefined;
  }
}

function normalizeIsoDate(value: string | undefined): string {
  if (!value) {
    return ISO_FALLBACK_DATE;
  }

  const parsed = Date.parse(value);

  if (Number.isNaN(parsed)) {
    console.warn(`[blog] Некорректная дата публикации: ${value}`);
    return ISO_FALLBACK_DATE;
  }

  return new Date(parsed).toISOString();
}

function resolveIsoDateFromYmd(dateYmd?: string): string | undefined {
  if (!dateYmd) {
    return undefined;
  }

  const isoCandidate = `${dateYmd}T00:00:00+00:00`;
  const parsed = Date.parse(isoCandidate);

  if (Number.isNaN(parsed)) {
    console.warn(`[blog] Некорректный date_ymd в frontmatter: ${dateYmd}`);
    return undefined;
  }

  return new Date(parsed).toISOString();
}

function buildBlogPostDescription({ content, excerpt }: { content: string; excerpt: string }): string {
  if (excerpt.trim()) {
    return excerpt.trim();
  }

  return content
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
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
