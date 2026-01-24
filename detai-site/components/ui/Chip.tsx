import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ChipVariant = "black";

type ChipProps<T extends ElementType = "span"> = {
  as?: T;
  variant?: ChipVariant;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

const variantClasses: Record<ChipVariant, string> = {
  black:
    "inline-flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full border border-[color:rgb(var(--soft-border)/0.15)] bg-[color:rgb(var(--surface-2))] text-[color:rgb(var(--accent-soft))] transition-colors duration-200 hover:border-accentVar/60 hover:text-accent-hover",
};

export default function Chip<T extends ElementType = "span">({
  as,
  variant = "black",
  className,
  children,
  ...props
}: ChipProps<T>) {
  const Component = as ?? "span";

  return (
    <Component className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Component>
  );
}
