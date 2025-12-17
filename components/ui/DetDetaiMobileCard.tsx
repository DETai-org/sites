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
        "md:hidden",
        "relative isolate overflow-hidden w-full -mx-mobile-4 rounded-none border-y border-accent-primary/20",
        "bg-gradient-to-br from-basic-light via-white to-accent-soft/80 px-mobile-4 py-mobile-5 shadow-[0_18px_48px_-18px_rgba(185,146,79,0.35)]",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_16%_22%,rgba(201,168,106,0.22),transparent_44%),radial-gradient(circle_at_92%_18%,rgba(242,229,194,0.5),transparent_48%)]",
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
        <BodyText className="text-basic-dark">{firstSentence}</BodyText>

        {isExpanded ? (
          <div className="flex flex-col gap-mobile-3">
            {remainingParagraphs.map((paragraph, index) => (
              <BodyText key={index} className="text-basic-dark">
                {paragraph}
              </BodyText>
            ))}
          </div>
        ) : previewParagraphs.length ? (
          <div className="flex flex-col gap-mobile-3">
            {previewParagraphs.map((paragraph, index) => (
              <BodyText key={index} className="text-basic-dark">
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
