import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPostsIndexForLang } from "../../../lib/blog/blog.data";
import { isLang, supportedLangs } from "../../../lib/blog/blog.i18n";
import { getMetadataBase } from "../../../lib/blog/blog.metadata";

interface BlogPageProps {
  params: {
    lang: string;
  };
}

const blogMetadata = {
  title: "Блог",
  description: "Посты блога",
};

export const runtime = "nodejs";

export function generateMetadata({ params }: BlogPageProps): Metadata {
  if (!isLang(params.lang)) {
    return {};
  }

  const canonicalPath = `/${params.lang}/blog`;
  const languages = supportedLangs.reduce<Record<string, string>>((acc, lang) => {
    acc[lang] = `/${lang}/blog`;
    return acc;
  }, {});

  return {
    title: blogMetadata.title,
    description: blogMetadata.description,
    metadataBase: getMetadataBase(),
    alternates: {
      canonical: canonicalPath,
      languages,
    },
  };
}

export function generateStaticParams() {
  return supportedLangs.map((lang) => ({ lang }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  if (!isLang(params.lang)) {
    notFound();
  }

  const posts = await getPostsIndexForLang(params.lang);

  return (
    <main className="page">
      <div className="page__heading">
        <h1>Блог</h1>
        <p>Первые материалы из WordPress.</p>
      </div>
      <section className="blog-grid">
        {posts.map((post) => (
          <article key={`${post.id}-${post.lang}`} className="blog-card">
            {post.coverImage ? (
              <img
                className="blog-card__image"
                src={post.coverImage.src}
                width={post.coverImage.width}
                height={post.coverImage.height}
                alt={post.coverImage.alt}
              />
            ) : null}
            <div className="blog-card__body">
              <p className="blog-card__meta">
                {new Date(post.publishedAt).toLocaleDateString("ru-RU")} · {post.author}
              </p>
              <h2 className="blog-card__title">
                <Link href={`/${post.lang}/blog/${post.slug}`}>
                  {post.titles[post.lang]}
                </Link>
              </h2>
              <p className="blog-card__excerpt">{post.excerpt}</p>
              <Link className="blog-card__link" href={`/${post.lang}/blog/${post.slug}`}>
                Читать полностью →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
