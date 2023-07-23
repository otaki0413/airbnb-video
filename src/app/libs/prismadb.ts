// Prismaが生成したデータベースモデルを操作するための機能を提供する
import { PrismaClient } from "@prisma/client";

/**
 * globalThisオブジェクトにprisma変数を追加する
 * Prismaクライアントのインスタンスを保持するために使用する
 */
declare global {
  var prisma: PrismaClient | undefined;
}

// globalThis.prismaがすでに存在する場合は再利用、存在しない場合はインスタンスを新規作成
const client = globalThis.prisma || new PrismaClient();

// Node.jsの環境が開発モードの場合、Prismaクライアントをグローバルにアクセス可能
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}

/**
 * Prismaクライアントは、clientのimport先で初めて使用される際に初期化が行われる。
 * その後、アプリケーション内の他の場所からも同じPrismaクライアントのインスタンスが共有されることになります。
 * → アプリケーション全体で唯一のPrismaクライアントが使用されることになり、データベース接続のオーバーヘッドを削減することが可能になる。
 * → シングルトンパターンと呼ばれるこのアプローチは、Prismaクライアントの推奨される使用方法である。
 */
export default client;
