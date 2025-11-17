import { create } from "zustand";

const useLogOutModal = create((set, get) => ({
  showLogOutModal: false,
  openLogOutModal: () => {
    set({ showLogOutModal: true });
  },
  closeLogOutModal: () => {
    set({ showLogOutModal: false });
  },
}));

export default useLogOutModal;
