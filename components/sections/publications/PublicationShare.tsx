"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { Copy, Link2, Send, X } from "lucide-react";

import { cn } from "@/lib/utils";

type PublicationShareProps = {
  title?: string;
  className?: string;
  compact?: boolean;
};

export default function PublicationShare({ title = "Поделиться публикацией", className, compact }: PublicationShareProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const finalUrl = shareUrl || (typeof window !== "undefined" ? window.location.href : "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    setShareUrl(window.location.href);
  }, []);

  const encodedUrl = useMemo(() => encodeURIComponent(finalUrl || ""), [finalUrl]);

  const handleCopy = async () => {
    const urlToCopy = finalUrl;

    if (!urlToCopy) return;

    try {
      await navigator.clipboard.writeText(urlToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (error) {
      console.error("Не удалось скопировать ссылку", error);
    }
  };

  const buttonBaseClasses =
    "inline-flex items-center gap-2 rounded-full border border-basic-dark/10 bg-white/80 px-3 py-2 text-sm font-semibold text-basic-dark shadow-sm transition-colors duration-200 hover:border-accent-primary/50 hover:text-accent-hover";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-basic-dark/10 bg-white/70 p-mobile-3 md:p-4",
        compact && "md:flex-row md:items-center md:justify-between",
        className,
      )}
    >
      {title ? <h3 className="text-base font-semibold text-basic-dark md:text-lg">{title}</h3> : null}

      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <button type="button" className={cn(buttonBaseClasses, "md:text-base")} onClick={handleCopy}>
          <Copy className="h-4 w-4" aria-hidden />
          Скопировать ссылку
        </button>

        <Link
          href={`https://x.com/intent/tweet?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonBaseClasses}
        >
          <X className="h-4 w-4" aria-hidden />
          X
        </Link>

        <Link
          href={`https://t.me/share/url?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonBaseClasses}
        >
          <Send className="h-4 w-4" aria-hidden />
          Telegram
        </Link>
      </div>

      <div className="flex items-center gap-2 text-xs text-basic-dark/70 md:text-mobile-small">
        <Link2 className="h-4 w-4" aria-hidden />
        <span>{copied ? "Ссылка скопирована" : "Поделиться можно за 1 клик"}</span>
      </div>
    </div>
  );
}
