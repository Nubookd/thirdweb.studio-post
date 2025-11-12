const { create } = require("zustand");
const useModalStore = create((set) => ({
  showModal: false,
  showLoginModal: () => set({ showModal: "login" }),
  showRegisterModal: () => set({ showModal: "register" }),
  closeModal: () => set({ showModal: false }),
}));

export default useModalStore;
