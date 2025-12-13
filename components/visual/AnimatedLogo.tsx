"use client";

import Lottie from "lottie-react";
import clsx from "clsx";
import { useState } from "react";

import introAnimationData from "@/public/assets/animations/logo_intro.json";
import pulseAnimationData from "@/public/assets/animations/logo_pulse.json";

type AnimatedLogoProps = {
  className?: string;
  size?: number | string;
};

export default function AnimatedLogo({ className, size }: AnimatedLogoProps) {
  const [isPulseVisible, setIsPulseVisible] = useState(false);

  const sharedStyle = size ? { height: size, width: size } : undefined;

  return (
    <div className={clsx("relative h-48 w-48", className)} style={sharedStyle}>
      {!isPulseVisible && (
        <Lottie
          animationData={introAnimationData}
          loop={false}
          autoplay
          className="h-full w-full"
          onComplete={() => setIsPulseVisible(true)}
        />
      )}

      {isPulseVisible && (
        <Lottie
          animationData={pulseAnimationData}
          loop
          autoplay
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
