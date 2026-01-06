import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

interface ExtractedPost {
  title: string;
  slug: string;
  content: string;
}

const WORDPRESS_XML = path.resolve(
  process.cwd(),
  "wordpress-data",
  "WordPress.2026-01-06.xml",
);
const OUTPUT_DIR = path.resolve(process.cwd(), "lib", "blog", "posts");

const slugFromArgs = process.argv[2];

const xml = await readFile(WORDPRESS_XML, "utf-8");
const items = xml.split("<item>").slice(1).map((item) => `<item>${item}`);

const posts = items
  .filter((item) => item.includes("<wp:post_type><![CDATA[post]]></wp:post_type>"))
  .map(parsePost)
  .filter(Boolean);

const filtered = slugFromArgs
  ? posts.filter((post) => post?.slug === slugFromArgs)
  : posts;

await mkdir(OUTPUT_DIR, { recursive: true });

for (const post of filtered) {
  if (!post) continue;
  const markdown = buildMarkdown(post);
  const target = path.join(OUTPUT_DIR, `${post.slug}.md`);
  await writeFile(target, markdown, "utf-8");
}

function parsePost(item: string): ExtractedPost | null {
  const title = extractCdata(item, "title");
  const slug = extractCdata(item, "wp:post_name");
  const content = extractCdata(item, "content:encoded");

  if (!title || !slug || !content) {
    return null;
  }

  return {
    title,
    slug,
    content: normalizeContent(content),
  };
}

function extractCdata(item: string, tag: string): string | null {
  const match = item.match(new RegExp(`<${tag}><!\\[CDATA\\[(.*?)\\]\\]></${tag}>`, "s"));

  return match?.[1]?.trim() ?? null;
}

function normalizeContent(content: string): string {
  return content
    .replace(/<!--.*?-->/gs, "")
    .replace(/<p>\s*/g, "")
    .replace(/\s*<\/p>/g, "\n\n")
    .replace(/<br\s*\/?\s*>/g, "\n")
    .replace(/\s+/g, " ")
    .replace(/\n\s*\n\s*/g, "\n\n")
    .trim();
}

function buildMarkdown(post: ExtractedPost): string {
  return `# ${post.title}\n\n${post.content}\n`;
}
