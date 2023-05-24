"use client";

import useSideMenu from "@/app/hooks/useSideMenu";
import { motion } from "framer-motion";
import { AiOutlineLeft } from "react-icons/ai";

const Toggle = () => {
  const sideMenu = useSideMenu();

  return (
    <div className="flex py-3 items-center justify-end">
      <motion.div
        animate={
          sideMenu.isOpen
            ? {
                rotate: 0,
              }
            : {
                rotate: 180,
              }
        }
        transition={{ duration: 0.2 }}
        className="w-fit h-fit bg-primary rounded-full p-1 text-white mr-5 hover:bg-accent hover:scale-95 cursor-pointer"
      >
        <AiOutlineLeft size={15} onClick={sideMenu.toggle} />
      </motion.div>
    </div>
  );
};

export default Toggle;
