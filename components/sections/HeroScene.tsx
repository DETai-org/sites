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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div
      ref={sceneRef}
      className={cn("relative flex items-center justify-center w-full h-full min-h-[18rem]", className)}
    >
      {!isMobile && <CanvasGlobalParticlesLayer anchorRef={sceneRef} />}
      <CanvasLocalParticlesLayer />
      {children ?? <AnimatedLogo size={logoSize} className="max-h-[28rem] max-w-[28rem]" />}
    </div>
  );
}
