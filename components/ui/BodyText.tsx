import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type BodyTextVariant =
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

const projectCardClasses = "text-mobile-small text-fg md:text-base";

const variantClasses: Record<BodyTextVariant, string> = {
  sectionDefaultDark: "text-mobile-body text-accentSoftVar md:text-xl md:leading-relaxed dark:text-fg",
  sectionDefaultOnLight: "text-mobile-body text-fg md:text-xl md:leading-relaxed",
  sectionBrand: "text-mobile-body text-accentVar md:text-xl md:leading-relaxed",
  projectCard: projectCardClasses,
  infoCard: projectCardClasses,
};

export default function BodyText({
  variant = "sectionDefaultDark",
  className,
  children,
}: BodyTextProps) {
  return <p className={cn("font-sans", variantClasses[variant], className)}>{children}</p>;
}
