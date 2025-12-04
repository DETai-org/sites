"use client";

import Lottie from "lottie-react";
import clsx from "clsx";

import animationData from "@/public/assets/animations/logo-detai.json";

type AnimatedLogoProps = {
  className?: string;
};

export default function AnimatedLogo({ className }: AnimatedLogoProps) {
  return <Lottie animationData={animationData} loop autoplay className={clsx("h-48 w-48", className)} />;
}
