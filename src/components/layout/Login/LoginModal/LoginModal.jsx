"use client";

import { memo, useCallback, useRef, useState, useEffect } from "react";
import styles from "./LoginModal.module.scss";
import useModalStore from "@/store/useModalStore";
// import useLoginStore from "@/store/useLoginStore";
import useAuth from "@/hooks/useAuth";

const LoginModal = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { showModal, showLoginModal, showRegisterModal, closeModal } =
    useModalStore();
  const signUpRef = useRef();
  const signInRef = useRef();
  const modalRef = useRef();

  const { user, loading, login, register, logout } = useAuth();

  useEffect(() => {
    if (showModal) {
      document.body.classList.add(styles.bodyBlur);
    } else {
      document.body.classList.remove(styles.bodyBlur);
    }
    return () => {
      document.body.classList.remove(styles.bodyBlur);
    };
  }, [showModal, closeModal]);

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleOverlayClick);
    } else {
      document.removeEventListener("mousedown", handleOverlayClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [showModal, handleOverlayClick]);

  const handleModalSwitch = useCallback(
    (modal) => {
      setUserName("");
      setUserEmail("");
      setUserPassword("");
      setErrors({});

      if (modal === "login") {
        showLoginModal();
      } else if (modal === "register") {
        showRegisterModal();
      }
    },
    [showLoginModal, showRegisterModal]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!userName.trim()) {
      newErrors.userName = "Введите Имя";
    } else if (userName.trim().length < 2) {
      newErrors.userName = "Имя должно содержать минимум 2 символа";
    } else if (userName.trim().includes(" ")) {
      newErrors.userName = "Имя не может содержать пробелы";
    }

    if (!userPassword.trim()) {
      newErrors.userPassword = "Введите пароль";
    } else if (userPassword.length < 6) {
      newErrors.userPassword = "Пароль должен содержать минимум 6 символов";
    }

    if (showModal === "register") {
      const emailRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!userEmail.trim()) {
        newErrors.userEmail = "Введите Email";
      } else if (!emailRegular.test(userEmail)) {
        newErrors.userEmail = "Не корректный email";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [userName, userPassword, userEmail, showModal]);

  const handleInputChange = (field, value) => {
    if (field === "userName") {
      setUserName(value);
    } else if (field === "userPassword") {
      setUserPassword(value);
    } else if (field === "userEmail") {
      setUserEmail(value);
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    if (signInRef.current) {
      signInRef.current.disabled = false;
    }
    if (signUpRef.current) {
      signUpRef.current.disabled = false;
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await login(userName, userPassword);

      if (result.success) {
        setUserPassword("");
        setUserName("");
        closeModal();
        // location.reload();
      } else {
        if (
          result.error.includes("already exists") ||
          result.error.includes("уже существует")
        ) {
          if (result.error.includes("email")) {
            setErrors((prev) => ({
              ...prev,
              userEmail: "Email уже занят",
            }));
          } else {
            setErrors((prev) => ({
              ...prev,
              userName: "Имя уже занято",
            }));
          }
          signUpRef.current.disabled = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            userTotal: result.error,
          }));
        }
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        userTotal: "Ошибка сети",
      }));
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await register(userEmail, userName, userPassword);

      if (result.success) {
        setUserEmail("");
        setUserPassword("");
        setUserName("");
        closeModal();
        // location.reload();
      } else {
        if (
          result.error.includes("already exists") ||
          result.error.includes("уже существует")
        ) {
          if (result.error.includes("email")) {
            setErrors((prev) => ({
              ...prev,
              userEmail: "Email уже занят",
            }));
          } else {
            setErrors((prev) => ({
              ...prev,
              userName: "Имя уже занято",
            }));
          }
          signUpRef.current.disabled = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            userTotal: result.error,
          }));
        }
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        userTotal: "Ошибка сети",
      }));
    }
  };
  if (!showModal) return null;
  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div
        className={styles.loginModal}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {showModal === "login" && (
          <form className={styles.loginModal__form} onSubmit={handleSignIn}>
            <label>Sign in</label>
            {errors.userTotal && (
              <span className={styles["loginModal__form-inputSpan"]}>
                {errors.userTotal}
              </span>
            )}
            <div className={styles["loginModal__form-inputInner"]}>
              <input
                type="text"
                placeholder="Name"
                value={userName}
                onChange={(e) => handleInputChange("userName", e.target.value)}
                className={
                  errors.userName
                    ? `${styles["loginModal__form-input"]} ${styles.input__error}`
                    : styles["loginModal__form-input"]
                }
              />
              {errors.userName && (
                <span className={styles["loginModal__form-inputSpan"]}>
                  {errors.userName}
                </span>
              )}
            </div>
            <div className={styles["loginModal__form-inputInner"]}>
              <input
                type="password"
                placeholder="Password"
                value={userPassword}
                onChange={(e) =>
                  handleInputChange("userPassword", e.target.value)
                }
                className={
                  errors.userPassword
                    ? `${styles["loginModal__form-input"]} ${styles.input__error}`
                    : styles["loginModal__form-input"]
                }
              />
              {errors.userPassword && (
                <span className={styles["loginModal__form-inputSpan"]}>
                  {errors.userPassword}
                </span>
              )}
            </div>
            <button
              ref={signInRef}
              className={styles["loginModal__form-signNow"]}
            >
              Sign In
            </button>
            <button
              className={styles["loginModal__form-signOther"]}
              onClick={() => handleModalSwitch("register")}
            >
              Sign Up
            </button>
          </form>
        )}
        {showModal === "register" && (
          <form className={styles.loginModal__form} onSubmit={handleSignUp}>
            <label>Sign up</label>
            <div className={styles["loginModal__form-inputInner"]}>
              <input
                type="text"
                placeholder="Name"
                value={userName}
                onChange={(e) => handleInputChange("userName", e.target.value)}
                className={
                  errors.userName
                    ? `${styles["loginModal__form-input"]} ${styles.input__error}`
                    : styles["loginModal__form-input"]
                }
              />
              {errors.userName && (
                <span className={styles["loginModal__form-inputSpan"]}>
                  {errors.userName}
                </span>
              )}
            </div>
            <div className={styles["loginModal__form-inputInner"]}>
              <input
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={(e) => handleInputChange("userEmail", e.target.value)}
                className={
                  errors.userEmail
                    ? `${styles["loginModal__form-input"]} ${styles.input__error}`
                    : styles["loginModal__form-input"]
                }
              />
              {errors.userEmail && (
                <span className={styles["loginModal__form-inputSpan"]}>
                  {errors.userEmail}
                </span>
              )}
            </div>
            <div className={styles["loginModal__form-inputInner"]}>
              <input
                type="password"
                placeholder="Password"
                value={userPassword}
                onChange={(e) =>
                  handleInputChange("userPassword", e.target.value)
                }
                className={
                  errors.userPassword
                    ? `${styles["loginModal__form-input"]} ${styles.input__error}`
                    : styles["loginModal__form-input"]
                }
              />
              {errors.userPassword && (
                <span className={styles["loginModal__form-inputSpan"]}>
                  {errors.userPassword}
                </span>
              )}
            </div>
            <button
              ref={signUpRef}
              className={styles["loginModal__form-signNow"]}
            >
              Sign Up
            </button>
            <button
              className={styles["loginModal__form-signOther"]}
              onClick={() => handleModalSwitch("login")}
            >
              Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default memo(LoginModal);
