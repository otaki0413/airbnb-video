"use client";

import { Container } from "@/app/_components/Container";
import { Logo } from "@/app/_components/navbar/Logo";
import { Search } from "@/app/_components/navbar/Search";
import { UserMenu } from "@/app/_components/navbar/UserMenu";

export const Navbar = () => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};
