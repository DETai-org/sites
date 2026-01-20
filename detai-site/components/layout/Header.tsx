"use client";

import { useState } from "react";

import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
  const [isDetMenuOpen, setIsDetMenuOpen] = useState(false);

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
              type="button"
              aria-label="Показать разделы DET"
              aria-expanded={isDetMenuOpen}
              onClick={() => setIsDetMenuOpen((prev) => !prev)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-accentVar transition hover:bg-accentVar/10"
            >
              <svg
                viewBox="0 0 20 20"
                className={`h-3 w-3 transition-transform duration-200 ${isDetMenuOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <path d="M5 7.5L10 12.5L15 7.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            {isDetMenuOpen ? (
              <div className="absolute left-0 top-full z-10 mt-2 min-w-[220px] rounded-xl border border-border bg-surface p-2 shadow-lg">
                <a
                  className="flex w-full items-center rounded-lg px-3 py-2 text-xs font-medium text-fg transition hover:bg-accentVar/10"
                  href="/det/концепт"
                >
                  Концепция DET
                </a>
                <a
                  className="flex w-full items-center rounded-lg px-3 py-2 text-xs font-medium text-fg transition hover:bg-accentVar/10"
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
