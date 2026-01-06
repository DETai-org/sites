import { readFile } from "fs/promises";
import path from "path";

const WORDPRESS_XML = path.resolve(
  process.cwd(),
  "wordpress-data",
  "WordPress.2026-01-06.xml",
);

const slugFromArgs = process.argv[2];

const xml = await readFile(WORDPRESS_XML, "utf-8");
const items = xml.split("<item>").slice(1).map((item) => `<item>${item}`);

const posts = items
  .filter((item) => item.includes("<wp:post_type><![CDATA[post]]></wp:post_type>"))
  .map((item) => ({
    title: extractCdata(item, "title"),
    slug: extractCdata(item, "wp:post_name"),
    link: extractCdata(item, "link"),
    date: extractCdata(item, "wp:post_date"),
    author: extractCdata(item, "dc:creator"),
    status: extractCdata(item, "wp:status"),
  }))
  .filter((post) => post.slug);

const filtered = slugFromArgs
  ? posts.filter((post) => post.slug === slugFromArgs)
  : posts;

console.log("Найденные посты:");
for (const post of filtered) {
  console.log(`- ${post.slug}: ${post.title}`);
}

function extractCdata(item: string, tag: string): string | null {
  const match = item.match(new RegExp(`<${tag}><!\\[CDATA\\[(.*?)\\]\\]></${tag}>`, "s"));

  return match?.[1]?.trim() ?? null;
}
