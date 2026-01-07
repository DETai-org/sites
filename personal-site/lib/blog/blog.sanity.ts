import { getSanityClient, isSanityConfigured } from "../sanity/sanity.client";
import type { BlogPost } from "./types";

interface SanityPost {
  title?: string;
  slug?: string;
  content?: string;
  publishedAt?: string;
}

const postsQuery = `*[_type == "post"] | order(_createdAt desc) {
  title,
  "slug": slug.current,
  content,
  "publishedAt": coalesce(publishedAt, _createdAt)
}`;

const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  content,
  "publishedAt": coalesce(publishedAt, _createdAt)
}`;

export async function getSanityBlogPosts(): Promise<BlogPost[]> {
  const client = getSanityClient();

  if (!client) {
    return [];
  }

  const posts = await client.fetch<SanityPost[]>(postsQuery);
  return posts.map((post) => mapSanityPost(post));
}

export async function getSanityBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const client = getSanityClient();

  if (!client) {
    return undefined;
  }

  const post = await client.fetch<SanityPost | null>(postBySlugQuery, { slug });
  return post ? mapSanityPost(post) : undefined;
}

export { isSanityConfigured };

function mapSanityPost(post: SanityPost): BlogPost {
  const content = post.content?.trim() ?? "";
  const contentHtml = content ? textToHtml(content) : "";

  return {
    slug: post.slug ?? "",
    title: post.title ?? "Без названия",
    publishedAt: post.publishedAt ?? new Date().toISOString(),
    author: "Sanity Studio",
    status: "publish",
    categories: [],
    tags: [],
    excerpt: buildExcerpt(content),
    content,
    contentHtml,
  };
}

function buildExcerpt(content: string): string {
  if (!content) {
    return "";
  }

  return content.replace(/\s+/g, " ").trim().slice(0, 180);
}

function textToHtml(content: string): string {
  const paragraphs = content.split(/\n{2,}/).map((paragraph) => paragraph.trim());

  return paragraphs
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
