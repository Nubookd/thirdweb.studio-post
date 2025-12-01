import useLoginStore from "@/store/useLoginStore";
import { useEffect, useCallback, useRef } from "react";

export default function useAuth() {
  const {
    isLogin,
    user,
    setLogin,
    outLogin,
    initAuthStorage,
    setLoading,
    loading,
  } = useLoginStore();

  const isRefreshingRef = useRef(false);
  const refreshPromiseRef = useRef(null);

  const verifyToken = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return { success: false };
      }

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setLogin(data.user);
        return {
          status: res.status || 200,
          success: true,
          error: data.message,
        };
      } else {
        console.error("Токен не валиден");
        try {
          const errorData = await res.json();
          return {
            success: false,
            status: res.status,
            error: errorData.message,
          };
        } catch {
          return {
            success: false,
            status: res.status,
          };
        }
      }
    } catch (error) {
      console.error("Проверка токена не удалась: ", error);
      return { status: 401, success: false };
    }
  }, [setLogin]);

  const refreshAuthToken = useCallback(async () => {
    if (isRefreshingRef.current) {
      return refreshPromiseRef.current;
    }

    isRefreshingRef.current = true;

    refreshPromiseRef.current = (async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          return { success: false };
        }

        const res = await fetch("/api/auth/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          return { success: true };
        } else {
          return { success: false };
        }
      } catch (error) {
        console.error("Refresh token error:", error);
        return { success: false };
      } finally {
        isRefreshingRef.current = false;
        refreshPromiseRef.current = null;
      }
    })();

    return refreshPromiseRef.current;
  }, []);

  const register = async (email, name, password) => {
    if (!name || !email || !password) {
      return {
        success: false,
        error: "Необходимо указать Имя, пароль и email",
      };
    }
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        setLogin(data.user);
        return {
          status: data.status || 200,
          success: true,
          error: data.message,
        };
      } else {
        console.error("Ошибка при регистрации");
        return {
          status: res.status || 400,
          success: false,
          error: data.message,
        };
      }
    } catch (error) {
      console.error("Ошибка регистрации:", error.message);
      return { status: 400, success: false };
    }
  };

  const login = async (name, password) => {
    if (!name || !password) {
      return {
        success: false,
        error: "Необходимо указать Имя и пароль",
      };
    }
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        setLogin(data.user);
        return {
          status: data.status || 200,
          success: true,
          error: data.message,
        };
      } else {
        console.error("Ошибка при входе", data);
        return {
          status: res.status || 400,
          success: false,
          error: data.message,
        };
      }
    } catch (error) {
      console.error("Ошибка входа:", error.message);
      return { status: 400, success: false };
    }
  };

  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });
      } catch (error) {
        console.error("Ошибка выхода: ", error);
      }
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      outLogin();
    }
  }, [outLogin]);

  const startTokenValidation = useCallback(() => {
    const interval = setInterval(async () => {
      if (!localStorage.getItem("accessToken")) {
        clearInterval(interval);
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          await logout();
          clearInterval(interval);
          return;
        }

        const res = await fetch("/api/profile", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const refreshSuccess = await refreshAuthToken();

          if (!refreshSuccess.success) {
            console.error("Не удалось обновить токен, выход...");
            await logout();
            clearInterval(interval);
          }
        }
      } catch (error) {
        console.error("Ошибка проверки токена:", error);
        await logout();
        clearInterval(interval);
      }
    }, 30000);

    return interval;
  }, [refreshAuthToken, logout]);

  useEffect(() => {
    const Auth = async () => {
      initAuthStorage();
      const token = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        if (token && refreshToken) {
          const isVerifyToten = await verifyToken();
          if (!isVerifyToten.success) {
            const refreshSuccess = await refreshAuthToken();
            if (refreshSuccess.success) {
              await verifyToken();
            } else {
              setLoading(false);
              logout();
            }
          }
        }
      } catch (error) {
        await logout();
      } finally {
        setLoading(false);
      }
    };
    Auth();
  }, [
    verifyToken,
    refreshAuthToken,
    logout,
    initAuthStorage,
    setLoading,
    startTokenValidation,
  ]);
  return {
    user,
    loading,
    login,
    register,
    logout,
  };
}
