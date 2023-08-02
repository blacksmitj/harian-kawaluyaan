"use client";

import { Report, User } from "@prisma/client";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { utils, writeFile } from "xlsx";
import {
  BiDownload,
  BiHorizontalLeft,
  BiHorizontalRight,
} from "react-icons/bi";
import { useState, useEffect, SyntheticEvent, useCallback } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import useOpenToast from "@/hooks/useOpenToast";
import TableLoader from "@/components/TableLoader";
import PaginateButton from "@/components/paginate-button";
import Button from "@/components/Button";
import DropdownReport from "@/components/report/dropdown-report";
import Overview from "@/components/report/overview";
import SelectDateFilter from "@/components/report/select-date-filter";
import Avatar from "@/components/Avatar";

interface TableReportsProps {
  currentUser: User;
}

type ReportWithUser = Report & {
  user: User;
};

const TableReports: React.FC<TableReportsProps> = ({ currentUser }) => {
  const openToast = useOpenToast();

  const [reports, setReports] = useState<ReportWithUser[]>([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [range, setRange] = useState("month");
  const [counts, setCounts] = useState<Report[]>([]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, keyword, openToast.isChange, range]);

  const getUsers = async () => {
    setIsLoading(true);
    const response = await axios.get(`/api/allreport`, {
      params: {
        keyword,
        page,
        limit,
        range,
      },
    });

    const results = response.data.result.map((result: any) => ({
      ...result,
      createdAt: new Date(result.createdAt),
      updatedAt: new Date(result.updatedAt),
      user: {
        ...result.user,
        createdAt: new Date(result.user.createdAt),
      },
    }));

    setReports(results);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
    setCounts(response.data.counts);
    setIsLoading(false);
  };

  const onRangeChange = (value: string) => {
    setRange(value);
    setPage(0);
  };

  const changePage = ({ selected }: any) => {
    setPage(selected);
  };

  const searchData = (e: SyntheticEvent) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  const handleOnExport = useCallback(async () => {
    const tableData = counts.map((report: any, index: number) => ({
      No: index + 1,
      Layanan: report.service,
      Location: report.place + " " + report.location,
      Tanggal: report.createdAt,
      NoAwal: report.started,
      NoAkhir: report.ended,
      Total: report.ended - report.started + 1,
      eSamsat: report.eSamsat,
      Batal: report.canceled,
      ListBatal: JSON.parse(report.listCanceled)
        .map((value: any) => value.label)
        .join(", "),
    }));

    const ws = utils.json_to_sheet(tableData);
    const wb = utils.book_new();
    const currentDate = new Date();

    utils.book_append_sheet(wb, ws, range);
    writeFile(
      wb,
      "LaporanP3DWKawaluyaan-" +
        range +
        "-" +
        currentDate.getFullYear() +
        ".xlsx"
    );
  }, [range, reports]);

  return (
    <div className="flex flex-col gap-4">
      <Overview range={range} reports={counts} keyword={keyword} />
      <hr className="my-2" />
      <div className="flex flex-col gap-y-4 pb-10">
        {/* search */}
        <div className="flex md:flex-row flex-col-reverse justify-between gap-4">
          <div className="relative w-fit">
            <form onSubmit={searchData}>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-darker/60">
                <BsSearch size={16} />
              </div>
              <input
                value={query}
                disabled={isLoading}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="bg-white text-sm font-medium rounded-md w-full p-2 pl-10 z-10 focus:outline-primary/60 border-[1px] border-emerald-600/10 disabled:bg-white disabled:text-neutral-100"
                placeholder="Cari laporan?"
              />
            </form>
          </div>
          <div className="flex gap-x-4 justify-between">
            <SelectDateFilter onValueChange={onRangeChange} />
            <Button label="" icon={BiDownload} onClick={handleOnExport} fit />
          </div>
        </div>

        {isLoading ? (
          <TableLoader />
        ) : (
          <div className="bg-white md:px-4 px-4 py-1 border-[1px] border-emerald-600/10 rounded-md">
            <div className="-m-2 overflow-x-auto">
              <div className="p-1 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-white text-left font-light text-xs md:text-sm table-fixed">
                    <thead className="border-b border-darker/10 rounded-lg">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 font-semibold tracking-wide hidden sm:table-cell">
                          User
                        </th>
                        <th className="px-4 sm:px-6 py-3 font-semibold tracking-wide">
                          Layanan
                        </th>
                        <th className="px-4 sm:px-6 py-3 font-semibold tracking-wide hidden sm:table-cell">
                          Lokasi
                        </th>
                        <th className="px-4 sm:px-6 py-3 font-semibold tracking-wide">
                          Nomoratur
                        </th>
                        <th className="px-4 sm:px-6 py-3 font-semibold tracking-wide hidden sm:table-cell">
                          Total
                        </th>
                        <th className="px-4 sm:px-6 py-3 font-semibold tracking-wide"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <tr
                          key={report.id}
                          className="odd:bg-white even:bg-gray-50"
                        >
                          <td className="px-4 py-2 sm:px-6 sm:py-3 truncate hover:text-clip hidden sm:table-cell">
                            <div className="flex flex-row items-center gap-3 min-w-fit">
                              <div className="min-w-fit">
                                <Avatar
                                  src={
                                    report.user.image ||
                                    process.env.NEXT_PUBLIC_API_DICEBAR! +
                                      report.user.name
                                  }
                                  size={45}
                                />
                              </div>
                              <div className="flex flex-col gap-0.5 min-w-fit ">
                                <div className="font-semibold text-sm">
                                  {report.user.name}
                                </div>
                                <div className="font-light ">
                                  {report.user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-3 min-w-[150px]">
                            <div className="flex flex-col">
                              <div className="font-medium">
                                {report.service}
                              </div>
                              <div className="flex">
                                {format(report.createdAt, "dd MMMM yyyy", {
                                  locale: id,
                                }) || "Tanggal tidak ditemukan"}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-3 min-w-[150px] hidden sm:table-cell">
                            <div className="flex flex-col gap-1">
                              <div className="font-medium">{report.place}</div>
                              <div>{report.location}</div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-3">
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-row gap-1 items-center">
                                <BiHorizontalLeft
                                  size={14}
                                  className="text-darker/60"
                                />
                                <p className="font-medium">
                                  {"0" + report.started}
                                </p>
                              </div>
                              <div className="flex flex-row gap-1 items-center">
                                <BiHorizontalRight
                                  size={14}
                                  className="text-darker/60"
                                />
                                <p className="font-medium">
                                  {"0" + report.ended}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-3 hidden sm:table-cell font-medium">
                            {report.ended - report.started + 1}
                          </td>
                          <td className="px-4 sm:px-6 py-3">
                            <DropdownReport
                              report={report}
                              currentUser={currentUser}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {reports.length === 0 && (
                    <div className="flex items-center justify-center p-4 py-20">
                      Data tidak ada!
                    </div>
                  )}
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <PaginateButton page={page} pages={pages} changePage={changePage} />
      </div>
    </div>
  );
};

export default TableReports;
