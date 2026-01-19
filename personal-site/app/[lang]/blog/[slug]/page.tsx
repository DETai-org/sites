import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPostByLangAndSlug, getPostsIndexForLang } from "../../../../lib/blog/blog.data";
import { blogLocaleByLang, isLang, supportedLangs } from "../../../../lib/blog/blog.i18n";
import { getMetadataBase } from "../../../../lib/blog/blog.metadata";
import { formatBlogDate } from "../../../../lib/blog/blog.utils";
import {
  blogRubrics,
  getRubricByRouteSlug,
  getRubricDefinition,
} from "../../../../lib/blog/taxonomy";
import type { Lang } from "../../../../lib/blog/types";
import BlogPostCard from "../../../../components/sections/BlogPostCard";

interface BlogPostPageProps {
  params: {
    lang: string;
    slug: string;
  };
}

export const runtime = "nodejs";

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  if (!isLang(params.lang)) {
    return {};
  }

  const lang = params.lang;
  const rubric = resolveRubricFromSlug(params.slug, lang);

  if (rubric) {
    const titleSuffix: Record<string, string> = {
      ru: "— все статьи по теме",
      en: "— all articles on the topic",
      de: "— alle Artikel zum Thema",
      fi: "— kaikki aiheen artikkelit",
      cn: "— 主题相关文章",
    };
    const descriptionSuffix: Record<string, string> = {
      ru: "Материалы рубрики связаны с другими темами экосистемы DETai.",
      en: "The rubric connects with other themes in the DETai ecosystem.",
      de: "Die Rubrik ist mit anderen Themen des DETai-Ökosystems verbunden.",
      fi: "Rubriikki liittyy DETai-ekosysteemin muihin teemoihin.",
      cn: "该栏目与 DETai 生态系统的其他主题相连接。",
    };
    const canonicalPath = `/${lang}/blog/${rubric.routeSlugs[lang]}`;
    const languages = supportedLangs.reduce<Record<string, string>>((acc, lang) => {
      acc[lang] = `/${lang}/blog/${rubric.routeSlugs[lang]}`;
      return acc;
    }, {});

    return {
      title: `${rubric.labels[lang]} ${titleSuffix[lang]}`,
      description: `${rubric.description[lang]} ${descriptionSuffix[lang]}`,
      keywords: rubric.seoKeywords[lang],
      metadataBase: getMetadataBase(),
      alternates: {
        canonical: canonicalPath,
        languages,
      },
    };
  }

  const post = await getPostByLangAndSlug(lang, params.slug);

  if (!post) {
    return {};
  }

  const { getAvailableLangsForPost, getPostBaseById } = await import(
    "../../../../lib/blog/blog.data"
  );
  const basePost = await getPostBaseById(post.id);

  if (!basePost) {
    return {};
  }

  const availableLangs = getAvailableLangsForPost(basePost);
  const canonicalSlug = post.slugs[params.lang];
  const languages = availableLangs.reduce<Record<string, string>>((acc, lang) => {
    const slug = post.slugs[lang];
    if (slug) {
      acc[lang] = `/${lang}/blog/${slug}`;
    }
    return acc;
  }, {});

  return {
    title: post.titles[params.lang],
    description: post.excerpt,
    metadataBase: getMetadataBase(),
    alternates: {
      canonical: canonicalSlug ? `/${params.lang}/blog/${canonicalSlug}` : undefined,
      languages,
    },
  };
}

export async function generateStaticParams() {
  const { getPostRoutes } = await import("../../../../lib/blog/blog.data");

  const postRoutes = await getPostRoutes();
  const rubricRoutes = supportedLangs.flatMap((lang) =>
    blogRubrics.map((rubric) => ({
      lang,
      slug: rubric.routeSlugs[lang],
    }))
  );

  return [...postRoutes, ...rubricRoutes];
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  if (!isLang(params.lang)) {
    notFound();
  }

  const lang = params.lang;
  const rubric = resolveRubricFromSlug(params.slug, lang);

  if (rubric) {
    const posts = await getPostsIndexForLang(lang);
    const rubricPosts = posts.filter((post) => post.rubric?.slug === rubric.slug);
    const locale = blogLocaleByLang[lang];
    const copyByLang: Record<
      Lang,
      { label: string; heading: string; empty: string; readMore: string }
    > = {
      ru: {
        label: "Рубрика",
        heading: "Статьи рубрики",
        empty: "Постов в этой рубрике пока нет.",
        readMore: "Читать полностью →",
      },
      en: {
        label: "Rubric",
        heading: "Rubric articles",
        empty: "There are no posts in this rubric yet.",
        readMore: "Read more →",
      },
      de: {
        label: "Rubrik",
        heading: "Artikel der Rubrik",
        empty: "In dieser Rubrik gibt es noch keine Beiträge.",
        readMore: "Weiterlesen →",
      },
      fi: {
        label: "Rubriikki",
        heading: "Rubriikin artikkelit",
        empty: "Tässä rubriikissa ei ole vielä postauksia.",
        readMore: "Lue lisää →",
      },
      cn: {
        label: "栏目",
        heading: "栏目文章",
        empty: "该栏目暂无文章。",
        readMore: "阅读全文 →",
      },
    };
    const copy = copyByLang[lang];

    return (
      <main className="page">
        <section className="rubric-hero">
          <p className="rubric-hero__eyebrow">{copy.label}</p>
          <h1 className="rubric-hero__title">{rubric.labels[lang]}</h1>
          <p className="rubric-hero__description">{rubric.description[lang]}</p>
          <p className="rubric-hero__postulate">{rubric.definition.postulate[lang]}</p>
        </section>
        <section className="rubric-posts">
          <h2 className="rubric-posts__title">{copy.heading}</h2>
          {rubricPosts.length === 0 ? (
            <p className="rubric-posts__empty">{copy.empty}</p>
          ) : (
            <div className="blog-grid">
              {rubricPosts.map((post) => {
                const formattedDate = formatBlogDate(post.publishedAt, locale);
                const metaParts = [formattedDate, post.author].filter(Boolean);
                return (
                  <BlogPostCard
                    key={`${post.id}-${post.lang}`}
                    post={post}
                    readMoreLabel={copy.readMore}
                    meta={metaParts.join(" · ")}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>
    );
  }

  const post = await getPostByLangAndSlug(lang, params.slug);

  if (!post) {
    notFound();
  }

  const contentHtml = post.contentHtml.trim();
  const fallbackText = post.content.trim();
  const locale = blogLocaleByLang[post.lang];
  const formattedDate = formatBlogDate(post.publishedAt, locale);
  const metaParts = [formattedDate, post.author].filter(Boolean);

  return (
    <main className="page">
      <article className="blog-post">
        <header className="blog-post__header">
          {metaParts.length ? (
            <p className="blog-post__meta">{metaParts.join(" · ")}</p>
          ) : null}
          <h1 className="blog-post__title">{post.titles[lang]}</h1>
          {post.coverImage ? (
            <img
              className="blog-post__image"
              src={post.coverImage.src}
              width={post.coverImage.width}
              height={post.coverImage.height}
              alt={post.coverImage.alt}
            />
          ) : null}
        </header>
        <div className="blog-post__content">
          {contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          ) : (
            <p>{fallbackText || "Контент скоро появится."}</p>
          )}
        </div>
      </article>
    </main>
  );
}

function resolveRubricFromSlug(slug: string, lang: Lang) {
  return getRubricByRouteSlug(slug, lang) ?? getRubricDefinition(slug);
}
