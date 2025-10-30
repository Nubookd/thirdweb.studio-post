import React from "react";
import Logo from "./Logo";
import HeaderNav from "./HeaderNav";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-[24] py-[5]">
      <Logo />
      <HeaderNav />
      <HeaderMenu />
    </header>
  );
}
