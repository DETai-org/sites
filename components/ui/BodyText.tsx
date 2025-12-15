import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type BodyTextVariant = "default" | "brand";

type BodyTextProps = {
  variant?: BodyTextVariant;
  className?: string;
  children: ReactNode;
};

const variantClasses: Record<BodyTextVariant, string> = {
  default: "text-accent-soft",
  brand: "text-accent-soft",
};

export default function BodyText({
  variant = "default",
  className,
  children,
}: BodyTextProps) {
  return (
    <p
      className={cn(
        "font-sans text-mobile-lg leading-mobile-normal md:text-xl md:leading-relaxed",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </p>
  );
}
