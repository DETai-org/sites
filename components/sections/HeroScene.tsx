"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import AnimatedLogo from "../visual/AnimatedLogo";
import CanvasGlobalParticlesLayer from "../visual/CanvasGlobalParticlesLayer";
import CanvasLocalParticlesLayer from "../visual/CanvasLocalParticlesLayer";

import { cn } from "@/lib/utils";

type HeroSceneProps = {
  children?: ReactNode;
  className?: string;
  logoSize?: number | string;
};

export default function HeroScene({ children, className, logoSize = "24rem" }: HeroSceneProps) {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [isMobileViewport, setIsMobileViewport] = useState<boolean | null>(null);
  const [isCoarsePointer, setIsCoarsePointer] = useState<boolean | null>(null);
  const [hasTouchSupport, setHasTouchSupport] = useState<boolean | null>(null);
  const [isMobileUserAgent, setIsMobileUserAgent] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mobileMediaQuery = typeof window.matchMedia === "function"
      ? window.matchMedia("(max-width: 767px)")
      : null;
    const coarsePointerMediaQuery = typeof window.matchMedia === "function"
      ? window.matchMedia("(pointer: coarse)")
      : null;

    const handleMobileChange = (event: MediaQueryListEvent) => setIsMobileViewport(event.matches);
    const handlePointerChange = (event: MediaQueryListEvent) => setIsCoarsePointer(event.matches);

    const navigatorUAData =
      typeof navigator !== "undefined"
        ? (navigator as Navigator & { userAgentData?: { mobile?: boolean } }).userAgentData
        : undefined;

    setHasTouchSupport(typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
    setIsMobileUserAgent(navigatorUAData ? navigatorUAData.mobile === true : null);
    setIsMobileViewport(
      mobileMediaQuery?.matches ?? (typeof window.innerWidth === "number" ? window.innerWidth <= 767 : null),
    );
    setIsCoarsePointer(coarsePointerMediaQuery?.matches ?? null);

    mobileMediaQuery?.addEventListener("change", handleMobileChange);
    coarsePointerMediaQuery?.addEventListener("change", handlePointerChange);

    return () => {
      mobileMediaQuery?.removeEventListener("change", handleMobileChange);
      coarsePointerMediaQuery?.removeEventListener("change", handlePointerChange);
    };
  }, []);

  const isMobileDevice =
    hasTouchSupport === true ||
    isMobileUserAgent === true ||
    isCoarsePointer === true ||
    isMobileViewport === true;

  const hasNonMobileSignals =
    hasTouchSupport === false ||
    isMobileUserAgent === false ||
    isCoarsePointer === false ||
    isMobileViewport === false;

  const shouldRenderGlobalLayer = hasNonMobileSignals && !isMobileDevice;

  return (
    <div
      ref={sceneRef}
      className={cn("relative flex items-center justify-center w-full h-full min-h-[18rem]", className)}
    >
      {shouldRenderGlobalLayer && <CanvasGlobalParticlesLayer anchorRef={sceneRef} />}
      <CanvasLocalParticlesLayer />
      {children ?? <AnimatedLogo size={logoSize} className="max-h-[28rem] max-w-[28rem]" />}
    </div>
  );
}
