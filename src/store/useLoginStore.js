import { create } from "zustand";

const useLoginStore = create((set) => ({
  isLogin: false,
  user: null,
  loading: true,

  setLogin: (userData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuth", "true");
      set({
        isLogin: true,
        user: userData,
        loading: false,
      });
    }
  },
  outLogin: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuth");
      set({
        isLogin: false,
        user: null,
        loading: false,
      });
    }
  },
  initAuthStorage: () => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("isAuth") === "true";
      set({ isLogin: isAuth, loading: false });
    } else {
      set({
        loading: false,
      });
    }
  },
  setLoading: (loading) => set({ loading }),
}));

export default useLoginStore;
