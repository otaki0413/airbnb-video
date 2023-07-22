"use client";

import { FC } from "react";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

// モーダル内の入力用コンポーネント
export const Input: FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      {formatPrice ? <BiDollar /> : null}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder="　"
        type={type}
        className={`peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${
          formatPrice ? "pl-9" : "pl-4"
        } ${errors[id] ? "border-rose-500 focus:border-rose-500" : "border-neutral-300 focus:border-black"}`}
      />
      <label
        className={`absolute top-5 -translate-y-3 text-base duration-150 ${
          formatPrice ? "left-9" : "left-4"
        } z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 ${
          errors[id] ? "text-rose-500" : "text-zinc-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
};
