import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type BodyTextVariant =
  | "sectionDefaultDark" // обычный текст в тёмных секциях
  | "sectionDefaultOnLight" // обычный текст в светлых секциях
  | "sectionBrand" // акцентный текст в секциях
  | "projectCard" // карточки проектов (витрина)
  | "infoCard"; // карточки описаний / "для кого"

type BodyTextProps = {
  variant?: BodyTextVariant;
  className?: string;
  children: ReactNode;
};

const variantClasses: Record<BodyTextVariant, string> = {
  sectionDefaultDark: "text-mobile-body text-accent-soft md:text-xl md:leading-relaxed",
  sectionDefaultOnLight: "text-mobile-body text-basic-dark md:text-xl md:leading-relaxed",
  sectionBrand: "text-mobile-body text-accent-primary md:text-xl md:leading-relaxed",
  projectCard: "text-mobile-small text-basic-dark md:text-base",
  infoCard: "text-mobile-small text-basic-dark md:text-base md:leading-relaxed",
};

export default function BodyText({
  variant = "sectionDefaultDark",
  className,
  children,
}: BodyTextProps) {
  return <p className={cn("font-sans", variantClasses[variant], className)}>{children}</p>;
}
