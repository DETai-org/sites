import { redirect } from "next/navigation";

import { defaultLang } from "../../../lib/blog/blog.i18n";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export const runtime = "nodejs";

export default function BlogPostPage({ params }: BlogPostPageProps) {
  redirect(`/${defaultLang}/blog/${params.slug}`);
}
