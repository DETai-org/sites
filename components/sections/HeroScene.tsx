"use client";

import { type ReactNode, useRef } from "react";

import { useDeviceSignals } from "@/lib/hooks/useDeviceSignals";
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
  const { isMobileDevice, hasNonMobileSignals } = useDeviceSignals();

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
