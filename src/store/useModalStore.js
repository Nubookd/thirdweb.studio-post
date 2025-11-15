import { create } from "zustand";

const useModalStore = create((set, get) => ({
  showModal: false,
  showLoginModal: () => {
    if (get().showModal !== "login") {
      set({ showModal: "login" });
    }
  },
  showRegisterModal: () => {
    if (get().showModal !== "register") {
      set({ showModal: "register" });
    }
  },
  closeModal: () => {
    if (get().showModal !== false) {
      set({ showModal: false });
    }
  },
}));

export default useModalStore;