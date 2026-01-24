"use client";

import { useMemo, useState } from "react";

import BodyText from "@/components/ui/BodyText";
import Section from "@/components/ui/Section";
import type { BlogPostSummary } from "@/lib/blog/types";

import BlogFiltersHeader from "./BlogFiltersHeader";
import BlogPostCard from "./BlogPostCard";

interface FilterOption {
  slug: string;
  label: string;
}

interface BlogPageCopy {
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
  resultsLabel: string;
  emptyState: string;
  readMore: string;
}

interface BlogPageRendererProps {
  posts: BlogPostSummary[];
  rubrics: FilterOption[];
  categories: FilterOption[];
  copy: BlogPageCopy;
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

export default function BlogPageRenderer({
  posts,
  rubrics,
  categories,
  copy,
  locale,
}: BlogPageRendererProps) {
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
    <>
      <Section
        variant="light"
        fullWidth
        className="border-b border-accentVar/20"
        containerClassName="px-4 md:px-6"
      >
        <BlogFiltersHeader
          copy={{
            heading: copy.heading,
            subheading: copy.subheading,
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
          }}
          rubrics={rubrics}
          categories={categories}
          authors={authors}
          years={years}
          selectedRubrics={selectedRubrics}
          selectedCategories={selectedCategories}
          selectedAuthors={selectedAuthors}
          selectedYears={selectedYears}
          onResetRubrics={() => setSelectedRubrics([])}
          onResetCategories={() => setSelectedCategories([])}
          onResetAuthors={() => setSelectedAuthors([])}
          onResetYears={() => setSelectedYears([])}
          onToggleRubric={(slug) =>
            setSelectedRubrics((current) => toggleSelection(current, slug))
          }
          onToggleCategory={(slug) =>
            setSelectedCategories((current) => toggleSelection(current, slug))
          }
          onToggleAuthor={(author) =>
            setSelectedAuthors((current) => toggleSelection(current, author))
          }
          onToggleYear={(year) => setSelectedYears((current) => toggleSelection(current, year))}
        />
      </Section>

      <Section variant="light" fullWidth containerClassName="px-4 md:px-6">
        <div className="flex flex-col gap-8">
          <p className="text-sm font-semibold text-muted">
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
      </Section>
    </>
  );
}
