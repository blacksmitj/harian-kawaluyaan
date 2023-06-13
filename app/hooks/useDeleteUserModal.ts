import { User } from "@prisma/client";
import { create } from "zustand";

interface DeleteUserModalStore {
  user: User;
  setUser: (user: User) => void;

  isDelete: boolean;
  onDelete: () => void;
  onCancel: () => void;


  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDeleteUserModal = create<DeleteUserModalStore>((set) => ({
  user: {} as User,
  setUser: (user: User) => set((state) => ({...state, user})),

  isDelete: false,
  onDelete: () => set({ isDelete: true}),
  onCancel: () => set({ isDelete: false}),

  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteUserModal;
