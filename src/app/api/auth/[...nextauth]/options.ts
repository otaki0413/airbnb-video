import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/app/libs/prismadb";

export const options: NextAuthOptions = {
  // NextAuthとPrismaの接続用アダプターの設定
  adapter: PrismaAdapter(prisma),
  // 認証プロバイダーの設定
  providers: [
    // GitHub認証プロバイダーの設定
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // Google認証プロバイダーの設定
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // メールとパスワードを使用した認証プロバイダーの設定
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      // 認証処理
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        // emailが一致するユーザーを取得
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // ユーザーの存在チェックとハッシュパスワードの検証
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        // パスワードの検証
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        // userオブジェクトを返す
        return user;
      },
    }),
  ],
  // カスタムページの設定
  pages: {
    signIn: "/", // カスタムサインインページのパス
  },
  // デバッグモードの設定(開発環境のみ)
  debug: process.env.NODE_ENV === "development",
  // セッションの設定
  session: {
    // JWT(JSON Web Token)を使用してセッション署名を行う
    strategy: "jwt",
  },
  // セッションのJWT署名に使用する秘密鍵
  secret: process.env.NEXTAUTH_SECRET,
};
