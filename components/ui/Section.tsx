import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionVariant = "dark" | "light";

type SectionProps = {
  id?: string;
  variant?: SectionVariant;
  className?: string;
  containerClassName?: string;
  fullWidth?: boolean;
  children: ReactNode;
};

export default function Section({
  id,
  variant = "light",
  className,
  containerClassName,
  fullWidth = false,
  children,
}: SectionProps) {
  const variantClasses: Record<SectionVariant, string> = {
    dark: "bg-surface2 text-accentSoftVar dark:text-fg",
    light: "bg-bg text-fg",
  };

  const baseContainerClasses = fullWidth
    ? "mx-auto w-full px-mobile-4 py-mobile-6 md:px-10 md:py-20"
    : "mx-auto w-full max-w-mobile px-mobile-4 py-mobile-6 md:max-w-6xl md:px-10 md:py-20";

  return (
    <section id={id} className={cn("w-full", variantClasses[variant], className)}>
      <div className={cn(baseContainerClasses, containerClassName)}>{children}</div>
    </section>
  );
}
