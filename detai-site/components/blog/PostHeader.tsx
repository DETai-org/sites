import Link from "next/link";

import BodyText from "@/components/ui/BodyText";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import blogAuthors from "@/lib/blog/authors.json";
import { blogLocaleByLang } from "@/lib/blog/blog.i18n";
import { formatBlogDate } from "@/lib/blog/blog.utils";
import { getRubricRouteSlug } from "@/lib/blog/taxonomy";
import type { BlogPost, BlogCoverLayout, Lang } from "@/lib/blog/types";

import { blogPostCopyByLang } from "./blogPostCopy";
import PostCoverPortrait from "./PostCoverPortrait";

interface PostHeaderProps {
  post: BlogPost;
  lang: Lang;
  showRubric?: boolean;
  showCategory?: boolean;
}

export default function PostHeader({
  post,
  lang,
  showRubric = true,
  showCategory = true,
}: PostHeaderProps) {
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
  const authorMeta = authorName
    ? blogAuthors.find((author) => author.name === authorName)
    : undefined;
  const authorRole = authorMeta?.role?.trim();
  const authorAvatar = authorMeta?.avatar?.trim();
  const category = post.category?.label?.trim() ? post.category : null;
  const categoryHref = category ? `/${lang}/blog?category=${category.slug}` : null;
  const coverLayout = resolveCoverLayout(post.coverLayout, post.coverImage);

  return (
    <Section
      variant="light"
      className="border-b border-accentVar/20"
      fullWidth
      containerClassName="px-0 md:px-10 md:max-w-6xl"
    >
      <div className="flex flex-col gap-4">
        {coverLayout === "landscape" && post.coverImage ? (
          <div className="w-full md:max-w-4xl">
            <div className="overflow-hidden rounded-3xl bg-accentVar/10 shadow-sm">
              <div className="aspect-[4/3] overflow-hidden md:aspect-[16/9]">
                <img
                  className="h-full w-full object-cover object-center"
                  src={post.coverImage.src}
                  width={post.coverImage.width}
                  height={post.coverImage.height}
                  alt={post.coverImage.alt}
                />
              </div>
            </div>
          </div>
        ) : null}
        <div
          className={
            coverLayout === "square" || coverLayout === "portrait"
              ? "grid gap-6 lg:grid-cols-[7fr_5fr]"
              : "flex flex-col gap-3"
          }
        >
          <div className="flex flex-col gap-3 px-2 md:px-0">
            <div className="flex flex-col gap-3">
              <p className="text-[0.65rem] font-medium text-muted md:text-xs">
                {formattedDate}
                {!authorName ? ` · ${readingTimeLabel}` : null}
              </p>
              <Heading level={2}>{post.titles[lang]}</Heading>
              {previewText ? (
                <BodyText
                  variant="sectionDefaultOnLight"
                  className="max-w-2xl text-mobile-small md:text-base md:leading-relaxed md:text-muted"
                >
                  {previewText}
                </BodyText>
              ) : null}
            </div>
            {(authorName || rubricRoute || category) ? (
              <div
                className={
                  coverLayout === "square" ? "flex flex-col gap-2 lg:mt-auto" : "flex flex-col gap-2"
                }
              >
                {authorName ? (
                  <div className="flex flex-wrap items-center gap-3">
                    {authorAvatar ? (
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={authorAvatar}
                        alt={authorName}
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accentVar/10 text-xs font-semibold text-accentVar">
                        {authorInitials}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-fg">{authorName}</p>
                      {authorRole ? (
                        <p className="text-xs text-muted">{authorRole}</p>
                      ) : null}
                    </div>
                    <span className="h-4 w-px bg-accentVar/30" aria-hidden />
                    <p className="flex items-center gap-2 text-xs font-medium text-muted md:text-sm">
                      <span aria-hidden>🕒</span>
                      {readingTimeLabel}
                    </p>
                  </div>
                ) : null}
                {(showRubric || showCategory) && (rubricRoute || category) ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {showRubric && post.rubric?.label && rubricRoute ? (
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-muted">{copy.rubricLabel}</span>
                        <Link
                          href={`/${lang}/blog/${rubricRoute}`}
                          className="inline-flex items-center justify-center px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] rounded-full border border-accentVar/30 text-accentVar transition-colors hover:border-accentVar/70 hover:text-accentVar"
                        >
                          {post.rubric.label}
                        </Link>
                      </div>
                    ) : null}
                    {showCategory && category && categoryHref ? (
                      <div className="flex flex-col gap-2 sm:items-end">
                        <span className="text-xs text-muted sm:text-right">
                          {copy.categoryLabel}
                        </span>
                        <Link
                          href={categoryHref}
                          className="inline-flex items-center justify-center px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] rounded-full border border-accentVar/30 text-accentVar transition-colors hover:border-accentVar/70 hover:text-accentVar"
                        >
                          {category.label}
                        </Link>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          {coverLayout === "square" && post.coverImage ? (
            <div className="overflow-hidden rounded-3xl bg-accentVar/10 shadow-sm">
              <div className="aspect-[4/3] overflow-hidden lg:aspect-square">
                <img
                  className="h-full w-full object-cover object-center"
                  src={post.coverImage.src}
                  width={post.coverImage.width}
                  height={post.coverImage.height}
                  alt={post.coverImage.alt}
                />
              </div>
            </div>
          ) : null}
          {coverLayout === "portrait" && post.coverImage ? (
            <PostCoverPortrait
              image={post.coverImage}
              expandLabel={copy.expandCoverLabel}
              collapseLabel={copy.collapseCoverLabel}
            />
          ) : null}
        </div>
      </div>
    </Section>
  );
}

function resolveCoverLayout(
  coverLayout: BlogCoverLayout | undefined,
  coverImage: BlogPost["coverImage"]
) {
  if (!coverImage) return "none";
  return coverLayout ?? "square";
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
