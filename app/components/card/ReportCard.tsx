"use client";

import { IoLocationOutline } from "react-icons/io5";
import Avatar from "../Avatar";
import { AiOutlineEye } from "react-icons/ai";
import { Report, User } from "@prisma/client";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import useReportModal from "@/app/hooks/useReportModal";
import { useCallback } from "react";

export interface ReportCardProps {
  data: Report & {
    user: User;
  };
}

const ReportCard: React.FC<ReportCardProps> = ({ data }) => {
  const reportModal = useReportModal();

  const onSee = useCallback(() => {
    reportModal.onOpen(),
      reportModal.setReport({
        ...data,
        listCanceled: JSON.parse(data.listCanceled),
      });
  }, [reportModal, data]);

  return (
    <div className="bg-white w-full min-w-[300px] flex flex-col p-4 rounded-2xl gap-1 shadow-lg shadow-darker/5 border-[1px] border-primary/10">
      {/* User Section */}
      <div className="flex flex-row gap-4 items-center">
        <Avatar
          src={
            data.user.image ||
            `https://api.dicebear.com/6.x/adventurer/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=` +
              data.user.name
          }
          size={55}
        />
        <div className="flex flex-col">
          <span className="text-md font-bold">{data.user.name}</span>
          <span className="text-xs font-light">
            {format(data.createdAt, "cccc, dd MMMM yyyy", { locale: id }) ||
              "Tanggal tidak ditemukan"}
          </span>
        </div>
      </div>
      {/* Point Section */}
      <div className="flex flex-row justify-between gap-4 my-4">
        <div className="bg-white shadow-primary/5 shadow-md border-l-4 border-[#0D7D27]/20 w-full text-center flex flex-col py-4 rounded-md">
          <span className="font-bold text-2xl">
            {data.ended - data.started + 1}
          </span>
          <span className="font-light text-xs">Total</span>
        </div>
        <div className="bg-white shadow-primary/5 shadow-md border-l-4 border-[#29AAE2]/20 w-full text-center flex flex-col py-4 rounded-md">
          <span className="font-bold text-2xl">{data.eSamsat}</span>
          <span className="font-light text-xs">E-Samsat</span>
        </div>
        <div className="bg-white shadow-primary/5 shadow-md border-l-4 border-[#E22029]/20 w-full text-center flex flex-col py-4 rounded-md">
          <span className="font-bold text-2xl">{data.canceled}</span>
          <span className="font-light text-xs">Batal</span>
        </div>
      </div>
      {/* Footer Section */}
      <div className="flex flex-row justify-between items-center">
        <span className="text-xs flex gap-1 items-center">
          <IoLocationOutline size={16} />
          {data.place + " " + data.location}
        </span>
        <div className="text-xs">
          <button
            onClick={onSee}
            className="rounded-xl py-1 px-4 flex justify-center items-center gap-2 bg-neutral-50 hover:bg-accent hover:text-white text-darker duration-300"
          >
            <AiOutlineEye size={20} />
            Lihat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
