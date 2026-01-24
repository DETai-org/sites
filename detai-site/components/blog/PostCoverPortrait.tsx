"use client";

import { useState } from "react";

import type { BlogImage } from "@/lib/blog/types";

interface PostCoverPortraitProps {
  image: BlogImage;
  expandLabel: string;
  collapseLabel: string;
}

export default function PostCoverPortrait({
  image,
  expandLabel,
  collapseLabel,
}: PostCoverPortraitProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-3 rounded-3xl border border-accentVar/10 bg-white/60 shadow-sm">
      <div className="relative">
        <div
          className={[
            "overflow-hidden rounded-2xl bg-accentVar/10",
            isExpanded ? "max-h-none" : "max-h-[420px]",
          ].join(" ")}
        >
          <img
            className="h-full w-full object-cover object-center"
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
          />
        </div>
        {!isExpanded ? (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
            <div className="absolute inset-x-0 bottom-3 flex justify-center">
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] rounded-full border border-accentVar/20 bg-white/90 text-accentVar transition-colors hover:border-accentVar/50 hover:text-accentVar"
              >
                {expandLabel}
                <span aria-hidden>↓</span>
              </button>
            </div>
          </>
        ) : (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] rounded-full border border-accentVar/20 bg-white/90 text-accentVar transition-colors hover:border-accentVar/50 hover:text-accentVar"
            >
              {collapseLabel}
              <span aria-hidden>↑</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
