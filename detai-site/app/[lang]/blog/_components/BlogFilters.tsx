"use client";

import { useMemo, useState } from "react";

import BodyText from "@/components/ui/BodyText";
import HeadingLevel2 from "@/components/ui/HeadingLevel2";
import { cn } from "@/lib/utils";
import type { BlogPostSummary } from "@/lib/blog/types";

import BlogPostCard from "./BlogPostCard";

interface FilterOption {
  slug: string;
  label: string;
}

interface BlogFiltersCopy {
  filtersHeading: string;
  filtersLead: string;
  allLabel: string;
  rubricsLabel: string;
  categoriesLabel: string;
  authorsLabel: string;
  yearsLabel: string;
  resultsLabel: string;
  emptyState: string;
  readMore: string;
}

interface BlogFiltersProps {
  posts: BlogPostSummary[];
  rubrics: FilterOption[];
  categories: FilterOption[];
  copy: BlogFiltersCopy;
  locale: string;
}

function toggleSelection(current: string[], value: string) {
  if (current.includes(value)) {
    return current.filter((item) => item !== value);
  }

  return [...current, value];
}

function getPostYear(publishedAt: string): string | null {
  const parsed = Date.parse(publishedAt);
  if (Number.isNaN(parsed)) {
    return null;
  }

  return String(new Date(parsed).getFullYear());
}

export default function BlogFilters({ posts, rubrics, categories, copy, locale }: BlogFiltersProps) {
  const [selectedRubrics, setSelectedRubrics] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  const authors = useMemo(() => {
    const items = new Set<string>();
    posts.forEach((post) => {
      if (post.author) {
        items.add(post.author);
      }
    });
    return Array.from(items).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const years = useMemo(() => {
    const items = new Set<string>();
    posts.forEach((post) => {
      const year = getPostYear(post.publishedAt);
      if (year) {
        items.add(year);
      }
    });
    return Array.from(items).sort((a, b) => Number(b) - Number(a));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const year = getPostYear(post.publishedAt);
      const rubricMatch =
        selectedRubrics.length === 0 || selectedRubrics.includes(post.rubric?.slug ?? "");
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(post.category?.slug ?? "");
      const authorMatch =
        selectedAuthors.length === 0 || selectedAuthors.includes(post.author ?? "");
      const yearMatch = selectedYears.length === 0 || (year ? selectedYears.includes(year) : false);

      return rubricMatch && categoryMatch && authorMatch && yearMatch;
    });
  }, [posts, selectedAuthors, selectedCategories, selectedRubrics, selectedYears]);

  const chipClasses = (active: boolean) =>
    cn(
      "inline-flex items-center justify-center px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] rounded-full border transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentVar",
      active
        ? "border-accentVar bg-accentVar/10 text-accentVar"
        : "border-accentVar/30 text-fg hover:border-accentVar hover:text-accentVar",
    );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <HeadingLevel2>{copy.filtersHeading}</HeadingLevel2>
        <BodyText variant="sectionDefaultOnLight" className="max-w-2xl">
          {copy.filtersLead}
        </BodyText>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            {copy.rubricsLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              className={chipClasses(selectedRubrics.length === 0)}
              type="button"
              onClick={() => setSelectedRubrics([])}
            >
              {copy.allLabel}
            </button>
            {rubrics.map((rubric) => (
              <button
                key={rubric.slug}
                className={chipClasses(selectedRubrics.includes(rubric.slug))}
                type="button"
                onClick={() => setSelectedRubrics((current) => toggleSelection(current, rubric.slug))}
              >
                {rubric.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            {copy.categoriesLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              className={chipClasses(selectedCategories.length === 0)}
              type="button"
              onClick={() => setSelectedCategories([])}
            >
              {copy.allLabel}
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                className={chipClasses(selectedCategories.includes(category.slug))}
                type="button"
                onClick={() =>
                  setSelectedCategories((current) => toggleSelection(current, category.slug))
                }
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            {copy.authorsLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              className={chipClasses(selectedAuthors.length === 0)}
              type="button"
              onClick={() => setSelectedAuthors([])}
            >
              {copy.allLabel}
            </button>
            {authors.map((author) => (
              <button
                key={author}
                className={chipClasses(selectedAuthors.includes(author))}
                type="button"
                onClick={() => setSelectedAuthors((current) => toggleSelection(current, author))}
              >
                {author}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            {copy.yearsLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              className={chipClasses(selectedYears.length === 0)}
              type="button"
              onClick={() => setSelectedYears([])}
            >
              {copy.allLabel}
            </button>
            {years.map((year) => (
              <button
                key={year}
                className={chipClasses(selectedYears.includes(year))}
                type="button"
                onClick={() => setSelectedYears((current) => toggleSelection(current, year))}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
        {copy.resultsLabel} {filteredPosts.length}
      </p>

      {filteredPosts.length === 0 ? (
        <BodyText variant="sectionDefaultOnLight" className="text-muted">
          {copy.emptyState}
        </BodyText>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
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
  );
}
