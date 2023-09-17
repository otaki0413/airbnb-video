"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { FieldValues, useForm } from "react-hook-form";

import { Heading } from "@/app/_components/Heading";
import { CategoryInput } from "@/app/_components/inputs/CategoryInput";
import { CountrySelect } from "@/app/_components/inputs/CountrySelect";
import { Modal } from "@/app/_components/modals/Modal";
import { categories } from "@/app/_components/navbar/Categories";
import useRentModal from "@/app/hooks/useRentModal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

// レンタル用のモーダル
export const RentModal = () => {
  // ステップの状態を管理する
  const [step, setStep] = useState(STEPS.CATEGORY);
  // モーダルの状態を取得
  const rentModal = useRentModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    // 各フィールドのデフォルト値を設定する
    defaultValues: {
      category: "",
      location: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCOunt: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  // 各フィールドの値を監視する
  const category = watch("category");
  const location = watch("location");

  // 名前付きエクスポートを動的にインポートする
  // https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#importing-named-exports
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/_components/Map").then((module) => module.Map), {
        ssr: false,
      }),
    [location],
  );

  // 指定したフォームフィールドに値を設定する
  // id: フィールドのid (例: "email")
  // value: 設定する値
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true, // バリデーションを実行する
      shouldDirty: true, // フィールドが変更されたとみなす
      shouldTouch: true, // フィールドのフォーカスを外す
    });
  };

  // 前のステップに戻る処理
  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  // 次のステップに進む処理
  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const actionLabel = useMemo(() => {
    // 最後のステップの場合
    if (step === STEPS.PRICE) {
      return "Create";
    }
    // それ以外の場合
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    // 最初のステップの場合
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    // それ以外の場合
    return "Back";
  }, [step]);

  // モーダル内のコンテンツ
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Which of these best describes your places?" subtitle="Pick a category" />
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Where's your place located?" subtitle="Help guests find you" />
        <CountrySelect value={location} onChange={(value) => setCustomValue("location", value)} />
        <Map center={location?.latlng} />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  );
};
