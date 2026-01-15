import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPostsIndexForLang } from "../../../lib/blog/blog.data";
import { isLang, supportedLangs } from "../../../lib/blog/blog.i18n";
import { getMetadataBase } from "../../../lib/blog/blog.metadata";
import type { Lang } from "../../../lib/blog/types";

interface BlogPageProps {
  params: {
    lang: string;
  };
}

const blogMetadataByLang: Record<Lang, { title: string; description: string }> = {
  ru: { title: "Блог", description: "Посты блога" },
  en: { title: "Blog", description: "Blog posts" },
  de: { title: "Blog", description: "Blogbeiträge" },
  fi: { title: "Blogi", description: "Blogikirjoitukset" },
  cn: { title: "博客", description: "博客文章" }
};

const blogCopyByLang: Record<Lang, { heading: string; subheading: string; readMore: string }> = {
  ru: {
    heading: "Блог",
    subheading: "Первые материалы из WordPress.",
    readMore: "Читать полностью →"
  },
  en: {
    heading: "Blog",
    subheading: "First materials from WordPress.",
    readMore: "Read more →"
  },
  de: {
    heading: "Blog",
    subheading: "Erste Materialien aus WordPress.",
    readMore: "Weiterlesen →"
  },
  fi: {
    heading: "Blogi",
    subheading: "Ensimmäiset materiaalit WordPressistä.",
    readMore: "Lue lisää →"
  },
  cn: {
    heading: "博客",
    subheading: "来自 WordPress 的首批材料。",
    readMore: "阅读全文 →"
  }
};

const blogLocaleByLang: Record<Lang, string> = {
  ru: "ru-RU",
  en: "en-US",
  de: "de-DE",
  fi: "fi-FI",
  cn: "zh-CN"
};

export const runtime = "nodejs";

export function generateMetadata({ params }: BlogPageProps): Metadata {
  if (!isLang(params.lang)) {
    return {};
  }

  const metadata = blogMetadataByLang[params.lang];
  const canonicalPath = `/${params.lang}/blog`;
  const languages = supportedLangs.reduce<Record<string, string>>((acc, lang) => {
    acc[lang] = `/${lang}/blog`;
    return acc;
  }, {});

  return {
    title: metadata.title,
    description: metadata.description,
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
  const locale = blogLocaleByLang[params.lang];
  const copy = blogCopyByLang[params.lang];

  return (
    <main className="page">
      <div className="page__heading">
        <h1>{copy.heading}</h1>
        <p>{copy.subheading}</p>
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
                {new Date(post.publishedAt).toLocaleDateString(locale)} · {post.author}
              </p>
              <h2 className="blog-card__title">
                <Link href={`/${post.lang}/blog/${post.slug}`}>
                  {post.titles[post.lang]}
                </Link>
              </h2>
              <p className="blog-card__excerpt">{post.excerpt}</p>
              <Link className="blog-card__link" href={`/${post.lang}/blog/${post.slug}`}>
                {copy.readMore}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
