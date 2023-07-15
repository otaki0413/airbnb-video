"use client";

import { FC } from "react";

type MenuItemProps = {
  onclick: () => void;
  label: string;
};

export const MenuItem: FC<MenuItemProps> = ({ onclick, label }) => {
  return (
    <div onClick={onclick} className="px-4 py-3 font-semibold transition hover:bg-neutral-100">
      {label}
    </div>
  );
};
