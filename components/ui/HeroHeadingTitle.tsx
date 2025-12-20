import { type ReactNode } from "react";

import { cn } from "@/lib/utils";
import Heading from "./Heading";

type HeroHeadingTitleProps = {
  children: ReactNode;
  className?: string;
};

export default function HeroHeadingTitle({ children, className }: HeroHeadingTitleProps) {
  return (
    <Heading level={1} color="soft" className={cn("text-mobile-hero md:text-5xl", className)}>
      {children}
    </Heading>
  );
}
