"use client";

import { FC, useCallback, useState } from "react";

import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";

import { Avatar } from "@/app/_components/Avatar";
import { MenuItem } from "@/app/_components/navbar/MenuItem";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from "@/app/types";

type UserMenuProps = {
  currentUser?: SafeUser | null;
};

export const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  // モーダルの開閉処理
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 hover:shadow-md md:block"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {/* ログイン・サインアップ用モーダル */}
      {isOpen ? (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem onclick={() => {}} label="My trips" />
                <MenuItem onclick={() => {}} label="My favorites" />
                <MenuItem onclick={() => {}} label="My reservations" />
                <MenuItem onclick={() => {}} label="My properties" />
                <MenuItem onclick={() => {}} label="Airbnb my home" />
                <hr />
                <MenuItem onclick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onclick={loginModal.onOpen} label="Login" />
                <MenuItem onclick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
