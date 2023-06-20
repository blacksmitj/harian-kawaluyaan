"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import SeeReport from "./SeeReport";
import DeleteReport from "./DeleteReport";
import { Report, User } from "@prisma/client";

interface DropdownReportProps {
  report: Report & { user: User };
  currentUser: User;
}

const DropdownReport: React.FC<DropdownReportProps> = ({
  report,
  currentUser,
}) => (
  <div className="flex justify-center">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="text-darker hover:text-accent duration-300 p-2"
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
          <DropdownMenu.Item className="text-darker text-sm leading-none rounded-sm flex items-center h-12 px-1 pl-2 select-none outline-none data-[disabled]:text-neutral-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-primary data-[highlighted]:text-white duration-200">
            <SeeReport report={report} />
          </DropdownMenu.Item>
          <DropdownMenu.Item
            disabled={!currentUser.verifiedAccount}
            className="text-darker text-sm leading-none rounded-sm flex items-center h-12 px-1 pl-2 select-none outline-none data-[disabled]:text-neutral-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-primary data-[highlighted]:text-white duration-200"
          >
            <DeleteReport report={report} />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  </div>
);

export default DropdownReport;
