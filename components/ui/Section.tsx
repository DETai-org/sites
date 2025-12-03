import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionVariant = "dark" | "light";

type SectionProps = {
  id?: string;
  variant?: SectionVariant;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

export default function Section({
  id,
  variant = "light",
  className,
  containerClassName,
  children,
}: SectionProps) {
  const variantClasses: Record<SectionVariant, string> = {
    dark: "bg-basic-dark text-accent-soft",
    light: "bg-basic-light text-basic-dark",
  };

  return (
    <section id={id} className={cn("w-full", variantClasses[variant], className)}>
      <div
        className={cn(
          "mx-auto w-full max-w-mobile px-mobile-4 py-mobile-6 md:max-w-6xl md:px-10 md:py-20",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
