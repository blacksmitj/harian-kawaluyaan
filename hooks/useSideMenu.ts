import {create} from 'zustand'

interface SideMenuStore {
  isOpen: boolean;
  toggle: () => void;
  onOpen: () => void;
  onClose: () => void;
}


const useSideMenu = create<SideMenuStore> ((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({isOpen: !state.isOpen})),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))


export default useSideMenu