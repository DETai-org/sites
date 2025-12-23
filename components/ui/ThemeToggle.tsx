"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

type ThemeOption = "light" | "dark" | "system";

const themeLabels: Record<ThemeOption, string> = {
  light: "Свет",
  dark: "Тень",
  system: "Система",
};

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = (theme ?? "light") as ThemeOption;

  const handleToggle = () => {
    const nextTheme: ThemeOption =
      currentTheme === "light" ? "dark" : currentTheme === "dark" ? "system" : "light";
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text transition-colors duration-200 hover:border-accent/60 hover:text-accent sm:text-sm",
        className,
      )}
    >
      Тема: {themeLabels[currentTheme]}
    </button>
  );
}
