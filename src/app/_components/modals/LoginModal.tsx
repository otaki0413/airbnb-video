"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/app/_components/Button";
import { Heading } from "@/app/_components/Heading";
import { Input } from "@/app/_components/inputs/Input";
import { Modal } from "@/app/_components/modals/Modal";
import useLoginModal from "@/app/hooks/useLoginModal";

// ログイン用のモーダル
export const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  // useFormの設定
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // ローディング状態にする
    setIsLoading(true);

    // ログイン処理
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      // ローディング状態を解除する
      setIsLoading(false);

      // ログイン成功時
      if (callback?.ok) {
        toast.success("Login in successfully!");
        // ページをリロードする
        router.refresh();
        loginModal.onClose();
      }

      // ログイン失敗時
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  // モーダル内のコンテンツ
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subtitle="Login to your account!" />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
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
          <div onClick={loginModal.onClose} className="cursor-pointer text-neutral-800 hover:underline">
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
