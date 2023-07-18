import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { ClientOnly } from "@/app/_components/ClientOnly";
import { Navbar } from "@/app/_components/navbar/Navbar";

import "./globals.css";

import { RegisterModal } from "@/app/_components/modals/RegisterModal";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone built with Next.js",
};

// フォントの指定
const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={font.className}>
        <ClientOnly>
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
