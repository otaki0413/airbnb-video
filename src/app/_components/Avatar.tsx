"use client";

import { FC } from "react";
import Image from "next/image";

type AvatarProps = {
  src?: string | null | undefined;
};

export const Avatar: FC<AvatarProps> = ({ src }) => {
  return <Image className="rounded-full" height="30" width="30" alt="Avatar" src={src || "/images/placeholder.jpg"} />;
};
