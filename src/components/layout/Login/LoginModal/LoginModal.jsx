import { useRef, useState } from "react";
import styles from "./LoginModal.module.scss";
import useModalStore from "@/store/useModalStore";
import useLoginStore from "@/store/useLoginStore";

export default function LoginModal({ children }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [errors, setErrors] = useState({});
  const { showModal, showLoginModal, showRegisterModal, closeModal } =
    useModalStore();
  const { setLogin } = useLoginStore();
  const signUpRef = useRef();
  const signInRef = useRef();

  const validateForm = () => {
    const newErrors = {};
    if (!userName.trim()) {
      newErrors.userName = "Введите Имя";
    } else if (userName.trim().length < 2) {
      newErrors.userName = "Имя должно содержать минимум 2 символа";
    } else if (userName.trim().includes(" ")) {
      newErrors.userName = "Имя не может содержать пробелы";
    }

    const emailRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail.trim()) {
      newErrors.userEmail = "Введите Email";
    } else if (!emailRegular.test(userEmail)) {
      newErrors.userEmail = "Не корректный email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    if (field === "userName") {
      setUserName(value);
    } else {
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

  async function handleSignIn(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/signIn?name=${encodeURIComponent(
          userName
        )}&email=${encodeURIComponent(userEmail)}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();

      console.log(data);

      if (data.exactMatch && data.success) {
        closeModal();
        setLogin();
      } else {
        // if (!data.name[0].exists) {
        //   setErrors((prev) => ({
        //     ...prev,
        //     userName: "Имя не зарегистрировано",
        //   }));
        //   signInRef.current.disabled = true;
        // }
        // if (!data.email[0].exists) {
        //   setErrors((prev) => ({
        //     ...prev,
        //     userEmail: "Email не зарегистрирован",
        //   }));
        //   signInRef.current.disabled = true;
        // }
        if (
          !data.exactMatch
        ) {
          setErrors((prev) => ({
            ...prev,
            userTotal: "Пользователь не найден",
          }));
        }
      }
    } catch (error) {
      alert("GG");
    }
  }
  async function handleSignUp(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/signUp?name=${encodeURIComponent(
          userName
        )}&email=${encodeURIComponent(userEmail)}`
      );
      const data = await res.json();

      console.log(data);

      if (data.user && data.success) {
        setUserEmail("");
        setUserName("");
        showLoginModal();
        setLogin(true);
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
    } catch (error) {
      alert("GG");
    }
  }
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
          <button
            ref={signInRef}
            className={styles["loginModal__form-signNow"]}
          >
            Sign In
          </button>
          <button
            className={styles["loginModal__form-signOther"]}
            onClick={showRegisterModal}
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
          <button
            ref={signUpRef}
            className={styles["loginModal__form-signNow"]}
          >
            Sign Up
          </button>
          <button
            className={styles["loginModal__form-signOther"]}
            onClick={showLoginModal}
          >
            Sign In
          </button>
        </form>
      )}
    </div>
  );
}
