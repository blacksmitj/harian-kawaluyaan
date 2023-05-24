"use client";

import useSideMenu from "@/app/hooks/useSideMenu";
import { AiOutlineMenu } from "react-icons/ai";

const UserMenu = () => {
  const sideMenu = useSideMenu();

  return (
    <div
      onClick={sideMenu.toggle}
      className="flex flex-row items-center gap-3 cursor-pointer py-1 px-2 rounded-md hover:bg-accent hover:text-white-prime transition text-darker"
    >
      <div className="md:block">
        <AiOutlineMenu size={20} />
      </div>
    </div>
  );
};

export default UserMenu;
