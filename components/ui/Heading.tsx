import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3;
type HeadingColor = "basic" | "gold" | "soft";
type HeadingVariant = "default" | "hero";

type HeadingProps = {
  level?: HeadingLevel;
  color?: HeadingColor;
  variant?: HeadingVariant;
  className?: string;
  children: ReactNode;
};

export default function Heading({
  level = 1,
  color = "basic",
  variant = "default",
  className,
  children,
}: HeadingProps) {
  const Tag = `h${level}` as const;

  const levelClasses: Record<HeadingLevel, string> = {
    1: "text-mobile-5xl md:text-5xl font-serif font-semibold",
    2: "text-mobile-4xl md:text-4xl font-serif font-semibold",
    3: "text-mobile-2xl md:text-3xl font-serif font-semibold",
  };

  const colorClasses: Record<HeadingColor, string> = {
    basic: "text-basic-dark",
    gold: "text-accent-primary",
    soft: "text-accent-soft",
  };

  const variantClasses: Record<HeadingVariant, Record<HeadingLevel, string>> = {
    default: {
      1: "leading-mobile-tight tracking-tight md:leading-tight",
      2: "leading-mobile-tight tracking-tight md:leading-snug",
      3: "leading-mobile-tight tracking-tight md:leading-snug",
    },
    hero: {
      1: "leading-[1.1] tracking-tighter md:leading-[1.05]",
      2: "leading-[1.1] tracking-tighter md:leading-[1.05]",
      3: "leading-[1.1] tracking-tighter md:leading-[1.05]",
    },
  };

  return (
    <Tag className={cn(levelClasses[level], variantClasses[variant][level], colorClasses[color], className)}>
      {children}
    </Tag>
  );
}
