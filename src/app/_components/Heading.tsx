"use client";

import { FC } from "react";

type HeadingProps = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

// モーダル内の見出し用コンポーネント
export const Heading: FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="mt-2 font-light text-neutral-500">{subtitle}</div>
    </div>
  );
};
