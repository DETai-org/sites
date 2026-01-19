import categoriesDocument from "./categories.json";
import cyclesDocument from "./cycle.json";
import keywordsDocument from "./keywords.json";
import rubricsDocument from "./rubrics.json";

export const taxonomyLangs = ["ru", "en", "de", "fi", "cn"] as const;
export type TaxonomyLang = (typeof taxonomyLangs)[number];

export type LocalizedText = Record<TaxonomyLang, string>;

export type TaxonomySiteChannel = "detai_site_blog" | "personal_site_blog";

export interface TaxonomyRubricDefinition {
  slug: string;
  routeSlugs: LocalizedText;
  labels: LocalizedText;
  description: LocalizedText;
  definition: {
    postulate: LocalizedText;
  };
  seoKeywords: Record<TaxonomyLang, string[]>;
}

export interface TaxonomyCategoryDefinition {
  slug: string;
  labels: LocalizedText;
  description: LocalizedText;
}

export interface TaxonomyKeywordDefinition {
  slug: string;
  labels: LocalizedText;
  description: LocalizedText;
}

export interface TaxonomyCycleDefinition {
  slug: string;
  titles: LocalizedText;
  preview: LocalizedText;
  seoLead: LocalizedText;
  content: LocalizedText;
}

export interface TaxonomyBundle {
  rubrics: TaxonomyRubricDefinition[];
  categories: TaxonomyCategoryDefinition[];
  keywords: TaxonomyKeywordDefinition[];
  cycles: TaxonomyCycleDefinition[];
}

// Поля берём из definition.* и descriptive.* согласно taxonomy_policy.md.
export const taxonomyFieldPolicy = {
  rubrics: {
    labels: "label",
    description: "description",
    postulate: "definition.postulate",
  },
  categories: {
    labels: "label",
    description: "description",
  },
  keywords: {
    labels: "label",
    description: "description",
  },
  cycles: {
    titles: "descriptive.title",
    preview: "descriptive.preview",
    seoLead: "descriptive.seoLead",
    content: "descriptive.content",
  },
} as const;

interface RubricsDocumentBlock {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
  site_channel: TaxonomySiteChannel | TaxonomySiteChannel[];
  items: RubricItem[];
}

interface RubricItem {
  id: string;
  routeSlugs: LocalizedText;
  label: LocalizedText;
  description: LocalizedText;
  definition?: {
    postulate?: LocalizedText;
  };
  seo_keywords?: Record<TaxonomyLang, string[]>;
}

interface RubricsDocument {
  blocks: RubricsDocumentBlock[];
}

interface CategoriesDocument {
  items: Array<{
    id: string;
    label: LocalizedText;
    description: LocalizedText;
  }>;
}

interface KeywordsDocument {
  items: Array<{
    id: string;
    label: LocalizedText;
    description: LocalizedText;
  }>;
}

interface CyclesDocumentBlock {
  site_channel: TaxonomySiteChannel | TaxonomySiteChannel[];
  items: CycleItem[];
}

interface CycleItem {
  administrative: {
    id: string;
  };
  descriptive: {
    title: LocalizedText;
    preview: LocalizedText;
    seoLead: LocalizedText;
    content: LocalizedText;
  };
}

interface CyclesDocument {
  blocks: CyclesDocumentBlock[];
}

export function loadTaxonomyBundle(siteChannel: TaxonomySiteChannel): TaxonomyBundle {
  const rubrics = loadRubrics(siteChannel);
  const categories = loadCategories();
  const keywords = loadKeywords();
  const cycles = loadCycles(siteChannel);

  return {
    rubrics,
    categories,
    keywords,
    cycles,
  };
}

