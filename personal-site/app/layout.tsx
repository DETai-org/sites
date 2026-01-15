import type { ReactNode } from "react";
import { headers } from "next/headers";

import Header from "../components/layout/Header";
import { defaultLang, isLang, normalizeLang } from "../lib/blog/blog.i18n";
import "./globals.css";

export const metadata = {
  title: "Personal Site",
  description: "Минимальный каркас для personal-site"
};

export default function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params?: { lang?: string };
}) {
  const requestLang = normalizeLang(headers().get("accept-language"));
  const lang = isLang(params?.lang ?? "")
    ? params?.lang
    : requestLang ?? defaultLang;

  return (
    <html lang={lang}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
