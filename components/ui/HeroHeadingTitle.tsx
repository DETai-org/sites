import { type ReactNode } from "react";

import Heading from "./Heading";

type HeroHeadingTitleProps = {
  children: ReactNode;
  className?: string;
};

export default function HeroHeadingTitle({ children, className }: HeroHeadingTitleProps) {
  return (
    <Heading level={1} variant="hero" color="soft" className={className}>
      {children}
    </Heading>
  );
}
