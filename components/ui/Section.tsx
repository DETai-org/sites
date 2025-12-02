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
    dark: "bg-basic-dark text-gold-soft",
    light: "bg-basic-light text-basic-dark",
  };

  return (
    <section id={id} className={cn("w-full", variantClasses[variant], className)}>
      <div className={cn("mx-auto w-full max-w-6xl px-4 py-18 md:py-22", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
