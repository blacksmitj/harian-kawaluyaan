import { create } from "zustand";

interface OpenToastStore {
  title: string;
  setTitle: (title: string) => void;

  subTitle: string;
  setSubTitle: (title: string) => void;

  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;

  isChange: boolean;
  onChange: () => void;
}

const useOpenToast = create<OpenToastStore>((set) => ({
  title: "",
  setTitle: (title:string) => set((state) => ({...state, title })),

  subTitle: "",
  setSubTitle: (subTitle:string) => set((state) => ({...state, subTitle })),

  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),

  isChange: false,
  onChange: () => set((state) => ({ isChange: !state.isChange })),
}));

export default useOpenToast;
