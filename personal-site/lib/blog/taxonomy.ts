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
  labels: rubric.labels,
  description: rubric.description,
  definition: {
    postulate: rubric.definition.postulate,
  },
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
