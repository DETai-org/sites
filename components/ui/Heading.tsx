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
    1: "text-4xl md:text-5xl font-serif font-semibold leading-tight tracking-tight",
    2: "text-3xl md:text-4xl font-serif font-semibold leading-tight",
    3: "text-2xl md:text-3xl font-serif font-semibold leading-snug",
  };

  const colorClasses: Record<HeadingColor, string> = {
    basic: "text-basic-dark",
    gold: "text-gold-primary",
    soft: "text-gold-soft",
  };

  return <Tag className={cn(levelClasses[level], colorClasses[color], className)}>{children}</Tag>;
}
