"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type ExpandableAbstractProps = {
  text: string;
  initialLines?: number;
  className?: string;
  textClassName?: string;
};

export default function ExpandableAbstract({
  text,
  initialLines = 13,
  className,
  textClassName,
}: ExpandableAbstractProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldShowToggle = useMemo(() => text.trim().length > 280, [text]);

  const clampStyles = useMemo<CSSProperties | undefined>(() => {
    if (isExpanded) return undefined;

    return {
      display: "-webkit-box",
      WebkitLineClamp: initialLines,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    };
  }, [isExpanded, initialLines]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className={cn("text-mobile-small text-fg md:text-base md:leading-relaxed", textClassName)} style={clampStyles}>
        {text}
      </p>

      {shouldShowToggle ? (
        <button
          type="button"
          className="self-start text-sm font-semibold text-accentVar underline decoration-accentVar/60 underline-offset-[6px] transition-colors duration-200 hover:text-accent-hover"
          onClick={() => setIsExpanded((current) => !current)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Свернуть" : "Показать полностью"}
        </button>
      ) : null}
    </div>
  );
}
