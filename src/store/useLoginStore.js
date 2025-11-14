const { create } = require("zustand");

const useLoginStore = create((set) => ({
  login: false,
  setLogin: () => set({ login: true }),
  outLogin: () => set({ login: false }),
}));

export default useLoginStore;
