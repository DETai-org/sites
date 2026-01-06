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
    1: "text-3xl md:text-5xl font-serif font-semibold tracking-tight md:leading-tight",
    2: "text-2xl md:text-4xl font-serif font-medium tracking-normal md:font-semibold md:tracking-tight md:leading-snug",
    3: "text-xl md:text-3xl font-serif font-semibold tracking-tight md:leading-snug",
  };

  const colorClasses: Record<HeadingColor, string> = {
    basic: "text-fg",
    gold: "text-accentVar dark:text-fg",
    soft: "text-accentSoftVar dark:text-fg",
  };

  return <Tag className={cn(levelClasses[level], colorClasses[color], className)}>{children}</Tag>;
}
