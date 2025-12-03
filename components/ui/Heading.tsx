import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3;
type HeadingColor = "basic" | "gold" | "soft";

type HeadingProps = {
  level?: HeadingLevel;
  color?: HeadingColor;
  className?: string;
  children: ReactNode;
};

export default function Heading({
  level = 1,
  color = "basic",
  className,
  children,
}: HeadingProps) {
  const Tag = `h${level}` as const;

  const levelClasses: Record<HeadingLevel, string> = {
    1: "text-mobile-3xl md:text-5xl font-serif font-semibold leading-mobile-tight tracking-tight md:leading-tight",
    2: "text-mobile-2xl md:text-4xl font-serif font-semibold leading-mobile-tight md:leading-tight",
    3: "text-mobile-xl md:text-3xl font-serif font-semibold leading-mobile-normal md:leading-snug",
  };

  const colorClasses: Record<HeadingColor, string> = {
    basic: "text-basic-dark",
    gold: "text-accent-primary",
    soft: "text-accent-soft",
  };

  return <Tag className={cn(levelClasses[level], colorClasses[color], className)}>{children}</Tag>;
}
