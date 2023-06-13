"use client";

import useSideMenu from "@/app/hooks/useSideMenu";
import { motion } from "framer-motion";
import {
  AiOutlineSetting,
  AiOutlinePaperClip,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import ButtonSidebar from "../ButtonSidebar";
import Toggle from "./Toggle";
import ProfileMenu from "./ProfileMenu";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { BiGroup } from "react-icons/bi";

interface SideMenuProps {
  currentUser?: User | null;
}

const SideMenu: React.FC<SideMenuProps> = ({ currentUser }) => {
  const pathname = usePathname();
  const router = useRouter();
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const sideMenu = useSideMenu();
  const isAdmin = () => {
    if (currentUser?.role !== "ADMIN") {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (isTabletMid) {
      sideMenu.isOpen === false;
    } else {
      sideMenu.isOpen === true;
    }
  }, [isTabletMid, sideMenu]);

  const SideMenu_animation = isTabletMid
    ? {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        close: {
          width: 0,
          transition: {
            damping: 40,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        close: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <>
      <div
        onClick={sideMenu.onClose}
        className={`md:hidden fixed inset-0 h-screen bg-black/50 transition-opacity duration-300 z-[1]
        ${sideMenu.isOpen ? "block" : "hidden"}
        `}
      ></div>
      <motion.div
        variants={SideMenu_animation}
        animate={sideMenu.isOpen ? "open" : "close"}
        className="w-[16rem] max-w-[16rem] h-screen shadow-md pt-20 md:relative fixed bg-white overflow-hidden text-neutral-800 z-10"
      >
        <div className="flex flex-col justify-between h-full">
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
                    active={pathname === "/dashboard/settings" ? true : false}
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
      </motion.div>
    </>
  );
};

export default SideMenu;
