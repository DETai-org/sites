"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import BodyText, { type BodyTextVariant } from "./BodyText";

type MobileExpandableTextProps = {
  paragraphs: string[];
  textVariant?: BodyTextVariant;
  className?: string;
  textClassName?: string;
  previewCharLimit?: number;
  moreLabel?: string;
};

export default function MobileExpandableText({
  paragraphs,
  textVariant = "infoCard",
  className,
  textClassName,
  previewCharLimit = 320,
  moreLabel = "Читать далее",
}: MobileExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { firstSentence, remainingParagraphs, remainingText } = useMemo(() => {
    const normalizedParagraphs = paragraphs.map((paragraph) => paragraph.trim()).filter(Boolean);
    const [firstParagraph = "", ...rest] = normalizedParagraphs;
    const firstSentenceEnd = firstParagraph.indexOf(".");

    const sentenceEndIndex = firstSentenceEnd >= 0 ? firstSentenceEnd + 1 : firstParagraph.length;
    const firstSentenceText = firstParagraph.slice(0, sentenceEndIndex).trim();

    const remaining = [firstParagraph.slice(sentenceEndIndex).trim(), ...rest].filter(Boolean);
    const combinedRemainingText = remaining.join("\n\n").trim();

    return {
      firstSentence: firstSentenceText,
      remainingParagraphs: remaining,
      remainingText: combinedRemainingText,
    };
  }, [paragraphs]);

  const previewText = useMemo(() => remainingText.slice(0, previewCharLimit), [remainingText, previewCharLimit]);
  const previewParagraphs = useMemo(
    () => previewText.split(/\n\n+/).map((paragraph) => paragraph.trim()).filter(Boolean),
    [previewText],
  );

  return (
    <div
      className={cn(
        "md:hidden relative isolate w-full max-w-none overflow-hidden bg-bg", // mobile only
        className,
      )}
      role="button"
      tabIndex={0}
      onClick={() => setIsExpanded((current) => !current)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsExpanded((current) => !current);
        }
      }}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? "Свернуть текст" : "Развернуть текст"}
    >
      <div className="relative z-10 flex flex-col gap-mobile-4 px-0 py-mobile-1">
        <BodyText variant={textVariant} className={textClassName}>
          {firstSentence}
        </BodyText>

        {isExpanded ? (
          <div className="flex flex-col gap-mobile-3">
            {remainingParagraphs.map((paragraph, index) => (
              <BodyText key={index} variant={textVariant} className={textClassName}>
                {paragraph}
              </BodyText>
            ))}
          </div>
        ) : previewParagraphs.length ? (
          <div className="flex flex-col gap-mobile-3">
            {previewParagraphs.map((paragraph, index) => (
              <BodyText key={index} variant={textVariant} className={textClassName}>
                {paragraph}
              </BodyText>
            ))}
          </div>
        ) : null}
      </div>

      {!isExpanded && remainingText ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-bg via-bg/90 to-transparent" />
          <span className="pointer-events-none absolute bottom-mobile-3 right-mobile-4 z-10 text-mobile-small font-semibold uppercase tracking-wide text-accentVar">
            {moreLabel}
          </span>
        </>
      ) : null}
    </div>
  );
}
