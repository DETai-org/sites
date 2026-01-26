"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { Copy, Link2, Send, X } from "lucide-react";

import { cn } from "@/lib/utils";

type ShareSectionProps = {
  title?: string;
  className?: string;
  shareUrl?: string;
  variant?: "publication" | "post";
};

export default function ShareSection({
  title = "Поделиться",
  className,
  shareUrl,
}: ShareSectionProps) {
  const [resolvedUrl, setResolvedUrl] = useState(shareUrl ?? "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (shareUrl) {
      setResolvedUrl(shareUrl);
      return;
    }

    if (typeof window === "undefined") return;

    setResolvedUrl(window.location.href);
  }, [shareUrl]);

  const finalUrl = shareUrl || resolvedUrl;
  const encodedUrl = useMemo(() => encodeURIComponent(finalUrl || ""), [finalUrl]);

  const handleCopy = async () => {
    if (!finalUrl) return;

    try {
      await navigator.clipboard.writeText(finalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (error) {
      console.error("Не удалось скопировать ссылку", error);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-[color:rgb(var(--soft-border)/0.1)] bg-[color:rgb(var(--panel-bg))] p-mobile-3 text-fg shadow-sm md:p-4",
        className,
      )}
    >
      {title ? <h3 className="text-base font-semibold text-fg md:text-lg">{title}</h3> : null}

      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <button
          type="button"
          className="group relative inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[color:var(--button-secondary-border)] px-4 py-2 text-sm font-semibold text-[color:var(--button-secondary-text)] transition-all duration-300 hover:bg-accentSoftVar/20 md:text-base"
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4" aria-hidden />
          Скопировать ссылку
        </button>

        <Link
          href={`https://x.com/intent/tweet?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[color:var(--button-secondary-border)] px-4 py-2 text-sm font-semibold text-[color:var(--button-secondary-text)] transition-all duration-300 hover:bg-accentSoftVar/20 md:text-base"
        >
          <X className="h-4 w-4" aria-hidden />
          X
        </Link>

        <Link
          href={`https://t.me/share/url?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[color:var(--button-secondary-border)] px-4 py-2 text-sm font-semibold text-[color:var(--button-secondary-text)] transition-all duration-300 hover:bg-accentSoftVar/20 md:text-base"
        >
          <Send className="h-4 w-4" aria-hidden />
          Telegram
        </Link>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted md:text-mobile-small">
        <Link2 className="h-4 w-4" aria-hidden />
        <span>{copied ? "Ссылка скопирована" : "Поделиться можно за 1 клик"}</span>
      </div>
    </div>
  );
}
