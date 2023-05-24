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

const SideMenu = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const sideMenu = useSideMenu();

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
        className={`md:hidden fixed inset-0 max-h-screen z-[0] bg-black/50 transition-opacity duration-300
        ${sideMenu.isOpen ? "block" : "hidden"}
        `}
      ></div>
      <motion.div
        variants={SideMenu_animation}
        animate={sideMenu.isOpen ? "open" : "close"}
        className="w-[16rem] max-w-[16rem] h-screen shadow-md pt-20 md:relative fixed bg-neutral-50 overflow-hidden text-neutral-800"
      >
        <div className="flex flex-col justify-between h-full">
          <ProfileMenu name="Andreas Panjaitan" position="Motion Graphic" />

          {/* Main Menu */}
          <div className="flex flex-col h-full">
            <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col font-medium overflow-x-hidden gap-1">
              <li>
                <ButtonSidebar
                  label="Beranda"
                  icon={AiOutlineHome}
                  onClick={() => {}}
                  active
                />
              </li>
              <li>
                <ButtonSidebar
                  label="Laporanku"
                  icon={AiOutlinePaperClip}
                  onClick={() => {}}
                />
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col font-medium overflow-x-hidden gap-1">
              {/* Pengaturan */}
              <hr className="mt-8" />
              <li>
                <ButtonSidebar
                  label="Pengaturan"
                  icon={AiOutlineSetting}
                  onClick={() => {}}
                />
              </li>
              <li>
                <ButtonSidebar
                  label="Keluar"
                  icon={AiOutlineLogout}
                  onClick={() => {}}
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
