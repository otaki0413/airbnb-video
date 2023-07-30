"use client";

import { FC, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";
import { IconType } from "react-icons";

type CategoryBoxProps = {
  icon: IconType;
  label: string;
  selected?: boolean;
};

// カテゴリ表示ボックス用のコンポーネント
export const CategoryBox: FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  // URLのクエリ文字列を読み取るための、URLSearchParamsインターフェースを取得
  const searchParams = useSearchParams();

  // カテゴリボタンをクリック処理
  const handleClick = useCallback(() => {
    // 空のクエリを定義
    let currentQuery = {};

    // 現在のクエリパラメータ取得
    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    // クエリパラメータの更新
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // 現在のクエリパラメータと同じカテゴリをクリックした場合、カテゴリパラメータを削除
    if (searchParams?.get("category") === label) {
      delete updatedQuery.category;
    }

    // URL文字列の生成(nullのパラメータはスキップ)
    const url: any = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true },
    );

    // 生成したURLに遷移
    router.push(url);
  }, [label, searchParams, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800 ${
        selected ? "border-b-neutral-800 text-neutral-800 " : "border-transparent text-neutral-500"
      } `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};
