"use client";

import useSideMenu from "@/app/hooks/useSideMenu";
import {
  AiOutlinePaperClip,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import ButtonSidebar from "../ButtonSidebar";
import Toggle from "./Toggle";
import ProfileMenu from "../ProfileMenu";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { BiGroup } from "react-icons/bi";
import dynamic from "next/dynamic";
import { useState } from "react";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

interface SideMenuProps {
  currentUser?: User | null;
}

const SideMenu: React.FC<SideMenuProps> = ({ currentUser }) => {
  const [isTabletMid, setisTabletMid] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const sideMenu = useSideMenu();

  const handleMediaQueryChange = (matches: any) => {
    console.log("matches", matches);

    setisTabletMid(matches);
  };

  const isAdmin = () => {
    if (currentUser?.role !== "ADMIN") {
      return false;
    }
    return true;
  };

  const animation = () => {
    if (isTabletMid) {
      console.log("do tablet");

      if (sideMenu.isOpen) {
        return "translate-x-0 w-[16rem]";
      } else {
        return "-translate-x-[16rem] w-[16rem]";
      }
    } else {
      console.log("not tablet");
      if (sideMenu.isOpen) {
        return "translate-x-0 w-[16rem]";
      } else {
        return "translate-x-0 w-[4rem]";
      }
    }
  };

  return (
    <>
      <MediaQuery maxWidth={768} onChange={handleMediaQueryChange}></MediaQuery>

      <div
        onClick={sideMenu.onClose}
        className={`md:hidden fixed inset-0 h-screen bg-black/50 transition-opacity duration-300 z-[1]
        ${sideMenu.isOpen ? "block" : "hidden"}
        `}
      ></div>
      <div
        className={`max-w-[16rem] h-screen shadow-md pt-20 md:relative fixed bg-white overflow-hidden text-neutral-800 z-10 duration-300
        ${animation()}
        `}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="p-3">
            <ProfileMenu
              id={currentUser?.id}
              name={currentUser?.name}
              email={currentUser?.email}
              verified={currentUser?.verifiedAccount}
              src={
                currentUser?.image ||
                `https://api.dicebear.com/6.x/big-smile/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=` +
                  currentUser?.name
              }
            />
          </div>

          {/* Main Menu */}
          <div className="flex flex-col h-full">
            <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col font-medium overflow-x-hidden gap-1">
              <li>
                <ButtonSidebar
                  label="Beranda"
                  icon={AiOutlineHome}
                  onClick={() => router.push("/dashboard")}
                  active={pathname === "/dashboard" ? true : false}
                />
              </li>
              <li>
                <ButtonSidebar
                  label="Laporan"
                  icon={AiOutlinePaperClip}
                  onClick={() => router.push("/dashboard/reports")}
                  active={pathname === "/dashboard/reports" ? true : false}
                />
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col font-medium overflow-x-hidden gap-1">
              {/* ADMIN MENU */}
              <hr className="mt-8" />
              {isAdmin() && (
                <li>
                  <ButtonSidebar
                    label="Kelola User"
                    icon={BiGroup}
                    onClick={() => router.push("/dashboard/users")}
                    active={pathname === "/dashboard/users" ? true : false}
                  />
                </li>
              )}
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

          <Toggle />
        </div>
      </div>
    </>
  );
};

export default SideMenu;
