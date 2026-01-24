import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BodyText from "@/components/ui/BodyText";
import Section from "@/components/ui/Section";
import type { BlogPost, Lang } from "@/lib/blog/types";

import { blogPostCopyByLang } from "./blogPostCopy";
import PostHeader from "./PostHeader";

interface BlogPostRendererProps {
  post: BlogPost;
  lang: Lang;
  showRubric?: boolean;
  showCategory?: boolean;
}

export default function BlogPostRenderer({
  post,
  lang,
  showRubric = true,
  showCategory = true,
}: BlogPostRendererProps) {
  const contentHtml = post.contentHtml.trim();
  const fallbackText = post.content.trim();
  const copy = blogPostCopyByLang[lang];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <PostHeader
          post={post}
          lang={lang}
          showRubric={showRubric}
          showCategory={showCategory}
        />
        <Section variant="light" containerClassName="px-0.5 md:px-8" fullWidth>
          <article className="flex flex-col gap-6 md:gap-8">
            {contentHtml ? (
              <div
                className="space-y-4 text-mobile-body text-fg md:text-lg md:leading-relaxed [&_a]:text-accentVar [&_a]:underline [&_a]:decoration-accentVar/40 [&_a]:underline-offset-4"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            ) : (
              <BodyText variant="sectionDefaultOnLight">
                {fallbackText || copy.emptyContent}
              </BodyText>
            )}
          </article>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
