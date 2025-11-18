"use client";

import { useEffect, useState } from "react";
import styles from "./profile.module.scss";

export default function Profile({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const userStorage = localStorage.getItem("user");
      setTimeout(() => {
        const userData = JSON.parse(userStorage);
        setUser(userData);
      }, 0);
      if (userStorage) {
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }, []);

  // const userStorage = localStorage.getItem("user")
  // const user = JSON.parse(userStorage);
  // console.log(user);
  if (!user) {
    return (
      <main className={styles.user}>
        <div className={styles.user__title}>User not found</div>
      </main>
    );
  }
  return (
    <main className={styles.user}>
      <div className={styles.user__title}>User Profile</div>
      <div className={styles.user__inner}>
        <span>id: {user.user_id}</span>
        <span>Name: {user.user_name}</span>
        <span>Email: {user.user_email}</span>
      </div>
    </main>
  );
}
