import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

import Heading from "./Heading";

type DefaultCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
  titlePrefix?: ReactNode;
  titleClassName?: string;
  titlePrefixPlacement?: "inline" | "top-right" | "top-left";
};

const baseContainerClasses =
  "flex h-full flex-col gap-mobile-2 rounded-xl border p-mobile-4 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg md:gap-3 md:p-6";

const variantContainerClasses: Record<NonNullable<DefaultCardProps["variant"]>, string> = {
  light: "border-accentVar/30 bg-surface text-fg hover:border-accentVar/60",
  dark: "border-accentVar/40 bg-surface2 text-accentSoftVar shadow-md hover:border-accentVar/60 dark:text-fg",
};

const baseTitleClasses =
  "min-h-[3.5rem] text-left text-xl leading-snug md:min-h-[5.5rem] md:text-[2rem] md:leading-snug font-serif font-semibold";

const variantTitleClasses: Record<NonNullable<DefaultCardProps["variant"]>, string> = {
  light: "text-fg",
  dark: "text-accentSoftVar dark:text-fg",
};

export default function DefaultCard({
  title,
  children,
  className,
  variant = "light",
  titlePrefix,
  titleClassName,
  titlePrefixPlacement = "inline",
}: DefaultCardProps) {
  const isTopCornerPrefix =
    titlePrefix && (titlePrefixPlacement === "top-right" || titlePrefixPlacement === "top-left");
  const isTopLeftPrefix = titlePrefix && titlePrefixPlacement === "top-left";

  return (
    <div className={cn(baseContainerClasses, variantContainerClasses[variant], className)}>
      {isTopCornerPrefix ? (
        <div className="flex flex-col gap-mobile-2 md:gap-3">
          <div
            className={cn(
              "flex w-full pt-mobile-1 md:pt-2",
              isTopLeftPrefix
                ? "justify-start pl-mobile-1 md:pl-2"
                : "justify-end pr-mobile-1 md:pr-2",
            )}
          >
            {titlePrefix}
          </div>
          <Heading
            level={3}
            className={cn(baseTitleClasses, variantTitleClasses[variant], titleClassName)}
          >
            {title}
          </Heading>
        </div>
      ) : (
        <Heading
          level={3}
          className={cn(baseTitleClasses, variantTitleClasses[variant], titleClassName)}
        >
          {titlePrefix ? (
            <span className="flex items-center gap-mobile-3 md:gap-3">
              {titlePrefix}
              <span>{title}</span>
            </span>
          ) : (
            title
          )}
        </Heading>
      )}
      {children}
    </div>
  );
}
