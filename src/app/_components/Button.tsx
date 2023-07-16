"use client";

import { FC, MouseEvent } from "react";

import { IconType } from "react-icons";

type ButtonProps = {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

export const Button: FC<ButtonProps> = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 ${
        outline ? "border-black bg-white text-black" : "border-rose-500 bg-rose-500 text-white"
      } ${small ? "border py-1 text-sm font-light" : "border-2 py-3 text-base font-semibold"}`}
    >
      {Icon && <Icon className="absolute left-4 top-3" size={24} />}
      {label}
    </button>
  );
};
