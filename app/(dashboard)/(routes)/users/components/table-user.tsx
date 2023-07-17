"use client";

import { User } from "@prisma/client";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React, { useState, useEffect, SyntheticEvent } from "react";
import { BsChevronLeft, BsChevronRight, BsSearch } from "react-icons/bs";
import Avatar from "../../../../../components/Avatar";
import ToggleActiveUser from "../../../../../components/ToggleActiveUser";
import axios from "axios";
import ReactPaginate from "react-paginate";
import TableLoader from "../../../../../components/TableLoader";
import DropdownUser from "./dropdown-user";
import useOpenToast from "@/hooks/useOpenToast";
import PaginateButton from "@/components/paginate-button";

type PageChangeHandler = (selectedItem: { selected: number }) => void;

const TableUsers = ({}) => {
  const openToast = useOpenToast();

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, keyword, openToast.isChange]);

  const getUsers = async () => {
    setIsLoading(true);
    const response = await axios.get(`/api/user`, {
      params: {
        keyword,
        page,
        limit,
      },
    });

    const results = response.data.result.map((result: any) => ({
      ...result,
      createdAt: new Date(result.createdAt),
    }));

    setUsers(results);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
    setIsLoading(false);
  };

  const changePage: PageChangeHandler = ({ selected }) => {
    setPage(selected);
  };

  const searchData = (e: SyntheticEvent) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  if (isLoading) {
    return <TableLoader />;
  }

  return (
    <div className="flex flex-col gap-y-4 pb-10">
      <div className="flex sm:justify-start justify-center items-center">
        <div className="relative w-full sm:w-fit">
          <form onSubmit={searchData}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-darker/60">
              <BsSearch size={16} />
            </div>
            <input
              value={query}
              disabled={isLoading}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="bg-gray-50 text-sm font-medium rounded-xl w-full p-2 pl-10 z-10 focus:outline-primary/60 border-[1px] border-emerald-600/10 disabled:bg-white disabled:text-neutral-100"
              placeholder="Cari laporan?"
            />
          </form>
        </div>
      </div>

      <div className="bg-white md:px-4 px-4 py-1 border-[1px] border-emerald-600/10 shadow-lg shadow-darker/5 rounded-2xl">
        <div className="-m-2 overflow-x-auto">
          <div className="p-1 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-white text-left font-light text-xs md:text-sm table-fixed">
                <thead className="border-b border-darker/10 rounded-lg">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 font-semibold tracking-wide">
                      User
                    </th>
                    <th className="px-4 sm:px-6 py-3 font-semibold tracking-wide hidden sm:table-cell">
                      Join
                    </th>
                    <th className="px-4 sm:px-6 py-3 font-semibold tracking-wide">
                      Confirm
                    </th>
                    <th className="px-4 sm:px-6 py-3 font-semibold tracking-wide hidden sm:table-cell">
                      Result
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="odd:bg-white even:bg-gray-50">
                      <td className="px-4 py-2 sm:px-6 sm:py-3 truncate hover:text-clip">
                        <div className="flex flex-row items-center gap-3 min-w-fit">
                          <div className="min-w-fit">
                            <Avatar
                              src={
                                user.image ||
                                process.env.NEXT_PUBLIC_API_DICEBAR! + user.name
                              }
                              size={45}
                            />
                          </div>
                          <div className="flex flex-col gap-0.5 min-w-fit ">
                            <div className="font-semibold text-sm">
                              {user.name}
                            </div>
                            <div className="font-light ">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 sm:px-6 sm:py-3 hidden sm:table-cell">
                        {format(user.createdAt, "cccc, dd MMMM yyyy", {
                          locale: id,
                        }) || "Tanggal tidak ditemukan"}
                      </td>
                      <td className="px-4 py-2 sm:px-6 sm:py-3">
                        <ToggleActiveUser user={user} />
                      </td>
                      <td className="px-4 py-2 sm:px-6 sm:py-3">
                        <DropdownUser user={user} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <PaginateButton page={page} pages={pages} changePage={changePage} />
    </div>
  );
};

export default TableUsers;
