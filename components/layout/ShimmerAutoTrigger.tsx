"use client";

import { useEffect } from "react";

export default function ShimmerAutoTrigger() {
  useEffect(() => {
    const heroSection = document.getElementById("hero");

    const buttons = Array.from(document.querySelectorAll<HTMLElement>(".btn-shimmer"));

    if (!buttons.length) {
      return undefined;
    }

    const timers = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const shimmerDelay = heroSection?.contains(target) ? 13000 : 3000;

          if (entry.isIntersecting) {
            const timer = window.setTimeout(() => {
              target.classList.add("auto-shimmer");
            }, shimmerDelay);

            timers.set(target, timer);
            return;
          }

          const timer = timers.get(target);

          if (timer) {
            window.clearTimeout(timer);
            timers.delete(target);
          }

          target.classList.remove("auto-shimmer");
        });
      },
      { threshold: 0.5 },
    );

    buttons.forEach((button) => observer.observe(button));

    return () => {
      observer.disconnect();

      timers.forEach((timer) => window.clearTimeout(timer));
      buttons.forEach((button) => button.classList.remove("auto-shimmer"));
    };
  }, []);

  return null;
}