function loadRubrics(siteChannel: TaxonomySiteChannel): TaxonomyRubricDefinition[] {
  const document = rubricsDocument as RubricsDocument;

  const blocks = document.blocks.filter((block) =>
    matchesSiteChannel(block.site_channel, siteChannel)
  );

  // Персональный сайт включает базовые рубрики профессионального сайта.
  if (siteChannel === "personal_site_blog") {
    blocks.push(
      ...document.blocks.filter((block) => block.site_channel === "detai_site_blog")
    );
  }

  const itemsMap = new Map<string, RubricItem>();
  for (const block of blocks) {
    for (const item of block.items) {
      itemsMap.set(item.id, item);
    }
  }

  return Array.from(itemsMap.values()).map((item) => {
    const routeSlugs = ensureLocalized(item.routeSlugs, `rubric ${item.id} routeSlugs`);
    const labels = ensureLocalized(item.label, `rubric ${item.id} label`);
    const description = ensureLocalized(item.description, `rubric ${item.id} description`);
    const postulate = ensureLocalized(
      item.definition?.postulate,
      `rubric ${item.id} definition.postulate`
    );
    const seoKeywords = ensureLocalizedList(
      item.seo_keywords,
      `rubric ${item.id} seo_keywords`
    );

    return {
      slug: item.id,
      routeSlugs,
      labels,
      description,
      definition: {
        postulate,
      },
      seoKeywords,
    };
  });
}

function loadCategories(): TaxonomyCategoryDefinition[] {
  const document = categoriesDocument as CategoriesDocument;

  return document.items.map((item) => {
    const labels = ensureLocalized(item.label, `category ${item.id} label`);
    const description = ensureLocalized(item.description, `category ${item.id} description`);

    return {
      slug: item.id,
      labels,
      description,
    };
  });
}

function loadKeywords(): TaxonomyKeywordDefinition[] {
  const document = keywordsDocument as KeywordsDocument;

  return document.items.map((item) => {
    const labels = ensureLocalized(item.label, `keyword ${item.id} label`);
    const description = ensureLocalized(item.description, `keyword ${item.id} description`);

    return {
      slug: item.id,
      labels,
      description,
    };
  });
}

function loadCycles(siteChannel: TaxonomySiteChannel): TaxonomyCycleDefinition[] {
  const document = cyclesDocument as CyclesDocument;
  const items = document.blocks
    .filter((block) => matchesSiteChannel(block.site_channel, siteChannel))
    .flatMap((block) => block.items);

  return items.map((item) => {
    const titles = ensureLocalized(item.descriptive?.title, `cycle ${item.administrative.id} title`);
    const preview = ensureLocalized(
      item.descriptive?.preview,
      `cycle ${item.administrative.id} preview`
    );
    const seoLead = ensureLocalized(
      item.descriptive?.seoLead,
      `cycle ${item.administrative.id} seoLead`
    );
    const content = ensureLocalized(
      item.descriptive?.content,
      `cycle ${item.administrative.id} content`
    );

    return {
      slug: item.administrative.id,
      titles,
      preview,
      seoLead,
      content,
    };
  });
}

function matchesSiteChannel(
  siteChannel: TaxonomySiteChannel | TaxonomySiteChannel[],
  expected: TaxonomySiteChannel
): boolean {
  return Array.isArray(siteChannel) ? siteChannel.includes(expected) : siteChannel === expected;
}

function ensureLocalized(value: unknown, context: string): LocalizedText {
  if (!value || typeof value !== "object") {
    throw new Error(`Отсутствуют локализованные данные: ${context}`);
  }

  const record = value as Record<string, unknown>;
  const missingLangs = taxonomyLangs.filter((lang) => {
    const entry = record[lang];
    return typeof entry !== "string" || entry.trim().length === 0;
  });

  if (missingLangs.length > 0) {
    throw new Error(
      `Не хватает переводов (${missingLangs.join(", ")}) для ${context}`
    );
  }

  return record as LocalizedText;
}

function ensureLocalizedList(
  value: unknown,
  context: string
): Record<TaxonomyLang, string[]> {
  if (!value || typeof value !== "object") {
    throw new Error(`Отсутствуют локализованные списки: ${context}`);
  }

  const record = value as Record<string, unknown>;
  const missingLangs = taxonomyLangs.filter((lang) => {
    const entry = record[lang];
    return !Array.isArray(entry) || entry.length === 0;
  });

  if (missingLangs.length > 0) {
    throw new Error(
      `Не хватает списков (${missingLangs.join(", ")}) для ${context}`
    );
  }

  return record as Record<TaxonomyLang, string[]>;
}
