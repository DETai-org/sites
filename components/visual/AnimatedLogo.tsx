"use client";

import Lottie from "lottie-react";
import clsx from "clsx";

import animationData from "@/public/assets/animations/logo.json";

type AnimatedLogoProps = {
  className?: string;
};

export default function AnimatedLogo({ className }: AnimatedLogoProps) {
  return (
    <div className={clsx("relative", className)}>
      <Lottie
        animationData={animationData}
        loop={false}
        autoplay
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{ preserveAspectRatio: "none" }}
      />
    </div>
  );
}
