import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PublicationShare from "@/components/sections/publications/PublicationShare";
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
  showTags?: boolean;
  showShare?: boolean;
}

export default function BlogPostRenderer({
  post,
  lang,
  showRubric = false,
  showTags = false,
  showShare = false,
}: BlogPostRendererProps) {
  const contentHtml = post.contentHtml.trim();
  const fallbackText = post.content.trim();
  const locale = blogLocaleByLang[post.lang];
  const formattedDate = formatBlogDate(post.publishedAt, locale);
  const metaParts = [formattedDate, post.author].filter(Boolean);
  const copy = blogPostCopyByLang[lang];
  const rubricRoute = post.rubric?.slug ? getRubricRouteSlug(post.rubric.slug, lang) : null;
  const tags = post.keywords?.filter((keyword) => keyword.label?.trim()) ?? [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Section variant="light">
          <article className="flex flex-col gap-6 md:gap-8">
            <header className="flex flex-col gap-4">
              {metaParts.length ? (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  {metaParts.join(" · ")}
                </p>
              ) : null}
              <Heading level={1}>{post.titles[lang]}</Heading>
              {showRubric && post.rubric?.label && rubricRoute ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    {copy.rubricLabel}
                  </span>
                  <Link
                    href={`/${lang}/blog/${rubricRoute}`}
                    className="inline-flex items-center rounded-full border border-accentVar/30 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accentVar transition-colors hover:border-accentVar/70 hover:text-accentVar"
                  >
                    {post.rubric.label}
                  </Link>
                </div>
              ) : null}
              {showTags && tags.length ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    {copy.tagsLabel}
                  </span>
                  {tags.map((tag) => (
                    <span
                      key={`${tag.slug}-${tag.label}`}
                      className="inline-flex items-center rounded-full border border-accentVar/30 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accentVar"
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              ) : null}
              {post.coverImage ? (
                <img
                  className="h-72 w-full rounded-2xl object-cover"
                  src={post.coverImage.src}
                  width={post.coverImage.width}
                  height={post.coverImage.height}
                  alt={post.coverImage.alt}
                />
              ) : null}
            </header>
            <div className="flex flex-col gap-6">
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
              {showShare ? (
                <PublicationShare title={copy.shareLabel} compact />
              ) : null}
            </div>
          </article>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
