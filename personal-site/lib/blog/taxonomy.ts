import { loadTaxonomyBundle } from "../../../packages/static-data/post_documents";
import {
  BlogCategoryDefinition,
  BlogKeywordDefinition,
  BlogRubricDefinition,
  Lang,
} from "./types";

const taxonomy = loadTaxonomyBundle("personal_site_blog");

export const blogRubrics: BlogRubricDefinition[] = taxonomy.rubrics.map((rubric) => ({
  slug: rubric.slug,
  routeSlugs: rubric.routeSlugs,
  labels: rubric.labels,
  description: rubric.description,
  definition: {
    postulate: rubric.definition.postulate,
  },
  seoKeywords: rubric.seoKeywords,
}));

export const blogCategories: BlogCategoryDefinition[] = taxonomy.categories.map((category) => ({
  slug: category.slug,
  labels: category.labels,
  description: category.description,
}));

export const blogKeywords: BlogKeywordDefinition[] = taxonomy.keywords.map((keyword) => ({
  slug: keyword.slug,
  labels: keyword.labels,
}));

export function getTaxonomyLabel(
  definitions: Array<BlogRubricDefinition | BlogCategoryDefinition | BlogKeywordDefinition>,
  slug: string,
  lang: Lang
): string {
  const entry = definitions.find((item) => item.slug === slug);
  return entry?.labels[lang] ?? entry?.labels.ru ?? slug;
}

export function getRubricDefinition(slug: string): BlogRubricDefinition | undefined {
  return blogRubrics.find((rubric) => rubric.slug === slug);
}

export function getRubricByRouteSlug(
  routeSlug: string,
  lang: Lang
): BlogRubricDefinition | undefined {
  return blogRubrics.find((rubric) => rubric.routeSlugs[lang] === routeSlug);
}

export function getRubricRouteSlug(slug: string, lang: Lang): string {
  return getRubricDefinition(slug)?.routeSlugs[lang] ?? slug;
}
