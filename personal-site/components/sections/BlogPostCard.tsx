"use client";

import Link from "next/link";

import type { BlogPostSummary } from "../../lib/blog/types";

interface BlogPostCardProps {
  post: BlogPostSummary;
  readMoreLabel: string;
  meta?: string;
}

export default function BlogPostCard({ post, readMoreLabel, meta }: BlogPostCardProps) {
  return (
    <article className="blog-card">
      {post.coverImage ? (
        <img
          className="blog-card__image"
          src={post.coverImage.src}
          width={post.coverImage.width}
          height={post.coverImage.height}
          alt={post.coverImage.alt}
        />
      ) : null}
      <div className="blog-card__body">
        {meta ? <p className="blog-card__meta">{meta}</p> : null}
        <h2 className="blog-card__title">
          <Link href={`/${post.lang}/blog/${post.slug}`}>{post.titles[post.lang]}</Link>
        </h2>
        <div className="blog-card__tags">
          {post.rubric ? (
            <Link
              className="blog-card__tag"
              href={`/${post.lang}/blog/${encodeURIComponent(post.rubric.slug)}`}
            >
              {post.rubric.label}
            </Link>
          ) : null}
          {post.category ? (
            <span className="blog-card__tag">{post.category.label}</span>
          ) : null}
        </div>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <Link className="blog-card__link" href={`/${post.lang}/blog/${post.slug}`}>
          {readMoreLabel}
        </Link>
      </div>
    </article>
  );
}
