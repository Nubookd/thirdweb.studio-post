"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./masters.module.scss";
import Link from "next/link";

export default function Masters() {
  const [masters, setMasters] = useState([]);
  const masterRef = useRef();

  useEffect(() => {
    const getMasters = async () => {
      try {
        const res = await fetch("/api/masters");
        const data = await res.json();
        setMasters(data.masters || []);
      } catch (error) {
        console.error(error);
      }
    };
    getMasters();
  }, []);

  return (
    <main className={styles.masters}>
      <h1 className={styles.masters__title}>Masters</h1>
      <div className={styles.masters__inner}>
        {masters && masters.length > 0 ? (
          masters.map((master) => (
            <Link
              key={master.master_id}
              href={`/masters/${master.master_id}`}
              className={styles.masters__item}
            >
              <span className={styles["masters__item-span"]}>
                Id: {master.master_id}
              </span>
              <span className={styles["masters__item-span"]}>
                Name: {master.master_name}
              </span>
              <span className={styles["masters__item-span"]}>
                Email: {master.master_email}
              </span>
              <span className={styles["masters__item-span"]}>
                Phone: {master.master_number}
              </span>
            </Link>
          ))
        ) : (
          <span>Loading . . .</span>
        )}
      </div>
    </main>
  );
}
