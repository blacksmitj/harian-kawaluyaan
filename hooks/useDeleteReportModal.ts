import { create } from "zustand";
import { SafeReport } from "../types";
import { User } from "@prisma/client";

interface DeleteReportModalStore {
  report: SafeReport & {
    user: User;
  };
  setReport: (report: SafeReport & {user: User}) => void;

  isDelete: boolean;
  onDelete: () => void;
  onCancel: () => void;

  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDeleteReportModal = create<DeleteReportModalStore>((set) => ({
  report: {} as SafeReport & {user: User},
  setReport: (report: SafeReport & {user: User}) => set((state) => ({...state, report})),

  isDelete: false,
  onDelete: () => set({ isDelete: true}),
  onCancel: () => set({ isDelete: false}),

  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteReportModal;
