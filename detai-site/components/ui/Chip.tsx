import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ChipVariant = "black" | "default";

type ChipProps<T extends ElementType = "span"> = {
  as?: T;
  variant?: ChipVariant;
  interactive?: boolean;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

const variantClasses: Record<ChipVariant, string> = {
  black:
    "inline-flex w-fit items-center px-2 py-0.5 text-xs font-semibold rounded-full border border-[color:rgb(var(--soft-border)/0.15)] bg-[color:rgb(var(--surface-2))] text-[color:rgb(var(--accent-soft))]",
  default:
    "inline-flex w-fit items-center px-2 py-0.5 text-xs font-medium rounded-full border border-accentVar/30 bg-transparent text-fg/80 dark:text-accentSoftVar/80",
};

export default function Chip<T extends ElementType = "span">({
  as,
  variant = "black",
  interactive = true,
  className,
  children,
  ...props
}: ChipProps<T>) {
  const Component = as ?? "span";

  return (
    <Component
      className={cn(
        variantClasses[variant],
        "transition-colors duration-200",
        variant === "black" ? "hover:border-accentVar/60 hover:text-accent-hover" : null,
        variant === "default" && interactive
          ? "cursor-pointer hover:border-accentVar hover:bg-accentVar/10 hover:text-accentVar dark:hover:bg-accentVar/20"
          : null,
        variant === "default" && !interactive
          ? "cursor-default hover:border-accentVar/50 hover:text-fg dark:hover:text-accentSoftVar"
          : null,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
