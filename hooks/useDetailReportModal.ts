import { Report, User } from "@prisma/client";
import { create } from "zustand";
import { SafeReport } from "../types";

interface DetailReportModalStore {
  report: SafeReport & {
    user: User;
  };
  setReport: (report: SafeReport & {user: User}) => void;

  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDetailReportModal = create<DetailReportModalStore>((set) => ({
  report: {} as SafeReport & {user: User},
  setReport: (report: SafeReport & {user: User}) => set((state) => ({...state, report})),

  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDetailReportModal;
