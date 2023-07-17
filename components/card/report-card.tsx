"use client";

import { IoLocationOutline } from "react-icons/io5";
import { Report, User } from "@prisma/client";
import SeenButton from "../SeenButton";
import { BiHorizontalLeft, BiHorizontalRight } from "react-icons/bi";
import { AiOutlineMobile } from "react-icons/ai";
import { TbReportAnalytics, TbReportOff } from "react-icons/tb";
import UserHead from "../user-head-section";
import Point from "../point";
import Nomoratur from "../nomoratur";

export interface ReportCardProps {
  data: Report & {
    user: User;
  };
  currentUser: User;
}

const ReportCard: React.FC<ReportCardProps> = ({ data, currentUser }) => {
  return (
    <div className="bg-white w-full min-w-[300px] flex flex-col p-4 rounded-2xl shadow-lg shadow-darker/5 border-[1px] border-emerald-600/10 gap-4">
      <UserHead
        image={data.user.image}
        name={data.user.name}
        userId={data.userId}
        createdAt={data.createdAt}
      />
      {/* Point Section */}
      <div className="flex flex-row gap-3 justify-between">
        <Point
          point="total"
          title="Total"
          ended={data.ended}
          started={data.started}
          icon={<TbReportAnalytics size={14} />}
        />
        <Point
          point="esamsat"
          title="eSamsat"
          eSamsat={data.eSamsat}
          icon={<AiOutlineMobile size={14} />}
        />
        <Point
          point="canceled"
          title="Batal"
          canceled={data.canceled}
          icon={<TbReportOff size={14} />}
        />
      </div>

      <div className="flex flex-row gap-2">
        <Nomoratur
          title="Awal"
          value={data.started}
          icon={<BiHorizontalLeft size={20} />}
        />
        <Nomoratur
          title="Akhir"
          value={data.ended}
          icon={<BiHorizontalRight size={20} />}
        />
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
