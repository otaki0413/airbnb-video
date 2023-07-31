import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { ClientOnly } from "@/app/_components/ClientOnly";
import { Navbar } from "@/app/_components/navbar/Navbar";

import "./globals.css";

import { LoginModal } from "@/app/_components/modals/LoginModal";
import { RegisterModal } from "@/app/_components/modals/RegisterModal";
import { RentModal } from "@/app/_components/modals/RentModal";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { ToasterProvider } from "@/app/providers/ToasterProvider";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone built with Next.js",
};

// フォントの指定
const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // カレントユーザーの取得
  const currentUser = await getCurrentUser();

  return (
    <html lang="ja">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
