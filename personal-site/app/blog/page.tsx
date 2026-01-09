import { redirect } from "next/navigation";

import { defaultLang } from "../../lib/blog/blog.i18n";

export const runtime = "nodejs";

export default function BlogPage() {
  redirect(`/${defaultLang}/blog`);
}
