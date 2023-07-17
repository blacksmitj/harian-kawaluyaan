import { create } from "zustand";

interface UserModalStore {
  isChange: boolean;
  onChange: () => void;
}

const useUserModal = create<UserModalStore>((set) => ({
  isChange: false,
  onChange: () => set((state) => ({ isChange: !state.isChange })),
}));

export default useUserModal;
