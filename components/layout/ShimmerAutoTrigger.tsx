"use client";

import { useEffect } from "react";

export default function ShimmerAutoTrigger() {
  useEffect(() => {
    const button = document.querySelector<HTMLElement>(".btn-shimmer");

    if (!button) {
      return undefined;
    }

    let hideTimer: number | undefined;

    const showTimer = window.setTimeout(() => {
      button.classList.add("auto-shimmer");

      hideTimer = window.setTimeout(() => {
        button.classList.remove("auto-shimmer");
      }, 1600);
    }, 1500);

    return () => {
      window.clearTimeout(showTimer);

      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }

      button.classList.remove("auto-shimmer");
    };
  }, []);

  return null;
}
