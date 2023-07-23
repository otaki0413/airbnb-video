import { NextResponse } from "next/server";

import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

// POST /api/register
export async function POST(request: Request) {
  // リクエストボディをJSONとしてパース
  const body = await request.json();

  const { email, name, password } = body;

  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash(password, 12);

  // ユーザーを作成
  const user = await prisma?.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
