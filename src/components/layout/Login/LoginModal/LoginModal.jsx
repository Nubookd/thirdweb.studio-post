import { memo, useCallback, useRef, useState } from "react";
import styles from "./LoginModal.module.scss";
import useModalStore from "@/store/useModalStore";
import useLoginStore from "@/store/useLoginStore";

const LoginModal = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { showModal, showLoginModal, showRegisterModal, closeModal } =
    useModalStore();
  const { setLogin } = useLoginStore();
  const signUpRef = useRef();
  const signInRef = useRef();

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

  const handleSignIn = useCallback(
    async (event) => {
      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      try {
        const res = await fetch("/api/signIn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userName,
            password: userPassword,
          }),
        });
        const data = await res.json();

        console.log(data);

        if (data.exactMatch && data.success) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("isLogin", "true");

          setUserPassword("");
          setUserName("");
          setLogin(data.user);
          closeModal();
        } else {
          if (data.name?.[0]?.exists === false) {
            setErrors((prev) => ({
              ...prev,
              userName: "Имя не зарегистрировано",
            }));
            signInRef.current.disabled = true;
          } else if (!data.exactMatch) {
            setErrors((prev) => ({
              ...prev,
              userTotal: "Пароль неверный",
            }));
          }
        }
        location.reload()
      } catch (error) {
        alert("GG");
      }
    },
    
    [userName, userPassword, validateForm, setLogin, closeModal]
  );

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      try {
        const res = await fetch("/api/signUp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userName,
            email: userEmail,
            password: userPassword,
          }),
        });
        const data = await res.json();

        console.log(data);

        if (data.user && data.success) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("isLogin", "true");

          setUserEmail("");
          setUserPassword("");
          setUserName("");
          setLogin(data.user);
          closeModal();
        } else {
          if (data.name?.[0]?.exists) {
            setErrors((prev) => ({ ...prev, userName: "Имя уже занято" }));
            signUpRef.current.disabled = true;
            console.log("name");
          }
          if (data.email?.[0]?.exists) {
            setErrors((prev) => ({
              ...prev,
              userEmail: "Email уже занят",
            }));
            console.log("email");
            signUpRef.current.disabled = true;
          }
        }
        location.reload()
      } catch (error) {
        alert("GG");
      }
    },
    [userName, userEmail, userPassword, validateForm, setLogin, closeModal]
  );
  return (
    <div className={styles.loginModal}>
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
  );
};

export default memo(LoginModal);
