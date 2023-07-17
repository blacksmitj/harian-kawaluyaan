"use client";

import { SafeReport } from "@/types";
import { AiOutlineMobile } from "react-icons/ai";
import { BiHorizontalLeft, BiHorizontalRight } from "react-icons/bi";
import Point from "./point";
import { TbReportAnalytics, TbReportOff } from "react-icons/tb";
import Nomoratur from "./nomoratur";

interface ReportDetailProps {
  started: number;
  ended: number;
  eSamsat: number;
  canceled: number;
  listCanceled: [];
  place: string;
  location: string;
  service: string;
}

const ReportDetail: React.FC<ReportDetailProps> = ({
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
    <div className="flex flex-col w-full gap-6 mt-4">
      {/* Layanan dan Alamat */}
      <div className="w-full flex flex-row gap-3 items-center text-xs justify-between">
        <p>Jenis Layanan</p>
        <p className="font-medium">{service}</p>
      </div>
      <div className="w-full flex flex-row gap-3 items-center text-xs justify-between">
        <p>Alamat</p>
        <p className="font-medium">{place + ", " + location}</p>
      </div>

      {/* 3 Card Total, e-Samsat, canceled */}
      <div className="flex flex-row gap-3 justify-between">
        <Point
          point="total"
          title="Total"
          ended={ended}
          started={started}
          icon={<TbReportAnalytics size={14} />}
        />
        <Point
          point="esamsat"
          title="eSamsat"
          eSamsat={eSamsat}
          icon={<AiOutlineMobile size={14} />}
        />
        <Point
          point="canceled"
          title="Batal"
          canceled={canceled}
          icon={<TbReportOff size={14} />}
        />
      </div>

      {/* Nomoratur started dan ended */}
      <div className="flex flex-row gap-2">
        <Nomoratur
          title="Awal"
          value={started}
          icon={<BiHorizontalLeft size={20} />}
        />
        <Nomoratur
          title="Akhir"
          value={ended}
          icon={<BiHorizontalRight size={20} />}
        />
      </div>

      {listCanceled.length !== 0 && (
        <div className="flex flex-col gap-3">
          <div className="font-medium text-xs flex items-center gap-2 flex-row">
            Daftar Nomoratur Batal
          </div>
          <div className="w-auto flex-wrap flex gap-1 tall:max-h-40 overflow-y-auto text-xs">
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
      )}
    </div>
  );
};

export default ReportDetail;
