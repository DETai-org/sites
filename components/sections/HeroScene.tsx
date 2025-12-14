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

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia("(max-width: 767px)");
    const coarsePointerMediaQuery = window.matchMedia("(pointer: coarse)");

    const handleMobileChange = (event: MediaQueryListEvent) => setIsMobileViewport(event.matches);
    const handlePointerChange = (event: MediaQueryListEvent) => setIsCoarsePointer(event.matches);

    setIsMobileViewport(mobileMediaQuery.matches);
    setIsCoarsePointer(coarsePointerMediaQuery.matches);

    mobileMediaQuery.addEventListener("change", handleMobileChange);
    coarsePointerMediaQuery.addEventListener("change", handlePointerChange);

    return () => {
      mobileMediaQuery.removeEventListener("change", handleMobileChange);
      coarsePointerMediaQuery.removeEventListener("change", handlePointerChange);
    };
  }, []);

  const shouldRenderGlobalLayer = isMobileViewport === false && isCoarsePointer === false;

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
