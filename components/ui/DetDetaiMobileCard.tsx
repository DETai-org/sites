"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type DetDetaiMobileCardProps = {
  paragraphs: string[];
  className?: string;
};

export default function DetDetaiMobileCard({ paragraphs, className }: DetDetaiMobileCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { firstSentence, remainingText } = useMemo(() => {
    const [firstParagraph = "", ...rest] = paragraphs;
    const firstSentenceEnd = firstParagraph.indexOf(".");

    const sentenceEndIndex = firstSentenceEnd >= 0 ? firstSentenceEnd + 1 : firstParagraph.length;
    const firstSentenceText = firstParagraph.slice(0, sentenceEndIndex).trim();

    const remaining = [firstParagraph.slice(sentenceEndIndex).trim(), ...rest]
      .filter(Boolean)
      .join(" ")
      .trim();

    return { firstSentence: firstSentenceText, remainingText: remaining };
  }, [paragraphs]);

  const previewText = useMemo(() => remainingText.slice(0, 220), [remainingText]);

  return (
    <div
      className={cn(
        "md:hidden",
        "relative isolate left-1/2 w-screen -translate-x-1/2 overflow-hidden rounded-none border-y border-accent-primary/20 bg-basic-light px-mobile-4 py-mobile-5 shadow-[0_12px_40px_-12px_rgba(43,32,20,0.24)]",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_12%_10%,rgba(255,197,143,0.24),transparent_46%),radial-gradient(circle_at_92%_12%,rgba(204,228,255,0.24),transparent_44%)]",
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
      <div className="relative flex flex-col gap-mobile-3 text-basic-dark">
        <p className="font-sans text-mobile-lg leading-mobile-normal">{firstSentence}</p>

        {isExpanded ? (
          <p className="font-sans text-mobile-lg leading-mobile-normal text-basic-dark/90">{remainingText}</p>
        ) : remainingText ? (
          <p className="font-sans text-mobile-base leading-mobile-normal text-basic-dark/60">{previewText}</p>
        ) : null}
      </div>

      {!isExpanded && remainingText ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-basic-light via-basic-light/70 to-transparent" />
          <span className="pointer-events-none absolute bottom-mobile-3 right-mobile-4 text-mobile-sm font-semibold uppercase tracking-wide text-accent-primary">
            Читать дальше
          </span>
        </>
      ) : null}
    </div>
  );
}
