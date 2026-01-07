import Link from "next/link";
import { getAllBlogPosts } from "../../lib/blog/blog.utils";

export const metadata = {
  title: "Блог",
  description: "Посты блога",
};

export const runtime = "nodejs";

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="page">
      <div className="page__heading">
        <h1>Блог</h1>
        <p>Первые материалы из WordPress.</p>
      </div>
      <section className="blog-grid">
        {posts.map((post) => (
          <article key={post.slug} className="blog-card">
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
              <p className="blog-card__meta">
                {new Date(post.publishedAt).toLocaleDateString("ru-RU")} · {post.author}
              </p>
              <h2 className="blog-card__title">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="blog-card__excerpt">{post.excerpt}</p>
              <Link className="blog-card__link" href={`/blog/${post.slug}`}>
                Читать полностью →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
