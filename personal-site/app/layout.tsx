import type { ReactNode } from "react";
import Header from "../components/layout/Header";
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
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
