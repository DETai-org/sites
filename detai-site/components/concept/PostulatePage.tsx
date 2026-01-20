import Link from "next/link";
import type { ReactNode } from "react";

type RelatedRubric = {
  title: string;
  href: string;
};

type PostulatePageProps = {
  title: string;
  lead?: string;
  children: ReactNode;
  relatedRubric?: RelatedRubric;
};

export default function PostulatePage({
  title,
  lead,
  children,
  relatedRubric,
}: PostulatePageProps) {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold text-fg">{title}</h1>
          {lead ? <p className="text-base text-muted">{lead}</p> : null}
        </header>
        <div className="flex flex-col gap-4 text-base text-fg">
          {children}
        </div>
        {relatedRubric ? (
          <div className="mt-4 flex flex-col gap-2 rounded-xl border border-border bg-surface p-6">
            <span className="text-xs uppercase tracking-[0.12em] text-muted">
              Связанная рубрика
            </span>
            <Link
              className="text-base font-semibold text-accentVar transition hover:text-accentVar/80"
              href={relatedRubric.href}
            >
              {relatedRubric.title}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
