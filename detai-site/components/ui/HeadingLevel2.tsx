import { type ReactNode } from "react";

import Heading from "./Heading";

type SectionHeadingColor = "basic" | "gold" | "soft";

type HeadingLevel2Props = {
  children: ReactNode;
  className?: string;
  color?: SectionHeadingColor;
};

export default function HeadingLevel2({ children, className, color = "basic" }: HeadingLevel2Props) {
  return (
    <Heading level={2} color={color} className={className}>
      {children}
    </Heading>
  );
}
