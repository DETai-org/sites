import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type DefaultCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
  titleAs?: "h3" | "h4";
};

const containerClasses =
  "flex h-full flex-col gap-mobile-3 rounded-xl border border-accent-primary/30 bg-accent-soft p-mobile-4 text-basic-dark shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:border-accent-primary hover:shadow-lg md:gap-4 md:p-6";

const titleClasses =
  "text-mobile-xl font-serif font-semibold leading-mobile-tight text-basic-dark md:text-2xl md:leading-snug";

export default function DefaultCard({
  title,
  children,
  className,
  titleAs = "h3",
}: DefaultCardProps) {
  const TitleTag = titleAs;

  return (
    <div className={cn(containerClasses, className)}>
      <TitleTag className={titleClasses}>{title}</TitleTag>
      {children}
    </div>
  );
}
