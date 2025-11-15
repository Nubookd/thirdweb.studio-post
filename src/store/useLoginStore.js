import { create } from "zustand";

const useLoginStore = create((set, get) => ({
  login: false,
  user: null,
  _initialized: false, // ✅ Добавляем флаг инициализации
  
  setLogin: (userData) => set({ 
    login: true, 
    user: userData 
  }),
  
  outLogin: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLogin");
    set({ 
      login: false, 
      user: null 
    });
  },
  
  initLogin: () => {
    // ✅ Предотвращаем повторную инициализацию
    if (get()._initialized) return;
    
    if (typeof window === "undefined") return;
    
    try {
      const savedUser = localStorage.getItem("user");
      const isLogin = localStorage.getItem("isLogin");
      
      if (savedUser && isLogin === "true") {
        const userData = JSON.parse(savedUser);
        set({
          login: true,
          user: userData,
          _initialized: true // ✅ Отмечаем как инициализированное
        });
      } else {
        set({ 
          _initialized: true // ✅ Все равно отмечаем как инициализированное
        });
      }
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("isLogin");
      set({ 
        login: false, 
        user: null,
        _initialized: true // ✅ Отмечаем как инициализированное
      });
    }
  },
}));

export default useLoginStore;