import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import Header from "../../components/layout/Header";
import "../globals.css";
import { isLang } from "../../lib/blog/blog.i18n";

interface LangLayoutProps {
  children: ReactNode;
  params: {
    lang: string;
  };
}

export default function LangLayout({ children, params }: LangLayoutProps) {
  if (!isLang(params.lang)) {
    notFound();
  }

  return (
    <html lang={params.lang}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
