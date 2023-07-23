/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true, // Reactの厳格モードを有効
  poweredByHeader: false, // X-Powered-Byヘッダーをレスポンスから完全に削除、サーバーサイドの情報を隠す
  experimental: { typedRoutes: true }, // 静的型付けリンクのサポート有効
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"], // 画像のドメインを指定
  },
};

export default config;
