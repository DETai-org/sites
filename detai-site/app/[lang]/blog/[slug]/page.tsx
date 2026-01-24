import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostRenderer from "@/components/blog/BlogPostRenderer";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BodyText from "@/components/ui/BodyText";
import Heading from "@/components/ui/Heading";
import HeadingLevel2 from "@/components/ui/HeadingLevel2";
import Section from "@/components/ui/Section";
import { getPostByLangAndSlug, getPostsIndexForLang } from "@/lib/blog/blog.data";
import { blogLocaleByLang, isLang, supportedLangs } from "@/lib/blog/blog.i18n";
import {
  blogRubrics,
  getRubricByRouteSlug,
  getRubricDefinition,
} from "@/lib/blog/taxonomy";
import type { Lang } from "@/lib/blog/types";

import BlogPostCard from "../_components/BlogPostCard";

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
    const titleSuffix: Record<Lang, string> = {
      ru: "— все статьи по теме",
      en: "— all articles on the topic",
      de: "— alle Artikel zum Thema",
      fi: "— kaikki aiheen artikkelit",
      cn: "— 主题相关文章",
    };
    const descriptionSuffix: Record<Lang, string> = {
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
    "@/lib/blog/blog.data"
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
    alternates: {
      canonical: canonicalSlug ? `/${params.lang}/blog/${canonicalSlug}` : undefined,
      languages,
    },
  };
}

export async function generateStaticParams() {
  const { getPostRoutes } = await import("@/lib/blog/blog.data");

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
      {
        label: string;
        heading: string;
        empty: string;
        readMore: string;
        conceptualTitle: string;
        practicalTitle: string;
      }
    > = {
      ru: {
        label: "Рубрика",
        heading: "Статьи рубрики",
        empty: "Постов в этой рубрике пока нет.",
        readMore: "Читать полностью",
        conceptualTitle: "Ключевые идеи",
        practicalTitle: "Практическое применение",
      },
      en: {
        label: "Rubric",
        heading: "Rubric articles",
        empty: "There are no posts in this rubric yet.",
        readMore: "Read more",
        conceptualTitle: "Key ideas",
        practicalTitle: "Practical application",
      },
      de: {
        label: "Rubrik",
        heading: "Artikel der Rubrik",
        empty: "In dieser Rubrik gibt es noch keine Beiträge.",
        readMore: "Weiterlesen",
        conceptualTitle: "Schlüsselideen",
        practicalTitle: "Praktische Anwendung",
      },
      fi: {
        label: "Rubriikki",
        heading: "Rubriikin artikkelit",
        empty: "Tässä rubriikissa ei ole vielä postauksia.",
        readMore: "Lue lisää",
        conceptualTitle: "Keskeiset ideat",
        practicalTitle: "Käytännön soveltaminen",
      },
      cn: {
        label: "栏目",
        heading: "栏目文章",
        empty: "该栏目暂无文章。",
        readMore: "阅读全文",
        conceptualTitle: "关键要点",
        practicalTitle: "实践应用",
      },
    };
    const copy = copyByLang[lang];
    const conceptualKeys = rubric.definition.conceptual_keys?.[lang] ?? [];
    const practicalApplication = rubric.definition.practical_application?.[lang] ?? "";

    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col">
          <Section variant="light" className="border-b border-accentVar/20">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accentVar">
                {copy.label}
              </p>
              <Heading level={1}>{rubric.labels[lang]}</Heading>
              <BodyText variant="sectionDefaultOnLight" className="max-w-3xl">
                {rubric.description[lang]}
              </BodyText>
              <p className="text-sm text-muted md:text-base">
                {rubric.definition.postulate[lang]}
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <HeadingLevel2>{copy.conceptualTitle}</HeadingLevel2>
                  <ul className="flex flex-col gap-2 text-sm text-muted md:text-base">
                    {conceptualKeys.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-accentVar">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <HeadingLevel2>{copy.practicalTitle}</HeadingLevel2>
                  <p className="text-sm text-muted md:text-base">
                    {practicalApplication}
                  </p>
                </div>
              </div>
            </div>
          </Section>
          <Section variant="light">
            <div className="flex flex-col gap-6">
              <HeadingLevel2>{copy.heading}</HeadingLevel2>
              {rubricPosts.length === 0 ? (
                <BodyText variant="sectionDefaultOnLight" className="text-muted">
                  {copy.empty}
                </BodyText>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {rubricPosts.map((post) => (
                    <BlogPostCard
                      key={`${post.id}-${post.lang}`}
                      post={post}
                      readMoreLabel={copy.readMore}
                      locale={locale}
                    />
                  ))}
                </div>
              )}
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    );
  }

  const post = await getPostByLangAndSlug(lang, params.slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogPostRenderer
      post={post}
      lang={lang}
      showRubric={false}
      showTags={false}
      showShare={false}
    />
  );
}

function resolveRubricFromSlug(slug: string, lang: Lang) {
  return getRubricByRouteSlug(slug, lang) ?? getRubricDefinition(slug);
}
