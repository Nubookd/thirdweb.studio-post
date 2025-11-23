import useLoginStore from "@/store/useLoginStore";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const { isLogin, user, setLogin, outLogin, initAuthStorage } =
    useLoginStore();

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return { success: false };
      }

      const res = await fetch("/api/protected/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Токен user: ", data.user.user_name);
        setLogin(data.user);
        return { status: res.status || 200, success: true };
      } else {
        console.error("Невалидный токен");
        return { status: res.status || 401, success: false };
      }
    } catch (error) {
      console.error("Проверка токена не удалась: ", error);
      return { status: 401, success: false };
    }
  };

  const refreshAuthToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return { status: 400 };
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
        console.log("post");
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        return { status: res.status || 200, success: true };
      } else {
        return { status: res.status || 401, success: false };
      }
    } catch (error) {
      console.error("Ошибка замены токенов: ", error);
      return { status: 400, success: false };
    }
  };

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
        console.log("user: ", user);
        return { success: true };
      } else {
        console.error("Ошибка при регистрации");
        return { status: res.status || 400, success: false };
      }
    } catch (error) {
      console.log("Ошибка регистрации:", error.message);
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
      console.log(data);
      console.log(res);

      if (res.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        setLogin(data.user);
        console.log("user: ", user);
        return { success: true };
      } else {
        console.error("Ошибка при входе");
        return { status: res.status || 400, success: false };
      }
    } catch (error) {
      console.log("Ошибка входа:", error.message);
      return { status: 400, success: false };
    }
  };

  const logout = async () => {
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
  };

  useEffect(() => {
    const Auth = async () => {
      initAuthStorage();
      console.log(isLogin);
      const token = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      // if (token && refreshToken) {
      //   const isVerifyToten = await verifyToken();
      //   if (!isVerifyToten.success) {
      //     const refreshSuccess = await refreshAuthToken();
      //     if (refreshSuccess.success) {
      //       await verifyToken();
      //     } else {
      //       logout();
      //     }
      //   }
      // }

      // if (token && refreshToken) {
      //   const isVerifyToten = await verifyToken();
      //   if (!isVerifyToten.success) {
      //     const refreshSuccess = await refreshAuthToken();
      //     if (refreshSuccess.success) {
      //       await verifyToken();
      //     } else {
      //       outLogin();
      //     }
      //   }

      setLoading(false);
    };
    Auth();
  }, []);
  return {
    user,
    loading,
    login,
    register,
    logout,
  };
}
