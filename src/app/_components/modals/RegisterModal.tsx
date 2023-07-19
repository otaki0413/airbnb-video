"use client";

import { useCallback, useState } from "react";

import axios from "axios";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/app/_components/Button";
import { Heading } from "@/app/_components/Heading";
import { Input } from "@/app/_components/inputs/Input";
import { Modal } from "@/app/_components/modals/Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

// 登録用のモーダル
export const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // ローディング状態にする
    setIsLoading(true);

    // ユーザー登録処理
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((err) => {
        toast.error("Something went wrong.", { duration: 3000 });
      })
      .finally(() => {
        // ローディング状態を解除する
        setIsLoading(false);
      });
  };

  // モーダル内のコンテンツ
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  // モーダル内のフッターコンテンツ
  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}} />
      <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => {}} />
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div onClick={registerModal.onClose} className="cursor-pointer text-neutral-800 hover:underline">
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
