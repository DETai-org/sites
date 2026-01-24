"use client";

import { useEffect, useMemo, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

type PostTocProps = {
  items: TocItem[];
  title: string;
};

export default function PostToc({ items, title }: PostTocProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const visibleItems = useMemo(() => items.filter((item) => item.text.trim().length > 0), [items]);

  useEffect(() => {
    if (!visibleItems.length) return;

    const headingElements = visibleItems
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!headingElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);

        if (!visible.length) return;

        const nearest = visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )[0];

        if (nearest?.target instanceof HTMLElement) {
          setActiveId(nearest.target.id);
        }
      },
      {
        rootMargin: "0px 0px -60% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [visibleItems]);

  if (!visibleItems.length) return null;

  return (
    <nav className="flex flex-col gap-4" aria-label={title}>
      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
        {title}
      </div>
      <div className="flex gap-4">
        <div className="w-px bg-[color:rgb(var(--soft-border)/0.6)]" aria-hidden="true" />
        <ul className="flex flex-col gap-3 text-sm text-muted">
          {visibleItems.map((item) => {
            const isActive = activeId === item.id;
            const baseClass =
              item.level === 3 ? "block pl-4 text-[0.85rem]" : "block text-[0.92rem]";
            const toneClass = isActive ? "text-fg" : "text-muted";

            return (
              <li key={item.id}>
                <a
                  className={`${baseClass} ${toneClass} transition-colors`}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    const target = document.getElementById(item.id);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
