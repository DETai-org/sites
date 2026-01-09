import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getAvailableLangsForPost, getPostByLangAndSlug } from "../../../../lib/blog/blog.data";
import { isLang } from "../../../../lib/blog/blog.i18n";
import { getMetadataBase } from "../../../../lib/blog/blog.metadata";

interface BlogPostPageProps {
  params: {
    lang: string;
    slug: string;
  };
}

export const runtime = "nodejs";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export async function generateMetadata({ params }: BlogPostPageProps) {
  if (!isLang(params.lang)) {
    notFound();
  }

  const post = await getPostByLangAndSlug(params.lang, params.slug);

  if (!post) {
    notFound();
  }

  const languages = getAvailableLangsForPost(post.id).reduce<Record<string, string>>(
    (acc, lang) => {
      acc[lang] = `/${lang}/blog/${post.slugs[lang]}`;
      return acc;
    },
    {}
  );

  return {
    title: post.titles[params.lang],
    description: post.excerpt,
    metadataBase: new URL(siteUrl),
    alternates: {
      languages,
    },
  };
}

export async function generateStaticParams() {
  const { baseBlogPosts } = await import("../../../../lib/blog/blog.base");
  const { getAvailableLangsForPost } = await import("../../../../lib/blog/blog.data");

  return baseBlogPosts.flatMap((post) =>
    getAvailableLangsForPost(post.id).map((lang) => ({
      lang,
      slug: post.slugs[lang],
    }))
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  if (!isLang(params.lang)) {
    return {};
  }

  const post = await getPostByLangAndSlug(params.lang, params.slug);

  if (!post) {
    return {};
  }

  const { getAvailableLangsForPost } = await import("../../../../lib/blog/blog.data");
  const availableLangs = getAvailableLangsForPost(post.id);
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  if (!isLang(params.lang)) {
    notFound();
  }

  const lang = params.lang;
  const post = await getPostByLangAndSlug(lang, params.slug);

  if (!post) {
    notFound();
  }

  const contentHtml = post.contentHtml.trim();
  const fallbackText = post.content.trim();

  return (
    <main className="page">
      <article className="blog-post">
        <header className="blog-post__header">
          <p className="blog-post__meta">
            {new Date(post.publishedAt).toLocaleDateString("ru-RU")} · {post.author}
          </p>
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
