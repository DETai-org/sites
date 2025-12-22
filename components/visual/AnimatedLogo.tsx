"use client";

import Lottie from "lottie-react";
import clsx from "clsx";
import { useMemo, useState } from "react";

import introAnimationData from "@/public/assets/animations/logo_intro.json";
import pulseAnimationData from "@/public/assets/animations/logo_pulse.json";
import CanvasPulseLightLayer from "./CanvasPulseLightLayer";

type AnimatedLogoProps = {
  className?: string;
  size?: number | string;
  colorOverride?: [number, number, number] | [number, number, number, number];
};

function overrideLottieColors(
  animationData: unknown,
  colorOverride: AnimatedLogoProps["colorOverride"],
) {
  if (!colorOverride) return animationData;

  const targetColor: [number, number, number, number] = [
    colorOverride[0],
    colorOverride[1],
    colorOverride[2],
    colorOverride[3] ?? 1,
  ];

  const cloned = structuredClone(animationData);

  const walk = (node: unknown) => {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    if (node && typeof node === "object") {
      Object.entries(node as Record<string, unknown>).forEach(([key, value]) => {
        if (key === "c" && value && typeof value === "object") {
          const colorNode = value as { k?: unknown };

          if (Array.isArray(colorNode.k) && colorNode.k.length >= 3) {
            const [r, g, b, a] = colorNode.k;

            if ([r, g, b].every((channel) => typeof channel === "number")) {
              colorNode.k = [
                targetColor[0],
                targetColor[1],
                targetColor[2],
                typeof a === "number" ? a : targetColor[3],
              ];
            }
          }
        }

        walk(value);
      });
    }
  };

  walk(cloned);

  return cloned;
}

export default function AnimatedLogo({ className, size, colorOverride }: AnimatedLogoProps) {
  const [isPulseVisible, setIsPulseVisible] = useState(false);

  const introData = useMemo(
    () => overrideLottieColors(introAnimationData, colorOverride),
    [colorOverride],
  );

  const pulseData = useMemo(
    () => overrideLottieColors(pulseAnimationData, colorOverride),
    [colorOverride],
  );

  const sharedStyle = size ? { height: size, width: size } : undefined;
  const containerClassName = clsx("relative", !size && "h-48 w-48", className);

  return (
    <div className={containerClassName} style={sharedStyle}>
      {!isPulseVisible && (
        <Lottie
          animationData={introData}
          loop={false}
          autoplay
          className="h-full w-full"
          onComplete={() => setIsPulseVisible(true)}
        />
      )}

      {isPulseVisible && (
        <>
          <CanvasPulseLightLayer />
          <Lottie
            animationData={pulseData}
            loop
            autoplay
            className="absolute inset-0 h-full w-full"
          />
        </>
      )}
    </div>
  );
}
