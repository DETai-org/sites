import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPostsIndexForLang } from "../../../lib/blog/blog.data";
import { blogLocaleByLang, isLang, supportedLangs } from "../../../lib/blog/blog.i18n";
import { getMetadataBase } from "../../../lib/blog/blog.metadata";
import { blogCategories, blogRubrics } from "../../../lib/blog/taxonomy";
import type { Lang } from "../../../lib/blog/types";
import BlogFilters from "./_components/BlogFilters";

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

const blogCopyByLang: Record<
  Lang,
  {
    heading: string;
    subheading: string;
    readMore: string;
    filtersHeading: string;
    filtersLead: string;
    allLabel: string;
    rubricsLabel: string;
    categoriesLabel: string;
    authorsLabel: string;
    yearsLabel: string;
    resultsLabel: string;
    emptyState: string;
  }
> = {
  ru: {
    heading: "Блог",
    subheading: "Первые материалы из WordPress.",
    readMore: "Читать полностью →",
    filtersHeading: "Фильтры",
    filtersLead: "Выберите рубрики, категории, авторов или годы, чтобы сузить список.",
    allLabel: "Все",
    rubricsLabel: "Рубрики",
    categoriesLabel: "Категории",
    authorsLabel: "Авторы",
    yearsLabel: "Годы",
    resultsLabel: "Подобранных постов:",
    emptyState: "Посты с такими фильтрами пока не найдены.",
  },
  en: {
    heading: "Blog",
    subheading: "First materials from WordPress.",
    readMore: "Read more →",
    filtersHeading: "Filters",
    filtersLead: "Pick rubrics, categories, authors, or years to narrow the list.",
    allLabel: "All",
    rubricsLabel: "Rubrics",
    categoriesLabel: "Categories",
    authorsLabel: "Authors",
    yearsLabel: "Years",
    resultsLabel: "Posts found:",
    emptyState: "No posts match the selected filters yet.",
  },
  de: {
    heading: "Blog",
    subheading: "Erste Materialien aus WordPress.",
    readMore: "Weiterlesen →",
    filtersHeading: "Filter",
    filtersLead: "Wähle Rubriken, Kategorien, Autor:innen oder Jahre, um die Liste zu verfeinern.",
    allLabel: "Alle",
    rubricsLabel: "Rubriken",
    categoriesLabel: "Kategorien",
    authorsLabel: "Autor:innen",
    yearsLabel: "Jahre",
    resultsLabel: "Gefundene Beiträge:",
    emptyState: "Für diese Filter gibt es noch keine Beiträge.",
  },
  fi: {
    heading: "Blogi",
    subheading: "Ensimmäiset materiaalit WordPressistä.",
    readMore: "Lue lisää →",
    filtersHeading: "Suodattimet",
    filtersLead: "Valitse rubriikit, kategoriat, kirjoittajat tai vuodet rajataksesi listaa.",
    allLabel: "Kaikki",
    rubricsLabel: "Rubriikit",
    categoriesLabel: "Kategoriat",
    authorsLabel: "Kirjoittajat",
    yearsLabel: "Vuodet",
    resultsLabel: "Löydettyjä postauksia:",
    emptyState: "Näillä suodattimilla ei ole vielä postauksia.",
  },
  cn: {
    heading: "博客",
    subheading: "来自 WordPress 的首批材料。",
    readMore: "阅读全文 →",
    filtersHeading: "筛选",
    filtersLead: "选择栏目、类别、作者或年份来缩小列表。",
    allLabel: "全部",
    rubricsLabel: "栏目",
    categoriesLabel: "类别",
    authorsLabel: "作者",
    yearsLabel: "年份",
    resultsLabel: "匹配的文章：",
    emptyState: "暂无符合筛选条件的文章。",
  }
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

  const lang = params.lang;
  const posts = await getPostsIndexForLang(lang);
  const locale = blogLocaleByLang[lang];
  const copy = blogCopyByLang[lang];
  const rubrics = blogRubrics.map((rubric) => ({
    slug: rubric.slug,
    label: rubric.labels[lang],
  }));
  const categories = blogCategories.map((category) => ({
    slug: category.slug,
    label: category.labels[lang],
  }));

  return (
    <main className="page">
      <div className="page__heading">
        <h1>{copy.heading}</h1>
        <p>{copy.subheading}</p>
      </div>
      <BlogFilters
        posts={posts}
        rubrics={rubrics}
        categories={categories}
        locale={locale}
        copy={{
          filtersHeading: copy.filtersHeading,
          filtersLead: copy.filtersLead,
          allLabel: copy.allLabel,
          rubricsLabel: copy.rubricsLabel,
          categoriesLabel: copy.categoriesLabel,
          authorsLabel: copy.authorsLabel,
          yearsLabel: copy.yearsLabel,
          resultsLabel: copy.resultsLabel,
          emptyState: copy.emptyState,
          readMore: copy.readMore,
        }}
      />
    </main>
  );
}
