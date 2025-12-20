import "../styles/globals.css";
import type { ReactNode } from "react";
import { Lora, Open_Sans } from "next/font/google";

import ShimmerAutoTrigger from "@/components/layout/ShimmerAutoTrigger";

const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

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
        className={`${openSans.variable} ${lora.variable} overflow-x-hidden font-sans text-basic-dark bg-basic-light antialiased`}
      >
        <ShimmerAutoTrigger />
        {children}
      </body>
    </html>
  );
}
