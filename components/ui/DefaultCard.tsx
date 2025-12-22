import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

import Heading from "./Heading";

type DefaultCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
};

const baseContainerClasses =
  "flex h-full flex-col gap-mobile-3 rounded-xl border p-mobile-4 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg md:gap-4 md:p-6";

const variantContainerClasses: Record<NonNullable<DefaultCardProps["variant"]>, string> = {
  light: "border-accent-primary/30 bg-accent-soft text-basic-dark hover:border-accent-primary",
  dark: "border-accent-primary/40 bg-basic-dark text-accent-soft shadow-md hover:border-accent-primary",
};

const baseTitleClasses =
  "min-h-[3.5rem] text-xl leading-snug md:min-h-[5.5rem] md:text-[2rem] md:leading-snug font-serif font-semibold";

const variantTitleClasses: Record<NonNullable<DefaultCardProps["variant"]>, string> = {
  light: "text-basic-dark",
  dark: "text-accent-soft",
};

export default function DefaultCard({
  title,
  children,
  className,
  variant = "light",
}: DefaultCardProps) {
  return (
    <div className={cn(baseContainerClasses, variantContainerClasses[variant], className)}>
      <Heading level={3} className={cn(baseTitleClasses, variantTitleClasses[variant])}>
        {title}
      </Heading>
      {children}
    </div>
  );
}
