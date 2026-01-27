"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { KeyboardEvent } from "react";

import BodyText from "@/components/ui/BodyText";
import Chip from "@/components/ui/Chip";
import { formatBlogDate } from "@/lib/blog/blog.utils";
import { getRubricRouteSlug } from "@/lib/blog/taxonomy";
import type { BlogPostSummary } from "@/lib/blog/types";

interface BlogPostCardProps {
  post: BlogPostSummary;
  locale: string;
  readMoreLabel: string;
}

export default function BlogPostCard({ post, locale, readMoreLabel }: BlogPostCardProps) {
  const title =
    post.frontmatter?.descriptive?.title?.trim() || post.titles[post.lang]?.trim() || post.slug;
  const seoLead = post.frontmatter?.descriptive?.seoLead?.trim();
  const excerpt =
    seoLead || post.excerpt?.trim() || post.frontmatter?.descriptive?.preview?.trim() || "";
  const formattedDate = formatBlogDate(post.publishedAt, locale);
  const metaParts = [formattedDate, post.author].filter(Boolean);
  const rubricRoute = post.rubric?.slug
    ? getRubricRouteSlug(post.rubric.slug, post.lang)
    : null;
  const router = useRouter();
  const postHref = `/${post.lang}/blog/${post.slug}`;
  const coverLayout = post.coverLayout ?? "square";
  const imageLayoutKey =
    coverLayout === "none" ? "square" : (coverLayout as "square" | "landscape" | "portrait");

  const imageClassNameByLayout: Record<"square" | "landscape" | "portrait", string> = {
    square: "object-cover object-center",
    landscape: "object-cover object-center md:object-[center_35%]",
    portrait: "object-cover object-top",
  };

  const handleCardClick = () => {
    router.push(postHref);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      router.push(postHref);
    }
  };

  return (
    <article
      className="flex flex-col overflow-hidden h-full w-full text-fg rounded-xl border border-accentVar/30 bg-surface shadow-sm cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:border-accentVar/60 hover:shadow-lg sm:max-w-[360px] sm:mx-auto"
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`${readMoreLabel} — ${title}`}
    >
      {post.coverImage ? (
        <img
          className={`h-64 w-full ${imageClassNameByLayout[imageLayoutKey]}`}
          src={post.coverImage.src}
          width={post.coverImage.width}
          height={post.coverImage.height}
          alt={post.coverImage.alt}
        />
      ) : null}
      <div className="flex flex-col h-full gap-3 px-mobile-4 pb-mobile-4 pt-mobile-3 md:px-6 md:pb-6 md:pt-4">
        <h3 className="text-lg font-semibold text-fg md:text-xl">
          {title}
        </h3>
        {excerpt ? (
          <BodyText variant="projectCard" className="text-muted">
            {excerpt}
          </BodyText>
        ) : null}
        <div className="flex flex-col mt-auto gap-3">
          {metaParts.length ? (
            <p className="text-xs font-medium text-muted">
              {metaParts.join(" · ")}
            </p>
          ) : null}
          {post.rubric?.label || post.category?.label ? (
            <div
              className="flex flex-wrap gap-2"
              onClick={(event) => event.stopPropagation()}
            >
              {post.rubric?.label && rubricRoute ? (
                <Chip as={Link} href={`/${post.lang}/blog/${rubricRoute}`} variant="default">
                  {post.rubric.label}
                </Chip>
              ) : null}
              {post.category?.label ? (
                <Chip variant="default" interactive={false}>
                  {post.category.label}
                </Chip>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
