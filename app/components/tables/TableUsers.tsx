import { Report, User } from "@prisma/client";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";
import { BsSearch } from "react-icons/bs";
import DeleteReport from "./DeleteReport";
import SeeReport from "./SeeReport";
import Avatar from "../Avatar";
import Button from "../Button";
import ToggleActiveUser from "../ToggleActiveUser";
import DeleteUser from "./DeleteUser";

interface TableUserProps {
  users: User[];
}

const TableUsers: React.FC<TableUserProps> = ({ users }) => {
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
            placeholder="Cari User?"
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
                      Users
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold tracking-wide hidden sm:table-cell">
                      Join
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold tracking-wide">
                      Konfirm
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold tracking-wide">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="odd:bg-white even:bg-gray-50">
                      <td className="px-4 py-2 sm:px-6 sm:py-3">
                        <div className="flex flex-row items-center gap-3 text-ellipsis min-w-fit">
                          <div className="min-w-fit">
                            <Avatar
                              src={
                                user.image ||
                                `https://api.dicebear.com/6.x/big-smile/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=` +
                                  user.name
                              }
                              size={45}
                            />
                          </div>
                          <div className="flex flex-col gap-0.5 min-w-fit">
                            <div className="font-semibold text-sm">
                              {user.name}
                            </div>
                            <div className="font-light">{user.email}</div>
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
                        {user.role !== "ADMIN" ? (
                          <DeleteUser user={user} />
                        ) : (
                          "Hellow Master ^^"
                        )}
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

export default TableUsers;
