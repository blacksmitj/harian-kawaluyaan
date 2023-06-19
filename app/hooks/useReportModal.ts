import { Report, User } from "@prisma/client";
import { create } from "zustand";
import { SafeReport } from "../types";

interface ReportModalStore {
  report: SafeReport & {
    user: User;
  };
  setReport: (report: SafeReport & {user: User}) => void;

  isChange: boolean;
  onChange: () => void;


  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useReportModal = create<ReportModalStore>((set) => ({
  report: {} as SafeReport & {user: User},
  setReport: (report: SafeReport & {user: User}) => set((state) => ({...state, report})),

  isChange: false,
  onChange: () => set((state) => ({ isChange: !state.isChange })),


  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useReportModal;
