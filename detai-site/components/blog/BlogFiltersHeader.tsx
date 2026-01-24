"use client";

import { useState } from "react";

import BodyText from "@/components/ui/BodyText";
import Heading from "@/components/ui/Heading";
import HeadingLevel2 from "@/components/ui/HeadingLevel2";
import { cn } from "@/lib/utils";

interface FilterOption {
  slug: string;
  label: string;
}

interface BlogFiltersHeaderCopy {
  heading: string;
  subheading: string;
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
}

interface BlogFiltersHeaderProps {
  copy: BlogFiltersHeaderCopy;
  rubrics: FilterOption[];
  categories: FilterOption[];
  authors: string[];
  years: string[];
  selectedRubrics: string[];
  selectedCategories: string[];
  selectedAuthors: string[];
  selectedYears: string[];
  onResetRubrics: () => void;
  onResetCategories: () => void;
  onResetAuthors: () => void;
  onResetYears: () => void;
  onToggleRubric: (slug: string) => void;
  onToggleCategory: (slug: string) => void;
  onToggleAuthor: (author: string) => void;
  onToggleYear: (year: string) => void;
}

const chipClasses = (active: boolean) =>
  cn(
    "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold tracking-normal transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentVar",
    active
      ? "border-accentVar bg-accentVar/10 text-accentVar"
      : "border-accentVar/30 text-fg hover:border-accentVar hover:text-accentVar",
  );

export default function BlogFiltersHeader({
  copy,
  rubrics,
  categories,
  authors,
  years,
  selectedRubrics,
  selectedCategories,
  selectedAuthors,
  selectedYears,
  onResetRubrics,
  onResetCategories,
  onResetAuthors,
  onResetYears,
  onToggleRubric,
  onToggleCategory,
  onToggleAuthor,
  onToggleYear,
}: BlogFiltersHeaderProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const selectedCategoriesLabels = categories
    .filter((category) => selectedCategories.includes(category.slug))
    .map((category) => category.label);
  const categoriesSummary = selectedCategoriesLabels.join(", ");

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <Heading level={1}>{copy.heading}</Heading>
        <BodyText variant="sectionDefaultOnLight" className="max-w-2xl">
          {copy.subheading}
        </BodyText>
      </div>

      <div className="rounded-3xl border border-accentVar/15 bg-white/50 p-6 md:p-8">
        <div className="flex flex-col gap-3">
          <HeadingLevel2>{copy.filtersHeading}</HeadingLevel2>
          <BodyText variant="sectionDefaultOnLight" className="max-w-2xl">
            {copy.filtersLead}
          </BodyText>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-[0.16em] text-muted">
              {copy.rubricsLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                className={chipClasses(selectedRubrics.length === 0)}
                type="button"
                onClick={onResetRubrics}
              >
                {copy.allLabel}
              </button>
              {rubrics.map((rubric) => (
                <button
                  key={rubric.slug}
                  className={chipClasses(selectedRubrics.includes(rubric.slug))}
                  type="button"
                  onClick={() => onToggleRubric(rubric.slug)}
                >
                  {rubric.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted">
                {copy.authorsLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  className={chipClasses(selectedAuthors.length === 0)}
                  type="button"
                  onClick={onResetAuthors}
                >
                  {copy.allLabel}
                </button>
                {authors.map((author) => (
                  <button
                    key={author}
                    className={chipClasses(selectedAuthors.includes(author))}
                    type="button"
                    onClick={() => onToggleAuthor(author)}
                  >
                    {author}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted">
                {copy.yearsLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  className={chipClasses(selectedYears.length === 0)}
                  type="button"
                  onClick={onResetYears}
                >
                  {copy.allLabel}
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    className={chipClasses(selectedYears.includes(year))}
                    type="button"
                    onClick={() => onToggleYear(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-muted">
              {copy.categoriesLabel}
            </p>
            <button
              className="text-xs font-semibold text-accentVar transition-colors hover:text-accentVar/80 md:hidden"
              type="button"
              onClick={() => setIsCategoriesOpen((prev) => !prev)}
              aria-expanded={isCategoriesOpen}
            >
              {isCategoriesOpen ? copy.categoriesHideLabel : copy.categoriesShowLabel} (
              {categories.length})
            </button>
          </div>
          {selectedCategories.length > 0 ? (
            <p className="text-xs text-muted md:hidden">
              {copy.categoriesSelectedLabel}{" "}
              <span className="text-fg">{categoriesSummary}</span>
            </p>
          ) : null}
          <div
            className={cn(
              "flex flex-wrap gap-2",
              isCategoriesOpen ? "flex" : "hidden md:flex",
            )}
          >
            <button
              className={chipClasses(selectedCategories.length === 0)}
              type="button"
              onClick={onResetCategories}
            >
              {copy.allLabel}
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                className={chipClasses(selectedCategories.includes(category.slug))}
                type="button"
                onClick={() => onToggleCategory(category.slug)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
