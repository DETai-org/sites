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

  const paragraphs = post.content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

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
          {paragraphs.length ? (
            paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          ) : (
            <p>Контент скоро появится.</p>
          )}
        </div>
      </article>
    </main>
  );
}
