import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BlogPageRenderer from "@/components/blog/BlogPageRenderer";
import { getPostsIndexForLang } from "@/lib/blog/blog.data";
import { blogLocaleByLang, isLang, supportedLangs } from "@/lib/blog/blog.i18n";
import { blogCategories, blogRubrics } from "@/lib/blog/taxonomy";
import type { Lang } from "@/lib/blog/types";

interface BlogPageProps {
  params: {
    lang: string;
  };
}

const blogMetadataByLang: Record<Lang, { title: string; description: string }> = {
  ru: { title: "Блог DETai", description: "Материалы и заметки экосистемы DETai." },
  en: { title: "DETai Blog", description: "Stories and notes from the DETai ecosystem." },
  de: { title: "DETai Blog", description: "Geschichten und Notizen aus dem DETai-Ökosystem." },
  fi: { title: "DETai Blog", description: "DETai-ekosysteemin artikkelit ja muistiinpanot." },
  cn: { title: "DETai 博客", description: "来自 DETai 生态系统的文章与笔记。" },
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
    categoriesShowLabel: string;
    categoriesHideLabel: string;
    categoriesSelectedLabel: string;
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
    subheading: "Материалы и заметки экосистемы DETai — темы, практики, исследования.",
    readMore: "Читать полностью",
    filtersHeading: "Фильтры",
    filtersLead: "Выберите рубрики, категории, авторов или годы, чтобы сузить список.",
    allLabel: "Все",
    categoriesShowLabel: "Показать категории",
    categoriesHideLabel: "Скрыть категории",
    categoriesSelectedLabel: "Выбрано:",
    rubricsLabel: "Рубрики",
    categoriesLabel: "Категории",
    authorsLabel: "Авторы",
    yearsLabel: "Годы",
    resultsLabel: "Подобранных постов:",
    emptyState: "Посты с такими фильтрами пока не найдены.",
  },
  en: {
    heading: "Blog",
    subheading: "Stories and notes from the DETai ecosystem — themes, practice, research.",
    readMore: "Read more",
    filtersHeading: "Filters",
    filtersLead: "Pick rubrics, categories, authors, or years to narrow the list.",
    allLabel: "All",
    categoriesShowLabel: "Show categories",
    categoriesHideLabel: "Hide categories",
    categoriesSelectedLabel: "Selected:",
    rubricsLabel: "Rubrics",
    categoriesLabel: "Categories",
    authorsLabel: "Authors",
    yearsLabel: "Years",
    resultsLabel: "Posts found:",
    emptyState: "No posts match the selected filters yet.",
  },
  de: {
    heading: "Blog",
    subheading: "Geschichten und Notizen aus dem DETai-Ökosystem — Themen, Praxis, Forschung.",
    readMore: "Weiterlesen",
    filtersHeading: "Filter",
    filtersLead: "Wähle Rubriken, Kategorien, Autor:innen oder Jahre, um die Liste zu verfeinern.",
    allLabel: "Alle",
    categoriesShowLabel: "Kategorien anzeigen",
    categoriesHideLabel: "Kategorien ausblenden",
    categoriesSelectedLabel: "Ausgewählt:",
    rubricsLabel: "Rubriken",
    categoriesLabel: "Kategorien",
    authorsLabel: "Autor:innen",
    yearsLabel: "Jahre",
    resultsLabel: "Gefundene Beiträge:",
    emptyState: "Für diese Filter gibt es noch keine Beiträge.",
  },
  fi: {
    heading: "Blogi",
    subheading: "DETai-ekosysteemin artikkelit ja muistiinpanot — teemat, käytäntö, tutkimus.",
    readMore: "Lue lisää",
    filtersHeading: "Suodattimet",
    filtersLead: "Valitse rubriikit, kategoriat, kirjoittajat tai vuodet rajataksesi listaa.",
    allLabel: "Kaikki",
    categoriesShowLabel: "Näytä kategoriat",
    categoriesHideLabel: "Piilota kategoriat",
    categoriesSelectedLabel: "Valittu:",
    rubricsLabel: "Rubriikit",
    categoriesLabel: "Kategoriat",
    authorsLabel: "Kirjoittajat",
    yearsLabel: "Vuodet",
    resultsLabel: "Löydettyjä postauksia:",
    emptyState: "Näillä suodattimilla ei ole vielä postauksia.",
  },
  cn: {
    heading: "博客",
    subheading: "来自 DETai 生态系统的文章与笔记 — 主题、实践与研究。",
    readMore: "阅读全文",
    filtersHeading: "筛选",
    filtersLead: "选择栏目、类别、作者或年份来缩小列表。",
    allLabel: "全部",
    categoriesShowLabel: "显示类别",
    categoriesHideLabel: "隐藏类别",
    categoriesSelectedLabel: "已选择：",
    rubricsLabel: "栏目",
    categoriesLabel: "类别",
    authorsLabel: "作者",
    yearsLabel: "年份",
    resultsLabel: "匹配的文章：",
    emptyState: "暂无符合筛选条件的文章。",
  },
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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <BlogPageRenderer
          posts={posts}
          rubrics={rubrics}
          categories={categories}
          locale={locale}
          copy={{
            heading: copy.heading,
            subheading: copy.subheading,
            readMore: copy.readMore,
            filtersHeading: copy.filtersHeading,
            filtersLead: copy.filtersLead,
            allLabel: copy.allLabel,
            categoriesShowLabel: copy.categoriesShowLabel,
            categoriesHideLabel: copy.categoriesHideLabel,
            categoriesSelectedLabel: copy.categoriesSelectedLabel,
            rubricsLabel: copy.rubricsLabel,
            categoriesLabel: copy.categoriesLabel,
            authorsLabel: copy.authorsLabel,
            yearsLabel: copy.yearsLabel,
            resultsLabel: copy.resultsLabel,
            emptyState: copy.emptyState,
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
