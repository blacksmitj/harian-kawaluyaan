import { create } from "zustand";
import { SafeReport } from "../types";

interface DeleteReportModalStore {
  report: SafeReport;
  setReport: (report: SafeReport) => void;

  isDelete: boolean;
  onDelete: () => void;
  onCancel: () => void;

  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDeleteReportModal = create<DeleteReportModalStore>((set) => ({
  report: {} as SafeReport,
  setReport: (report: SafeReport) => set((state) => ({...state, report})),

  isDelete: false,
  onDelete: () => set({ isDelete: true}),
  onCancel: () => set({ isDelete: false}),

  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteReportModal;
