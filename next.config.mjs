/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true, // Reactの厳格モードを有効
  poweredByHeader: false, // X-Powered-Byヘッダーをレスポンスから完全に削除、サーバーサイドの情報を隠す
  experimental: { typedRoutes: true }, // 静的型付けリンクのサポート有効
};

export default config;
