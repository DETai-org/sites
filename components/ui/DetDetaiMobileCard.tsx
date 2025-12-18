"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import BodyText from "./BodyText";

type DetDetaiMobileCardProps = {
  paragraphs: string[];
  className?: string;
};

export default function DetDetaiMobileCard({ paragraphs, className }: DetDetaiMobileCardProps) {
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

  const previewText = useMemo(() => remainingText.slice(0, 320), [remainingText]);
  const previewParagraphs = useMemo(
    () => previewText.split(/\n\n+/).map((paragraph) => paragraph.trim()).filter(Boolean),
    [previewText],
  );

  return (
    <div
      className={cn(
        "paper--object-mobile md:hidden relative isolate overflow-hidden w-full max-w-none rounded-none border-y border-accent-primary/20",
        "px-mobile-4 py-mobile-5 shadow-[0_18px_48px_-18px_rgba(185,146,79,0.35)]",
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
      <div className="relative flex flex-col gap-mobile-4">
        <BodyText variant="infoCard" className="text-basic-dark">{firstSentence}</BodyText>

        {isExpanded ? (
          <div className="flex flex-col gap-mobile-3">
            {remainingParagraphs.map((paragraph, index) => (
              <BodyText key={index} variant="infoCard" className="text-basic-dark">
                {paragraph}
              </BodyText>
            ))}
          </div>
        ) : previewParagraphs.length ? (
          <div className="flex flex-col gap-mobile-3">
            {previewParagraphs.map((paragraph, index) => (
              <BodyText key={index} variant="infoCard" className="text-basic-dark">
                {paragraph}
              </BodyText>
            ))}
          </div>
        ) : null}
      </div>

      {!isExpanded && remainingText ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-basic-light/70 to-transparent" />
          <span className="pointer-events-none absolute bottom-mobile-3 right-mobile-4 text-mobile-sm font-semibold uppercase tracking-wide text-accent-primary">
            Читать дальше
          </span>
        </>
      ) : null}
    </div>
  );
}
