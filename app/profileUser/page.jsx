"use client";

import styles from "./profile.module.scss";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await fetch("/api/profile", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        } else {
          setUser("not found");
        }
      } catch (error) {}
    };
    auth();
  }, []);

  if (user === null) {
    return (
      <main className={styles.user}>
        <div className={styles.user__title}>Loading. . .</div>
      </main>
    );
  } else if (user === "not found") {
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
        <span>id: {user.id}</span>
        <span>Name: {user.name}</span>
        <span>Email: {user.email}</span>
      </div>
    </main>
  );
}
