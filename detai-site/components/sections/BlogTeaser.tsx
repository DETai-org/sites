import { getPostsIndexForLang } from "@/lib/blog/blog.data";

import Section from "../ui/Section";
import HeadingLevel2 from "../ui/HeadingLevel2";
import BodyText from "../ui/BodyText";
import DefaultCard from "../ui/DefaultCard";

function formatBlogDate(isoDate: string) {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogTeaser() {
  const posts = await getPostsIndexForLang("ru");
  const post = posts[0];

  if (!post) {
    return null;
  }

  const title =
    post.frontmatter?.descriptive?.title?.trim() ||
    post.titles[post.lang]?.trim() ||
    post.slug;
  const excerpt =
    post.excerpt?.trim() || post.frontmatter?.descriptive?.preview?.trim() || "";
  const publishedLabel = formatBlogDate(post.publishedAt);

  return (
    <Section
      id="blog"
      variant="light"
      className="border-b border-accentVar/20"
      containerClassName="flex flex-col gap-8 md:gap-10"
    >
      <div className="flex w-full flex-col gap-3 md:gap-4">
        <HeadingLevel2>Наш блог</HeadingLevel2>
        <BodyText variant="sectionDefaultOnLight">
          Делимся историями, которые раскрывают дух DET и практику развития личности.
        </BodyText>
      </div>

      <div className="flex w-full flex-col gap-6 md:flex-row md:items-stretch md:gap-8">
        <DefaultCard title={title} className="w-full md:max-w-[40rem]">
          <div className="flex h-full flex-col gap-4">
            {publishedLabel ? (
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accentVar">
                {publishedLabel}
              </p>
            ) : null}
            <BodyText variant="projectCard">{excerpt}</BodyText>
          </div>
        </DefaultCard>
      </div>
    </Section>
  );
}
