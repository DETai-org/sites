import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { getPostBaseById } from "../../../../lib/blog/blog.data";
import { defaultLang, normalizeLang } from "../../../../lib/blog/blog.i18n";

interface BlogNeutralPageProps {
  params: {
    id: string;
  };
}

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export const runtime = "nodejs";

export default function BlogNeutralPage({ params }: BlogNeutralPageProps) {
  const post = getPostBaseById(params.id);

  if (!post) {
    notFound();
  }

  const cookieLang = normalizeLang(cookies().get("lang")?.value);
  const headerLang = normalizeLang(headers().get("accept-language"));

  const preferredLang = cookieLang ?? headerLang ?? defaultLang;
  const fallbackLang = post.contentFiles[preferredLang] ? preferredLang : defaultLang;
  const slug = post.slugs[fallbackLang] ?? post.slugs[defaultLang];

  if (!slug) {
    notFound();
  }

  redirect(`/${fallbackLang}/blog/${slug}`);
}
