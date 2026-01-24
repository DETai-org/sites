import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BodyText from "@/components/ui/BodyText";
import Section from "@/components/ui/Section";
import { langToHtmlLang } from "@/lib/blog/lang";
import { getReadingTime } from "@/lib/blog/blog.utils";
import type { BlogPost, Lang } from "@/lib/blog/types";

import { blogPostCopyByLang } from "./blogPostCopy";
import PostHeader from "./PostHeader";
import PostSidebarArt from "./PostSidebarArt";
import PostToc from "./PostToc";

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
  const copy = blogPostCopyByLang[lang];
  const contentLang = langToHtmlLang(post.lang ?? lang);
  const bodyTextClassName =
    "space-y-4 text-mobile-body leading-[1.75rem] hyphens-auto text-fg md:text-lg md:leading-relaxed [&_a]:text-accentVar [&_a]:underline [&_a]:decoration-accentVar/40 [&_a]:underline-offset-4 [&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28";
  const { html: enhancedContentHtml, items: tocItems } = buildTocFromHtml(contentHtml);
  const readingTime = getReadingTime(post.content || post.contentHtml);
  const showToc = readingTime >= 3 && tocItems.length > 0;
  const showSidebarArt = readingTime <= 2;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <PostHeader
          post={post}
          lang={lang}
          showRubric={showRubric}
          showCategory={showCategory}
        />
        <Section
          variant="light"
          fullWidth
          containerClassName="px-0 md:px-10 md:max-w-6xl xl:max-w-7xl"
        >
          <div className="flex flex-col gap-10 xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:items-start xl:gap-12">
            <article
              id="post-body"
              className="flex flex-col gap-6 px-0 md:gap-8 md:px-0"
              lang={contentLang}
            >
              <div className="mx-auto w-full max-w-3xl">
                <div className="w-full p-mobile-4 md:p-10 paper--object rounded-3xl border border-[color:rgb(var(--soft-border)/0.08)] shadow-sm">
                  {contentHtml ? (
                    <div
                      className={bodyTextClassName}
                      dangerouslySetInnerHTML={{ __html: enhancedContentHtml }}
                    />
                  ) : (
                    <BodyText
                      variant="sectionDefaultOnLight"
                      className="leading-[1.75rem] hyphens-auto md:leading-relaxed"
                    >
                      {fallbackText || copy.emptyContent}
                    </BodyText>
                  )}
                </div>
              </div>
            </article>
            <aside className="hidden xl:block">
              <div className="sticky top-28 flex flex-col gap-6">
                {showToc ? <PostToc items={tocItems} title={copy.tocTitle} /> : null}
                {!showToc && showSidebarArt ? <PostSidebarArt /> : null}
              </div>
            </aside>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

function buildTocFromHtml(html: string) {
  if (!html) return { html, items: [] as TocItem[] };

  const items: TocItem[] = [];
  const usedIds = new Map<string, number>();
  const headingRegex = /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi;

  const updatedHtml = html.replace(headingRegex, (match, tag, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!text) return match;

    const normalizedAttrs = attrs ?? "";
    const existingIdMatch = normalizedAttrs.match(/\sid\s*=\s*["']([^"']+)["']/i);
    const baseId = existingIdMatch?.[1] || slugifyHeading(text) || `section-${items.length + 1}`;
    const id = ensureUniqueId(baseId, usedIds);
    const nextAttrs = existingIdMatch
      ? normalizedAttrs.replace(existingIdMatch[0], ` id="${id}"`)
      : `${normalizedAttrs}${normalizedAttrs.length ? "" : " "}id=\"${id}\"`;

    items.push({ id, text, level: tag.toLowerCase() === "h2" ? 2 : 3 });

    return `<${tag}${nextAttrs}>${inner}</${tag}>`;
  });

  return { html: updatedHtml, items };
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function ensureUniqueId(baseId: string, usedIds: Map<string, number>) {
  const count = (usedIds.get(baseId) ?? 0) + 1;
  usedIds.set(baseId, count);
  return count === 1 ? baseId : `${baseId}-${count}`;
}
