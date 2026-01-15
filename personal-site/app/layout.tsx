import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Personal Site",
  description: "Минимальный каркас для personal-site"
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return children;
}
