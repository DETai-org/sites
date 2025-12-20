import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

import Heading from "./Heading";

type DefaultCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

const containerClasses =
  "flex h-full flex-col gap-mobile-3 rounded-xl border border-accent-primary/30 bg-accent-soft p-mobile-4 text-basic-dark shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:border-accent-primary hover:shadow-lg md:gap-4 md:p-6";

const titleClasses =
  "text-mobile-xl md:text-3xl font-serif font-semibold leading-mobile-normal text-basic-dark md:leading-snug";

export default function DefaultCard({
  title,
  children,
  className,
}: DefaultCardProps) {
  return (
    <div className={cn(containerClasses, className)}>
      <Heading level={3} className={titleClasses}>
        {title}
      </Heading>
      {children}
    </div>
  );
}
