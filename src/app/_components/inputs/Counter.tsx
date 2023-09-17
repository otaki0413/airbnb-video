"use client";

import { FC, useCallback } from "react";

import clsx from "clsx";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type CounterProps = {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
};

// カウンタ用のコンポーネント
export const Counter: FC<CounterProps> = ({ title, subtitle, value, onChange }) => {
  // 加算用
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  // 減算用
  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className={clsx(
            "w-10 h-10 rounded-full border",
            "flex items-center justify-center",
            "text-neutral-600 border-neutral-600 hover:opacity-80 transition cursor-pointer",
          )}
        >
          <AiOutlineMinus />
        </div>
        <div className="text-xl font-light text-neutral-600">{value}</div>
        <div
          onClick={onAdd}
          className={clsx(
            "w-10 h-10 rounded-full border",
            "flex items-center justify-center",
            "text-neutral-600 border-neutral-600 hover:opacity-80 transition cursor-pointer",
          )}
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};
