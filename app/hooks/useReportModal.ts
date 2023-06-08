import { Report, User } from "@prisma/client";
import { create } from "zustand";
import { ReportCardProps } from "../components/card/ReportCard";

interface ReportModalStore {
  report: any;
  setReport: (report: any) => void;

  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useReportModal = create<ReportModalStore>((set) => ({
  report: "",
  setReport: (report: any) => set((state) => ({...state, report})),

  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useReportModal;
