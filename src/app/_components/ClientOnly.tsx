"use client";

import { FC, ReactNode, useEffect, useState } from "react";

type ClientOnlyProps = {
  children: ReactNode;
};

// クライアントサイドでのみ描画する
export const ClientOnly: FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  // マウント時にフラグを立てる
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // マウントされていない場合は何も描画しない
  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};
