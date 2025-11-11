const { create } = require("zustand");

const useModalStore = create((set) => ({
  showModal: null,
  showLoginModal: () => set({ showModal: "login" }),
  showRegisterModal: () => set({ showModal: "register" }),
  hideModal: () => set({ showModal: null }),
}));
