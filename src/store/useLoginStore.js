import { create } from "zustand";

const useLoginStore = create((set) => ({
  isLogin: false,
  user: null,

  setLogin: (userData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuth", "true");
      set({
        isLogin: true,
        user: userData,
      });
    }
  },
  outLogin: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuth");
      set({
        isLogin: false,
        user: null,
      });
    }
  },
  initAuthStorage: () => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("isAuth") === "true";
      set({ isLogin: isAuth });
    }
  },
}));

export default useLoginStore;
