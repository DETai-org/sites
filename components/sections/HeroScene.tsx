import { type ReactNode } from "react";

import AnimatedLogo from "../visual/AnimatedLogo";
import CanvasParticlesLayer from "../visual/CanvasParticlesLayer";

import { cn } from "@/lib/utils";

type HeroSceneProps = {
  children?: ReactNode;
  className?: string;
  logoSize?: number | string;
};

export default function HeroScene({ children, className, logoSize = "24rem" }: HeroSceneProps) {
  return (
    <div className={cn("relative flex items-center justify-center w-full h-full min-h-[18rem]", className)}>
      <CanvasParticlesLayer />
      {children ?? <AnimatedLogo size={logoSize} className="max-h-[28rem] max-w-[28rem]" />}
    </div>
  );
}
