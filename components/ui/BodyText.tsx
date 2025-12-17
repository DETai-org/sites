import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type BodyTextVariant =
  | "sectionDefault" // обычный текст в секциях
  | "sectionBrand" // акцентный текст в секциях
  | "projectCard" // карточки проектов (витрина)
  | "infoCard"; // карточки описаний / "для кого"

type BodyTextProps = {
  variant?: BodyTextVariant;
  className?: string;
  children: ReactNode;
};

const variantClasses: Record<BodyTextVariant, string> = {
  sectionDefault: "text-mobile-lg leading-mobile-normal text-accent-soft md:text-xl md:leading-relaxed",
  sectionBrand: "text-mobile-lg leading-mobile-normal text-accent-primary md:text-xl md:leading-relaxed",
  projectCard: "text-mobile-base leading-mobile-tight text-basic-dark md:text-base md:leading-snug",
  infoCard: "text-mobile-base leading-mobile-normal text-basic-dark md:text-lg md:leading-relaxed",
};

export default function BodyText({
  variant = "sectionDefault",
  className,
  children,
}: BodyTextProps) {
  return <p className={cn("font-sans", variantClasses[variant], className)}>{children}</p>;
}
