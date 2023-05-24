"use client";

import { IoLocationOutline } from "react-icons/io5";
import Avatar from "../Avatar";
import { AiOutlineEye } from "react-icons/ai";

const ReportCard = () => {
  return (
    <div className="bg-white w-full flex flex-col p-4 rounded-2xl gap-1">
      {/* User Section */}
      <div className="flex flex-row gap-4 items-center">
        <Avatar size={55} />
        <div className="flex flex-col">
          <span className="text-md font-bold">Andri Andreas Panjaitan</span>
          <span className="text-xs font-light">Laporan, 29 April 2023</span>
        </div>
      </div>
      {/* Point Section */}
      <div className="flex flex-row justify-between gap-4 my-4">
        <div className="bg-white shadow-primary/5 shadow-md border-l-4 border-[#0D7D27]/20 w-full text-center flex flex-col py-4 rounded-md">
          <span className="font-bold text-2xl">69</span>
          <span className="font-light text-xs">Total</span>
        </div>
        <div className="bg-white shadow-primary/5 shadow-md border-l-4 border-[#29AAE2]/20 w-full text-center flex flex-col py-4 rounded-md">
          <span className="font-bold text-2xl">02</span>
          <span className="font-light text-xs">E-Samsat</span>
        </div>
        <div className="bg-white shadow-primary/5 shadow-md border-l-4 border-[#E22029]/20 w-full text-center flex flex-col py-4 rounded-md">
          <span className="font-bold text-2xl">02</span>
          <span className="font-light text-xs">Batal</span>
        </div>
      </div>
      {/* Footer Section */}
      <div className="flex flex-row justify-between items-center">
        <span className="text-xs flex gap-1 items-center">
          <IoLocationOutline size={16} />
          Samling 1 Supratman
        </span>
        <div className="text-xs">
          <button className="rounded-xl py-1 px-4 flex justify-center items-center gap-2 bg-neutral-50 hover:bg-accent hover:text-white text-darker">
            <AiOutlineEye size={20} />
            Lihat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
