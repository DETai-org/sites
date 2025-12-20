import "../styles/globals.css";
import type { ReactNode } from "react";
import { Lora } from "next/font/google";

import ShimmerAutoTrigger from "@/components/layout/ShimmerAutoTrigger";

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata = {
  title: "DETai Site",
  description: "Dialectical Existential Therapy and DETai ecosystem",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body
        className={`${lora.variable} overflow-x-hidden bg-basic-light text-basic-dark antialiased font-serif`}
      >
        <ShimmerAutoTrigger />
        {children}
      </body>
    </html>
  );
}
