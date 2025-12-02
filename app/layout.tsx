import "../styles/globals.css";
import type { ReactNode } from "react";

import ShimmerAutoTrigger from "@/components/layout/ShimmerAutoTrigger";

export const metadata = {
  title: "DETai Site",
  description: "Dialectical Existential Therapy and DETai ecosystem"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ShimmerAutoTrigger />
        {children}
      </body>
    </html>
  );
}
