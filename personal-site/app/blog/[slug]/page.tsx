import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "../../../lib/blog/blog.utils";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export const runtime = "nodejs";

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const isDev = process.env.NODE_ENV === "development";
  const contentHtml = post.contentHtml.trim();
  const fallbackText = post.content.trim();
  const emptyStateText = fallbackText || (isDev ? "Файл не найден." : "Контент скоро появится.");

  return (
    <main className="page">
      <article className="blog-post">
        <header className="blog-post__header">
          <p className="blog-post__meta">
            {new Date(post.publishedAt).toLocaleDateString("ru-RU")} · {post.author}
          </p>
          <h1 className="blog-post__title">{post.title}</h1>
          {post.coverImage ? (
            <img
              className="blog-post__image"
              src={post.coverImage.src}
              width={post.coverImage.width}
              height={post.coverImage.height}
              alt={post.coverImage.alt}
            />
          ) : null}
        </header>
        <div className="blog-post__content">
          {contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          ) : (
            <p>{emptyStateText}</p>
          )}
        </div>
      </article>
    </main>
  );
}
