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
        "relative isolate left-1/2 w-screen -translate-x-1/2 overflow-hidden rounded-none border-y border-accent-primary/20 bg-gradient-to-br from-basic-dark via-basic-dark to-accent-active/40 px-mobile-4 py-mobile-5 shadow-[0_12px_40px_-12px_rgba(43,32,20,0.24)]",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_12%_10%,rgba(201,168,106,0.22),transparent_46%),radial-gradient(circle_at_92%_12%,rgba(178,146,79,0.18),transparent_44%)]",
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
      <div className="relative flex flex-col gap-mobile-4 text-accent-soft">
        <BodyText>{firstSentence}</BodyText>

        {isExpanded ? (
          <div className="flex flex-col gap-mobile-3">
            {remainingParagraphs.map((paragraph, index) => (
              <BodyText key={index}>{paragraph}</BodyText>
            ))}
          </div>
        ) : previewParagraphs.length ? (
          <div className="flex flex-col gap-mobile-3">
            {previewParagraphs.map((paragraph, index) => (
              <BodyText key={index}>{paragraph}</BodyText>
            ))}
          </div>
        ) : null}
      </div>

      {!isExpanded && remainingText ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-basic-dark via-basic-dark/70 to-transparent" />
          <span className="pointer-events-none absolute bottom-mobile-3 right-mobile-4 text-mobile-sm font-semibold uppercase tracking-wide text-accent-soft">
            Читать дальше
          </span>
        </>
      ) : null}
    </div>
  );
}
