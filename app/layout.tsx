import "../styles/globals.css";
import type { ReactNode } from "react";
import type { Viewport } from "next";
import { Great_Vibes, Lora, Open_Sans } from "next/font/google";

import ShimmerAutoTrigger from "@/components/layout/ShimmerAutoTrigger";
import Providers from "./providers";

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

const greatVibes = Great_Vibes({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata = {
  title: "DETai Site",
  description: "Dialectical Existential Therapy and DETai ecosystem",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${openSans.variable} ${lora.variable} ${greatVibes.variable} overflow-x-hidden font-sans antialiased`}
      >
        <Providers>
          <ShimmerAutoTrigger />
          {children}
        </Providers>
      </body>
    </html>
  );
}
