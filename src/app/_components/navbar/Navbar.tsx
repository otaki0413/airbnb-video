"use client";

import { FC } from "react";

import { User } from "@prisma/client";

import { Container } from "@/app/_components/Container";
import { Logo } from "@/app/_components/navbar/Logo";
import { Search } from "@/app/_components/navbar/Search";
import { UserMenu } from "@/app/_components/navbar/UserMenu";

type NavbarProps = {
  currentUser?: User | null;
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
    </div>
  );
};
