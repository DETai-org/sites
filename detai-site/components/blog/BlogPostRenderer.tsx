import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BodyText from "@/components/ui/BodyText";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { blogLocaleByLang } from "@/lib/blog/blog.i18n";
import { formatBlogDate } from "@/lib/blog/blog.utils";
import { getRubricRouteSlug } from "@/lib/blog/taxonomy";
import type { BlogPost, Lang } from "@/lib/blog/types";

import { blogPostCopyByLang } from "./blogPostCopy";

interface BlogPostRendererProps {
  post: BlogPost;
  lang: Lang;
  showRubric?: boolean;
  showCategory?: boolean;
}

export default function BlogPostRenderer({
  post,
  lang,
  showRubric = true,
  showCategory = true,
}: BlogPostRendererProps) {
  const contentHtml = post.contentHtml.trim();
  const fallbackText = post.content.trim();
  const locale = blogLocaleByLang[post.lang];
  const formattedDate = formatBlogDate(post.publishedAt, locale);
  const copy = blogPostCopyByLang[lang];
  const rubricRoute = post.rubric?.slug ? getRubricRouteSlug(post.rubric.slug, lang) : null;
  const previewText =
    post.frontmatter?.descriptive?.preview?.trim() || post.excerpt?.trim() || "";
  const readingTime = getReadingTime(post.content || post.contentHtml);
  const readingTimeLabel = `${readingTime} ${copy.minReadLabel}`;
  const authorName = post.author?.trim();
  const authorInitials = getInitials(authorName);
  const category = post.category?.label?.trim() ? post.category : null;
  const categoryHref = category ? `/${lang}/blog?category=${category.slug}` : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Section variant="light" className="border-b border-accentVar/20">
          <div className="grid gap-8 lg:grid-cols-[7fr_5fr]">
            <div className="flex flex-col gap-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {formattedDate} · {readingTimeLabel}
              </p>
              <Heading level={1}>{post.titles[lang]}</Heading>
              {previewText ? (
                <BodyText variant="sectionDefaultOnLight" className="max-w-2xl">
                  {previewText}
                </BodyText>
              ) : null}
              {authorName ? (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accentVar/10 text-sm font-semibold text-accentVar">
                    {authorInitials}
                  </div>
                  <p className="text-sm font-semibold text-fg">{authorName}</p>
                </div>
              ) : null}
              {(showRubric || showCategory) && (rubricRoute || category) ? (
                <div className="flex flex-wrap items-center gap-2">
                  {showRubric && post.rubric?.label && rubricRoute ? (
                    <Link
                      href={`/${lang}/blog/${rubricRoute}`}
                      className="inline-flex items-center rounded-full border border-accentVar/30 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accentVar transition-colors hover:border-accentVar/70 hover:text-accentVar"
                    >
                      {copy.rubricLabel}: {post.rubric.label}
                    </Link>
                  ) : null}
                  {showCategory && category && categoryHref ? (
                    <Link
                      href={categoryHref}
                      className="inline-flex items-center rounded-full border border-accentVar/30 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accentVar transition-colors hover:border-accentVar/70 hover:text-accentVar"
                    >
                      {copy.categoryLabel}: {category.label}
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </div>
            <div className="rounded-3xl border border-accentVar/10 bg-white/60 p-3 shadow-sm">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-accentVar/10 lg:aspect-square">
                {post.coverImage ? (
                  <img
                    className="h-full w-full object-cover object-center"
                    src={post.coverImage.src}
                    width={post.coverImage.width}
                    height={post.coverImage.height}
                    alt={post.coverImage.alt}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </Section>
        <Section variant="light">
          <article className="flex flex-col gap-6 md:gap-8">
            {contentHtml ? (
              <div
                className="space-y-4 text-mobile-body text-fg md:text-lg md:leading-relaxed [&_a]:text-accentVar [&_a]:underline [&_a]:decoration-accentVar/40 [&_a]:underline-offset-4"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            ) : (
              <BodyText variant="sectionDefaultOnLight">
                {fallbackText || copy.emptyContent}
              </BodyText>
            )}
          </article>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

function getReadingTime(content: string) {
  const plainText = stripMarkdown(content);
  const words = plainText.match(/\p{L}[\p{L}\p{N}'’-]*/gu) ?? [];
  return Math.max(1, Math.ceil(words.length / 200));
}

function stripMarkdown(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getInitials(authorName?: string) {
  if (!authorName) return "DE";

  const parts = authorName.split(" ").filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("") || "DE";
}
