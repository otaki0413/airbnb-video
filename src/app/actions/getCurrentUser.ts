import { getServerSession } from "next-auth/next";

import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/libs/prismadb";

// セッションを取得する関数
export async function getSession() {
  return await getServerSession(options);
}

// カレントユーザーを取得する関数
export async function getCurrentUser() {
  try {
    const session = await getSession();

    // セッションが存在しない場合はnullを返す
    if (!session?.user?.email) {
      return null;
    }

    // emailが一致するユーザーを取得
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    // ユーザーが存在しない場合はnullを返す
    if (!currentUser) {
      return null;
    }

    // ユーザーのオブジェクトを返す
    return currentUser;
  } catch (error: any) {
    return null;
  }
}
