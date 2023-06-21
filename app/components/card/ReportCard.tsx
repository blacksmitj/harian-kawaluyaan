"use client";

import { IoLocationOutline } from "react-icons/io5";
import Avatar from "../Avatar";
import { Report, User } from "@prisma/client";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import SeenButton from "../SeenButton";
import { useRouter } from "next/navigation";
import {
  BiFirstPage,
  BiHorizontalLeft,
  BiHorizontalRight,
  BiLastPage,
} from "react-icons/bi";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { AiOutlineMobile } from "react-icons/ai";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";

export interface ReportCardProps {
  data: Report & {
    user: User;
  };
  currentUser?: User;
}

const ReportCard: React.FC<ReportCardProps> = ({ data, currentUser }) => {
  const router = useRouter();
  return (
    <div className="bg-white w-full min-w-[300px] flex flex-col p-4 rounded-2xl shadow-lg shadow-darker/5 border-[1px] border-emerald-600/10 gap-4">
      {/* User Section */}
      <div className="flex flex-row gap-4 items-center">
        <Avatar
          src={
            data.user.image ||
            `https://api.dicebear.com/6.x/big-smile/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=` +
              data.user.name
          }
          size={55}
        />
        <div className="flex flex-col">
          <span
            onClick={() => router.push(`dashboard/profile/${data.userId}`)}
            className="text-md font-bold hover:text-accent cursor-pointer group duration-300"
          >
            {data.user.name}
          </span>
          <span className="text-xs font-light">
            {format(data.createdAt, "cccc, dd MMMM yyyy - p", {
              locale: id,
            }) || "Tanggal tidak ditemukan"}
          </span>
        </div>
      </div>
      {/* Point Section */}
      <div className="flex flex-row gap-3 justify-between">
        <div className="flex flex-col bg-white justify-between w-full rounded-lg p-3 border-[1px] border-accent/20">
          <div className="font-light text-xs md:text-sm flex flex-col gap-1 mb-2">
            <div className="p-1 bg-primary/70 rounded-full text-white w-fit">
              <HiOutlineSquare3Stack3D size={16} />
            </div>
            <p>Total</p>
          </div>
          <p className="font-extrabold text-xl md:text-3xl">
            {data.ended - data.started}
          </p>
        </div>
        <div className="flex flex-col bg-white justify-between w-full rounded-lg p-3 border-[1px] border-accent/20">
          <div className="font-light text-xs md:text-sm flex flex-col gap-1 mb-2">
            <div className="p-1 bg-primary/70 rounded-full text-white w-fit">
              <AiOutlineMobile size={16} />
            </div>
            <p>eSamsat</p>
          </div>
          <p className="font-extrabold text-xl md:text-3xl ">{data.eSamsat}</p>
        </div>
        <div className="flex flex-col bg-red-50 justify-between w-full rounded-lg p-3 border-[1px] border-red-800/10">
          <div className="font-light text-xs md:text-sm flex flex-col gap-1 mb-2">
            <div className="p-1 bg-red-800/60 text-white rounded-full w-fit">
              <BsArrowCounterclockwise size={16} />
            </div>
            <p className="text-red-800">Batal</p>
          </div>
          <p className="font-extrabold text-xl md:text-3xl text-red-800">
            {data.canceled}
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <div className="flex flex-col w-full align-middle border-[1px] border-accent/20 rounded-lg">
          <div className="flex flex-row items-center gap-2 text-darker/60 bg-primary/5 rounded-t-md px-2 py-1.5">
            <BiHorizontalLeft size={20} />
            <p className="text-xs">Awal</p>
          </div>
          <p className="text-xl font-extrabold px-2 py-1 rounded-b-md">
            {"0" + data.started}
          </p>
        </div>

        <div className="flex flex-col w-full align-middle border-[1px] border-accent/20 rounded-lg">
          <div className="flex flex-row items-center gap-2 text-darker/60 bg-primary/5 rounded-t-md px-2 py-1.5">
            <BiHorizontalRight size={20} />
            <p className="text-xs">Akhir</p>
          </div>
          <p className="text-xl font-extrabold px-2 py-1 rounded-b-md">
            {"0" + data.ended}
          </p>
        </div>
      </div>
      {/* Footer Section */}
      <div className="flex flex-row justify-between items-center">
        <span className="text-xs flex gap-1 items-center">
          <IoLocationOutline size={16} />
          {data.place + " " + data.location}
        </span>
        <div className="text-xs">
          <SeenButton data={data} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
