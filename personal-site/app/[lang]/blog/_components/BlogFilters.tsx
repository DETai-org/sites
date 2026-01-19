"use client";

import { useMemo, useState } from "react";

import BlogPostCard from "../../../../components/sections/BlogPostCard";
import { formatBlogDate } from "../../../../lib/blog/blog.utils";
import type { BlogPostSummary } from "../../../../lib/blog/types";

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

  return (
    <section className="blog-filters">
      <div className="blog-filters__intro">
        <h2 className="blog-filters__title">{copy.filtersHeading}</h2>
        <p className="blog-filters__lead">{copy.filtersLead}</p>
      </div>
      <div className="blog-filters__grid">
        <div className="blog-filters__group">
          <h3 className="blog-filters__label">{copy.rubricsLabel}</h3>
          <div className="blog-filters__chips">
            <button
              className={`blog-filters__chip ${selectedRubrics.length === 0 ? "is-active" : ""}`}
              type="button"
              onClick={() => setSelectedRubrics([])}
            >
              {copy.allLabel}
            </button>
            {rubrics.map((rubric) => (
              <button
                key={rubric.slug}
                className={`blog-filters__chip ${
                  selectedRubrics.includes(rubric.slug) ? "is-active" : ""
                }`}
                type="button"
                onClick={() => setSelectedRubrics((current) => toggleSelection(current, rubric.slug))}
              >
                {rubric.label}
              </button>
            ))}
          </div>
        </div>
        <div className="blog-filters__group">
          <h3 className="blog-filters__label">{copy.categoriesLabel}</h3>
          <div className="blog-filters__chips">
            <button
              className={`blog-filters__chip ${selectedCategories.length === 0 ? "is-active" : ""}`}
              type="button"
              onClick={() => setSelectedCategories([])}
            >
              {copy.allLabel}
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                className={`blog-filters__chip ${
                  selectedCategories.includes(category.slug) ? "is-active" : ""
                }`}
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
        <div className="blog-filters__group">
          <h3 className="blog-filters__label">{copy.authorsLabel}</h3>
          <div className="blog-filters__chips">
            <button
              className={`blog-filters__chip ${selectedAuthors.length === 0 ? "is-active" : ""}`}
              type="button"
              onClick={() => setSelectedAuthors([])}
            >
              {copy.allLabel}
            </button>
            {authors.map((author) => (
              <button
                key={author}
                className={`blog-filters__chip ${
                  selectedAuthors.includes(author) ? "is-active" : ""
                }`}
                type="button"
                onClick={() => setSelectedAuthors((current) => toggleSelection(current, author))}
              >
                {author}
              </button>
            ))}
          </div>
        </div>
        <div className="blog-filters__group">
          <h3 className="blog-filters__label">{copy.yearsLabel}</h3>
          <div className="blog-filters__chips">
            <button
              className={`blog-filters__chip ${selectedYears.length === 0 ? "is-active" : ""}`}
              type="button"
              onClick={() => setSelectedYears([])}
            >
              {copy.allLabel}
            </button>
            {years.map((year) => (
              <button
                key={year}
                className={`blog-filters__chip ${selectedYears.includes(year) ? "is-active" : ""}`}
                type="button"
                onClick={() => setSelectedYears((current) => toggleSelection(current, year))}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="blog-filters__results">
        {copy.resultsLabel} {filteredPosts.length}
      </p>
      {filteredPosts.length === 0 ? (
        <p className="blog-filters__empty">{copy.emptyState}</p>
      ) : (
        <div className="blog-grid">
          {filteredPosts.map((post) => {
            const formattedDate = formatBlogDate(post.publishedAt, locale);
            const metaParts = [formattedDate, post.author].filter(Boolean);

            return (
              <BlogPostCard
                key={`${post.id}-${post.lang}`}
                post={post}
                readMoreLabel={copy.readMore}
                meta={metaParts.join(" · ")}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
