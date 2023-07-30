"use client";

import { FC } from "react";

import { Container } from "@/app/_components/Container";
import { Categories } from "@/app/_components/navbar/Categories";
import { Logo } from "@/app/_components/navbar/Logo";
import { Search } from "@/app/_components/navbar/Search";
import { UserMenu } from "@/app/_components/navbar/UserMenu";
import { SafeUser } from "@/app/types";

type NavbarProps = {
  currentUser?: SafeUser | null;
};

export const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      {/* カテゴリー */}
      <Categories />
    </div>
  );
};
