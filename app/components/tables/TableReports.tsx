import { Report, User } from "@prisma/client";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";
import {
  BsAlignEnd,
  BsAlignStart,
  BsSearch,
  BsSkipEndBtn,
  BsSkipStartBtn,
} from "react-icons/bs";
import DeleteReport from "./DeleteReport";
import SeeReport from "./SeeReport";
import { BiFirstPage, BiLastPage } from "react-icons/bi";

interface TableReportsProps {
  reports: (Report & {
    user: User;
  })[];
}

const TableReports: React.FC<TableReportsProps> = ({ reports }) => {
  return (
    <>
      <div className="flex sm:justify-start justify-center items-center">
        <div className="relative w-full sm:w-fit">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-darker/60">
            <BsSearch size={16} />
          </div>
          <input
            id=""
            type="text"
            className="bg-gray-50 text-sm font-medium rounded-xl w-full p-2 pl-10 z-10 focus:outline-primary/60 border-[1px] border-primary/10"
            placeholder="Cari laporan?"
          />
        </div>
      </div>

      <div className="bg-white md:p-4 p-3 border-[1px] border-primary/10 shadow-lg shadow-darker/5 rounded-2xl">
        <div className="-m-4 overflow-x-auto">
          <div className="p-1 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-white text-left font-light text-xs table-fixed">
                <thead className="border-b border-darker/10 rounded-lg">
                  <tr>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold tracking-wide">
                      Tanggal
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold tracking-wide hidden sm:table-cell">
                      Lokasi
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold tracking-wide">
                      Nomoratur
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold tracking-wide hidden sm:table-cell">
                      Total
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold tracking-wide hidden md:table-cell">
                      ESamsat
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold tracking-wide hidden md:table-cell">
                      Batal
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold tracking-wide">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr
                      key={report.id}
                      className="odd:bg-white even:bg-gray-50"
                    >
                      <td className="px-4 py-2 sm:px-6 sm:py-3 whitespace-nowrap">
                        {format(report.createdAt, "dd MMMM yyyy", {
                          locale: id,
                        }) || "Tanggal tidak ditemukan"}
                      </td>
                      <td className="px-4 py-2 sm:px-6 sm:py-3 hidden sm:table-cell">
                        <div className="flex flex-col gap-1 whitespace-nowrap">
                          <div className="font-semibold">{report.place}</div>
                          <div>{report.location}</div>
                        </div>
                      </td>
                      <td className="px-4 py-2 sm:px-6 sm:py-3">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-row gap-1 items-center">
                            <BiFirstPage
                              size={16}
                              className="bg-accent/50 text-white rounded-sm"
                            />
                            <div>{"0" + report.started}</div>
                          </div>
                          <div className="flex flex-row gap-1 items-center">
                            <BiLastPage
                              size={16}
                              className="bg-amber-600/50 text-white rounded-sm"
                            />
                            <div>{"0" + report.ended}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 sm:px-6 sm:py-3 hidden sm:table-cell">
                        {report.ended - report.started + 1}
                      </td>
                      <td className="px-4 py-2 sm:px-6 sm:py-3 hidden md:table-cell">
                        {report.eSamsat}
                      </td>
                      <td className="px-4 py-2 sm:px-6 sm:py-3 hidden md:table-cell">
                        {report.canceled}
                      </td>
                      <td className="px-4 py-2 sm:px-6 sm:py-3">
                        <div className="text-xs flex flex-row sm:flex-col gap-2">
                          <SeeReport report={report} />
                          <DeleteReport report={report} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableReports;
