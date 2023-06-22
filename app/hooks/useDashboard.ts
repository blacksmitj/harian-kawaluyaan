import { Report, User } from "@prisma/client";
import { create } from "zustand";

interface DashboardProps {
  reports: (Report & {
    user: User;
  })[];
  setReports: (report: (Report & {user: User})[]) => void;

  start: number;
  setStart: (start: number) => void;

}

const useDashboard = create<DashboardProps>((set) => ({
  reports: [] as (Report & {user: User})[],
  setReports: (reports: (Report & {user: User})[]) => set((state) => ({...state, ...reports})),

  start: 0,
  setStart: (start:number) => set((state) => ({...state, start}) ),
}));

export default useDashboard;
