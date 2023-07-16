import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { ClientOnly } from "@/app/_components/ClientOnly";
import { Modal } from "@/app/_components/modals/Modal";
import { Navbar } from "@/app/_components/navbar/Navbar";

import "./globals.css";

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
          <Modal actionLabel="Submit" title="Hello World" isOpen />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
