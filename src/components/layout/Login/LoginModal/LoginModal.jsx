import { useRef, useState } from "react";
import styles from "./LoginModal.module.scss";

export default function LoginModal({ children }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const errorRef = useRef(false)
  const signUpRef = useRef();

  async function handleLogin(event) {
    event.preventDefault();

    if (!userName.trim()) {
      alert("имя то введи");
      return;
    }

    const res = await fetch(
      `http://localhost:3000/api/login?name=${encodeURIComponent(
        userName
      )}&email=${encodeURIComponent(userEmail)}`
    );
    const data = await res.json();

    console.log(data);
    if (data.name[0].exists) {
      signUpRef.current.disabled = true;
      errorRef.current = true
      alert("имя занято");
    }
    if (data.email[0].exists) {
      signUpRef.current.disabled = true;
      errorRef.current = true
      alert("Email уже зарегестрирован");
    }
  }
  return (
    <div className={styles.loginModal}>
      <form
        className={styles.loginModal__form}
        onSubmit={(e) => handleLogin(e)}
      >
        <input
          type="text"
          placeholder="name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            signUpRef.current.disabled = false;
          }}
        />
        <input
          type="text"
          placeholder="email"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
            signUpRef.current.disabled = false;
          }}
        />
        <button ref={signUpRef} className={styles["loginModal__form-signUp"]}>
          Sign Up
        </button>
        <button className={styles["loginModal__form-signIn"]}>Sign In</button>
      </form>
    </div>
  );
}
