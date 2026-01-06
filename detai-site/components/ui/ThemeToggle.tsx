"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

type ThemeOption = "light" | "dark";

const themeLabels: Record<ThemeOption, string> = {
  light: "СВЕТ",
  dark: "ТЕНЬ",
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
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[color:rgb(var(--soft-border)/0.2)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-fg transition-colors duration-200 hover:border-accentVar/60 hover:text-accentVar sm:text-sm",
        className,
      )}
    >
      ТЕМА: {themeLabels[currentTheme]}
    </button>
  );
}
