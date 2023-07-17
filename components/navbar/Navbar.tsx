"use client";

import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="bg-white z-30 w-full fixed border-b">
      <Container>
        <div className="flex flex-row items-center justify-between min-h-[60px]">
          <Logo />
          <UserMenu />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
