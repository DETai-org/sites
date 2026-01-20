"use client";

import { useState } from "react";

import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
  const [isDetOpen, setIsDetOpen] = useState(false);

  return (
    <header className="w-full border-b border-accentVar/30 bg-bg text-fg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="text-lg font-serif font-semibold tracking-tight">DETai</div>
        <nav className="flex max-w-full flex-wrap items-center gap-3 text-xs font-sans font-medium sm:gap-4 sm:text-sm">
          <a className="hover:text-accentVar" href="/">
            Главная
          </a>
          <a className="hover:text-accentVar" href="/detai/projects">
            Проекты
          </a>
          <div className="relative flex items-center gap-1">
            <a className="hover:text-accentVar" href="/det">
              DET
            </a>
            <button
              aria-expanded={isDetOpen}
              aria-label="Показать меню DET"
              className="flex h-6 w-6 items-center justify-center rounded-full text-accentVar/80 transition hover:text-accentVar focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentVar/60"
              type="button"
              onClick={() => setIsDetOpen((prev) => !prev)}
            >
              <svg
                aria-hidden="true"
                className={`h-3.5 w-3.5 transition ${isDetOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {isDetOpen ? (
              <div className="absolute left-0 top-full z-20 mt-2 w-56 rounded-2xl border border-accentVar/20 bg-bg p-2 text-xs shadow-[0_12px_32px_-12px_rgba(15,23,42,0.35)] sm:text-sm">
                <a
                  className="block rounded-xl px-3 py-2 transition hover:bg-accentVar/10 hover:text-accentVar"
                  href="/det/concept"
                >
                  Концепция DET
                </a>
                <a
                  className="block rounded-xl px-3 py-2 transition hover:bg-accentVar/10 hover:text-accentVar"
                  href="/det/logo"
                >
                  Смысл логотипа
                </a>
              </div>
            ) : null}
          </div>
          <a className="hover:text-accentVar" href="/ru/blog">
            Наш блог
          </a>
          <a className="hover:text-accentVar" href="/colors">
            Палитра
          </a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
