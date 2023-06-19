"use client";

import { SafeReport } from "@/app/types";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { AiOutlineMobile } from "react-icons/ai";
import {
  BiArrowToLeft,
  BiHorizontalLeft,
  BiHorizontalRight,
} from "react-icons/bi";
import {
  BsArrowCounterclockwise,
  BsBackspace,
  BsBoxArrowInLeft,
  BsBoxArrowLeft,
  BsCalendarDate,
  BsJournalBookmark,
  BsSkipEndBtn,
  BsSkipStartBtn,
} from "react-icons/bs";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { ImCancelCircle } from "react-icons/im";
import { IoLocationOutline, IoReturnUpBack } from "react-icons/io5";
import {
  MdBackHand,
  MdBackspace,
  MdCancelScheduleSend,
  MdOutlineAssignmentReturn,
  MdOutlineBackspace,
  MdOutlineMobileFriendly,
} from "react-icons/md";

interface ResumeCardProps {
  report?: SafeReport;
  started?: number;
  ended?: number;
  eSamsat?: number;
  canceled?: number;
  listCanceled?: [];
  place?: string;
  location?: string;
  service?: string;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  report,
  started,
  ended,
  eSamsat,
  canceled,
  listCanceled,
  place,
  location,
  service,
}) => {
  const total = () => {
    if (report?.started && report?.ended) {
      return report?.ended - report?.started + 1;
    }
    if (started && ended) {
      return ended - started + 1;
    }
  };

  const safeListCanceled = () => {
    if (report?.listCanceled) {
      return report?.listCanceled;
    }
    if (listCanceled) {
      return listCanceled;
    }
  };

  const SafeLocation = () => {
    if (report?.place && report?.location) {
      return report?.place + ", " + report?.location;
    }
    if (place && location) {
      return place + ", " + location;
    }
  };

  return (
    <div className="flex flex-col w-full gap-6 mt-4">
      {/* Layanan dan Alamat */}
      <div className="w-full flex flex-row gap-3 items-center text-xs md:text-sm justify-between">
        <p>Tanggal</p>
        <p className="font-semibold">
          {format(report?.createdAt || Date.now(), "cccc, dd MMMM yyyy", {
            locale: id,
          }) || "Tanggal tidak ditemukan"}
        </p>
      </div>
      <div className="w-full flex flex-row gap-3 items-center text-xs md:text-sm justify-between">
        <p>Jenis Layanan</p>
        <p className="font-semibold">{report?.service || service}</p>
      </div>
      <div className="w-full flex flex-row gap-3 items-center text-xs md:text-sm justify-between">
        <p>Alamat</p>
        <p className="font-semibold">{SafeLocation()}</p>
      </div>

      {/* 3 Card Total, e-Samsat, canceled */}
      <div className="flex flex-row gap-3 justify-between">
        <div className="flex flex-col bg-white justify-between w-full rounded-lg p-3 border-[1px] border-accent/20">
          <div className="font-light text-xs md:text-sm flex flex-col gap-1 mb-2">
            <div className="p-1 bg-primary/70 rounded-full text-white w-fit">
              <HiOutlineSquare3Stack3D size={16} />
            </div>
            <p>Total</p>
          </div>
          <p className="font-extrabold text-xl md:text-3xl">{total()}</p>
        </div>
        <div className="flex flex-col bg-white justify-between w-full rounded-lg p-3 border-[1px] border-accent/20">
          <div className="font-light text-xs md:text-sm flex flex-col gap-1 mb-2">
            <div className="p-1 bg-primary/70 rounded-full text-white w-fit">
              <AiOutlineMobile size={16} />
            </div>
            <p>eSamsat</p>
          </div>
          <p className="font-extrabold text-xl md:text-3xl ">
            {report?.eSamsat || eSamsat}
          </p>
        </div>
        <div className="flex flex-col bg-red-50 justify-between w-full rounded-lg p-3 border-[1px] border-red-800/10">
          <div className="font-light text-xs md:text-sm flex flex-col gap-1 mb-2">
            <div className="p-1 bg-red-800/60 text-white rounded-full w-fit">
              <BsArrowCounterclockwise size={16} />
            </div>

            <p className="text-red-800">Batal</p>
          </div>
          <p className="font-extrabold text-xl md:text-3xl text-red-800">
            {report?.canceled || canceled}
          </p>
        </div>
      </div>

      {/* Nomoratur started dan ended */}
      <div className="flex flex-row gap-2">
        <div className="flex flex-col w-full align-middle">
          <div className="flex flex-row items-center gap-2 text-darker/60 bg-primary rounded-t-md px-2 py-1.5 text-white">
            <BiHorizontalLeft size={20} />
            <p className="text-xs">Awal</p>
          </div>
          <p className="text-xl font-extrabold px-2 py-1 bg-neutral-100 rounded-b-md">
            {report ? "0" + report?.started : "0" + started}
          </p>
        </div>

        <div className="flex flex-col w-full align-middle">
          <div className="flex flex-row items-center gap-2 text-darker/60 bg-primary rounded-t-md px-2 py-1.5 text-white">
            <BiHorizontalRight size={20} />
            <p className="text-xs">Akhir</p>
          </div>
          <p className="text-xl font-extrabold px-2 py-1 bg-neutral-100 rounded-b-md">
            {report ? "0" + report?.ended : "0" + ended}
          </p>
        </div>
      </div>

      {/* List canceled */}
      <div className="flex flex-col gap-3">
        <div className="font-semibold text-xs flex items-center gap-2 flex-row">
          Daftar Nomoratur Batal
        </div>
        <div className="w-auto flex-wrap flex gap-1 tall:max-h-40 overflow-y-auto text-xs">
          {safeListCanceled()?.map((item, i) => (
            <div
              key={i}
              className="bg-red-50 px-2 py-1 rounded-full w-fit text-red-600"
            >
              {item["label"]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
