"use client";

import {
  BsJournalBookmark,
  BsSkipEndBtn,
  BsSkipStartBtn,
} from "react-icons/bs";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import {
  MdOutlineAssignmentReturn,
  MdOutlineMobileFriendly,
} from "react-icons/md";

interface ResumeCardProps {
  started: number;
  ended: number;
  eSamsat: number;
  canceled: number;
  listCanceled: [];
  place: string;
  location: string;
  service: string;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  started,
  ended,
  eSamsat,
  canceled,
  listCanceled,
  place,
  location,
  service,
}) => {
  return (
    <div className="flex flex-col w-full gap-3">
      {/* Layanan dan Alamat */}
      <div className="w-full border-l-2 border-darker/40 flex flex-row gap-3 px-3 items-center font-semibold py-2 text-xs md:text-sm">
        <BsJournalBookmark size={15} />
        {service}
      </div>
      <div className="w-full border-l-2 border-darker/40 flex flex-row gap-3 px-3 items-center font-semibold py-2 text-xs md:text-sm">
        <IoLocationOutline size={18} />
        {place + ", " + location}
      </div>

      {/* 3 Card Total, e-Samsat, canceled */}
      <div className="flex flex-row gap-3 justify-between mt-2">
        <div className="flex flex-row items-center bg-primary/10 justify-between w-full shadow-xl shadow-primary/5 rounded-lg p-2">
          <div className="flex flex-col gap-2">
            <div className="font-light text-xs md:text-sm items-center flex gap-1">
              <HiOutlineSquare3Stack3D size={20} />
              Total
            </div>
            <p className="font-extrabold text-xl md:text-3xl">
              {ended - started + 1}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center bg-white justify-between w-full shadow-xl shadow-primary/5 rounded-lg p-2">
          <div className="flex flex-col gap-2">
            <div className="font-light text-xs md:text-sm items-center flex gap-1">
              <MdOutlineMobileFriendly size={20} />
              e-Samsat
            </div>
            <p className="font-extrabold text-xl md:text-3xl">{eSamsat}</p>
          </div>
        </div>
        <div className="flex flex-row items-center bg-rose-50/50 justify-between w-full shadow-xl shadow-primary/5 rounded-lg p-2">
          <div className="flex flex-col gap-2">
            <div className="font-light text-xs md:text-sm items-center flex gap-1">
              <MdOutlineAssignmentReturn size={20} />
              Batal
            </div>
            <p className="font-extrabold text-xl md:text-3xl">{canceled}</p>
          </div>
        </div>
      </div>

      {/* Nomoratur started dan ended */}
      <div className="flex flex-row gap-2 mt-4">
        <div className="flex flex-col px-3 py-2 w-full border-l-2 border-darker/40 align-middle">
          <div className="flex flex-row items-center gap-2 text-darker/60">
            <BsSkipStartBtn size={20} />
            <p className="text-xs">Awal</p>
          </div>
          <p className="text-xl font-extrabold">{"0" + started}</p>
        </div>
        <div className="flex flex-col px-3 py-2 w-full border-l-2 border-darker/40 align-middle">
          <div className="flex flex-row items-center gap-2 text-darker/60">
            <BsSkipEndBtn size={20} />
            <p className="text-xs">Akhir</p>
          </div>
          <p className="text-xl font-extrabold">{"0" + ended}</p>
        </div>
      </div>

      {/* List canceled */}
      <div className="flex flex-col w-full mt-4 gap-3">
        <div className="font-semibold text-xs flex items-center gap-2 flex-row">
          <MdOutlineAssignmentReturn size={24} />
          Daftar Nomoratur Batal
        </div>
        <div className="w-auto flex-wrap flex gap-1 tall:max-h-40 overflow-y-scroll text-xs">
          {listCanceled.map((item, i) => (
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
