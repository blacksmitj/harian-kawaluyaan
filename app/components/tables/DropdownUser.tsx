"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { User } from "@prisma/client";
import DeleteUser from "./DeleteUser";
import ChangePassword from "./ChangePassword";

interface DropdownUserProps {
  user: User;
}

const DropdownUser: React.FC<DropdownUserProps> = ({ user }) => (
  <div className="flex justify-center">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="text-darker hover:text-accent duration-300 p-2 focus:outline-none outline-none"
          aria-label="Action Options"
        >
          <BiDotsHorizontalRounded size={24} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[180px] bg-white rounded-md p-2 shadow-lg shadow-accent/20 will-change-[opacity, transform]"
          sideOffset={5}
          align={"end"}
        >
          <ChangePassword user={user} />
          <DeleteUser user={user} disabled={user.role === "ADMIN"} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  </div>
);

export default DropdownUser;
