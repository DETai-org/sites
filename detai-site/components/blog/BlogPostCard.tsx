import Button from "@/components/ui/Button";
import BodyText from "@/components/ui/BodyText";
import DefaultCard from "@/components/ui/DefaultCard";
import { formatBlogDate } from "@/lib/blog/blog.utils";
import { getRubricRouteSlug } from "@/lib/blog/taxonomy";
import type { BlogPostSummary } from "@/lib/blog/types";
import Link from "next/link";

interface BlogPostCardProps {
  post: BlogPostSummary;
  locale: string;
  readMoreLabel: string;
}

export default function BlogPostCard({ post, locale, readMoreLabel }: BlogPostCardProps) {
  const title =
    post.frontmatter?.descriptive?.title?.trim() || post.titles[post.lang]?.trim() || post.slug;
  const excerpt =
    post.excerpt?.trim() || post.frontmatter?.descriptive?.preview?.trim() || "";
  const formattedDate = formatBlogDate(post.publishedAt, locale);
  const metaParts = [formattedDate, post.author].filter(Boolean);
  const rubricRoute = post.rubric?.slug
    ? getRubricRouteSlug(post.rubric.slug, post.lang)
    : null;

  return (
    <DefaultCard title={title} className="flex h-full flex-col">
      <div className="flex h-full flex-col gap-4">
        {metaParts.length ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {metaParts.join(" · ")}
          </p>
        ) : null}
        {post.rubric?.label || post.category?.label ? (
          <div className="flex flex-wrap gap-2">
            {post.rubric?.label && rubricRoute ? (
              <Link
                href={`/${post.lang}/blog/${rubricRoute}`}
                className="inline-flex items-center rounded-full border border-accentVar/30 px-3 py-1 text-[0.6rem] font-semibold tracking-normal text-accentVar transition-colors hover:border-accentVar/70 hover:text-accentVar"
              >
                {post.rubric.label}
              </Link>
            ) : null}
            {post.category?.label ? (
              <span className="inline-flex items-center rounded-full border border-accentVar/30 px-3 py-1 text-[0.6rem] font-semibold tracking-normal text-accentVar">
                {post.category.label}
              </span>
            ) : null}
          </div>
        ) : null}
        {post.coverImage ? (
          <img
            className="h-40 w-full rounded-lg object-cover"
            src={post.coverImage.src}
            width={post.coverImage.width}
            height={post.coverImage.height}
            alt={post.coverImage.alt}
          />
        ) : null}
        {excerpt ? <BodyText variant="projectCard">{excerpt}</BodyText> : null}
        <div className="mt-auto">
          <Button as="a" href={`/${post.lang}/blog/${post.slug}`} variant="secondary">
            {readMoreLabel}
          </Button>
        </div>
      </div>
    </DefaultCard>
  );
}
