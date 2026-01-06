"use client";

import { useEffect, useState } from "react";

type DeviceSignalsState = {
  isMobileViewport: boolean | null;
  isCoarsePointer: boolean | null;
  hasTouchSupport: boolean | null;
  isMobileUserAgent: boolean | null;
};

type DeviceSignals = DeviceSignalsState & {
  isMobileDevice: boolean;
  hasNonMobileSignals: boolean;
};

const MOBILE_VIEWPORT_QUERY = "(max-width: 767px)";
const COARSE_POINTER_QUERY = "(pointer: coarse)";

export function useDeviceSignals(): DeviceSignals {
  const [signals, setSignals] = useState<DeviceSignalsState>({
    isMobileViewport: null,
    isCoarsePointer: null,
    hasTouchSupport: null,
    isMobileUserAgent: null,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mobileMediaQuery = typeof window.matchMedia === "function"
      ? window.matchMedia(MOBILE_VIEWPORT_QUERY)
      : null;
    const coarsePointerMediaQuery = typeof window.matchMedia === "function"
      ? window.matchMedia(COARSE_POINTER_QUERY)
      : null;

    const handleMobileChange = (event: MediaQueryListEvent) =>
      setSignals((current) => ({ ...current, isMobileViewport: event.matches }));

    const handlePointerChange = (event: MediaQueryListEvent) =>
      setSignals((current) => ({ ...current, isCoarsePointer: event.matches }));

    const navigatorUAData =
      typeof navigator !== "undefined"
        ? (navigator as Navigator & { userAgentData?: { mobile?: boolean } }).userAgentData
        : undefined;

    setSignals({
      hasTouchSupport: typeof navigator !== "undefined" && navigator.maxTouchPoints > 0,
      isMobileUserAgent: navigatorUAData ? navigatorUAData.mobile === true : null,
      isMobileViewport:
        mobileMediaQuery?.matches ?? (typeof window.innerWidth === "number" ? window.innerWidth <= 767 : null),
      isCoarsePointer: coarsePointerMediaQuery?.matches ?? null,
    });

    mobileMediaQuery?.addEventListener("change", handleMobileChange);
    coarsePointerMediaQuery?.addEventListener("change", handlePointerChange);

    return () => {
      mobileMediaQuery?.removeEventListener("change", handleMobileChange);
      coarsePointerMediaQuery?.removeEventListener("change", handlePointerChange);
    };
  }, []);

  const isMobileDevice =
    signals.hasTouchSupport === true ||
    signals.isMobileUserAgent === true ||
    signals.isCoarsePointer === true ||
    signals.isMobileViewport === true;

  const hasNonMobileSignals =
    signals.hasTouchSupport === false ||
    signals.isMobileUserAgent === false ||
    signals.isCoarsePointer === false ||
    signals.isMobileViewport === false;

  return { ...signals, isMobileDevice, hasNonMobileSignals };
}
