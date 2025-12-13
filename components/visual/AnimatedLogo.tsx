"use client";

import Lottie from "lottie-react";
import clsx from "clsx";

import animationData from "@/public/assets/animations/logo.json";

type AnimatedLogoProps = {
  className?: string;
  size?: number | string;
};

export default function AnimatedLogo({ className, size }: AnimatedLogoProps) {
  return (
    <Lottie
      animationData={animationData}
      loop={false}
      autoplay
      className={clsx("h-48 w-48", className)}
      style={size ? { height: size, width: size } : undefined}
    />
  );
}
