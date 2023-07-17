"use client";

import {
  AiOutlinePaperClip,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineInbox,
} from "react-icons/ai";
import ButtonSidebar from "../ButtonSidebar";
import Toggle from "./Toggle";
import ProfileMenu from "../ProfileMenu";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { BiGroup } from "react-icons/bi";
import useSideMenu from "@/hooks/useSideMenu";

interface SideMenuProps {
  currentUser?: User | null;
}

const SideMenu: React.FC<SideMenuProps> = ({ currentUser }) => {
  const pathname = usePathname();
  const router = useRouter();
  const sideMenu = useSideMenu();

  const animation = () => {
    if (sideMenu.isOpen) {
      return "translate-x-0 w-[16rem]";
    } else {
      return "-translate-x-[16rem] md:translate-x-0 md:w-[4rem] w-[16rem]";
    }
  };

  return (
    <>
      <div
        onClick={sideMenu.onClose}
        className={`md:hidden fixed inset-0 h-screen bg-black/50 z-[2]
        ${sideMenu.isOpen ? "block" : "hidden"}
        `}
      ></div>
      <div
        className={`max-w-[16rem] h-screen shadow-md pt-20 md:relative fixed bg-white  text-neutral-800 z-10 duration-300
        ${animation()}
        `}
      >
        <div className="flex flex-col justify-between h-full">
          <Toggle />
          <ProfileMenu
            id={currentUser?.id}
            name={currentUser?.name}
            email={currentUser?.email}
            verified={currentUser?.verifiedAccount}
            src={
              currentUser?.image ||
              process.env.NEXT_PUBLIC_API_DICEBAR! + currentUser?.name
            }
          />
          {/* Main Menu */}
          <div className="flex flex-col h-full">
            <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col font-medium overflow-x-hidden gap-1">
              <li>
                <ButtonSidebar
                  label="Beranda"
                  icon={AiOutlineHome}
                  onClick={() => router.push("/")}
                  active={pathname === "/" ? true : false}
                />
              </li>
              <li>
                <ButtonSidebar
                  label="Laporanku"
                  icon={AiOutlinePaperClip}
                  onClick={() => router.push("/reports")}
                  active={pathname === "/reports" ? true : false}
                />
              </li>
              {currentUser?.role === "ADMIN" && (
                <>
                  <hr className="my-4" />
                  <li>
                    <ButtonSidebar
                      label="Laporan Admin"
                      icon={AiOutlineInbox}
                      onClick={() => router.push("/allreports")}
                      active={pathname === "/allreports" ? true : false}
                    />
                  </li>
                  <li>
                    <ButtonSidebar
                      label="Kelola Admin"
                      icon={BiGroup}
                      onClick={() => router.push("/users")}
                      active={pathname === "/users" ? true : false}
                    />
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="flex flex-col mb-12">
            <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col font-medium overflow-x-hidden gap-1">
              <li>
                <ButtonSidebar
                  label="Keluar"
                  icon={AiOutlineLogout}
                  onClick={() => {
                    signOut();
                  }}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
