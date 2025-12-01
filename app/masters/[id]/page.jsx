"use client";

import Loader from "@/components/ui/Loader";
import styles from "./page.module.scss";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Master() {
  const [master, setMaster] = useState(null);
  const [comments, setComments] = useState([]);
  const params = useParams();
  useEffect(() => {
    const post = async () => {
      try {
        const res = await fetch(`/api/masters/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setMaster(data.master);
          setComments(data.comments);
        }
      } catch (error) {}
    };
    post();
  }, [params.id]);

  if (!master) {
    return (
      // <div className={styles.master}>
      //   <div className={styles.master__title}>Loading. . .</div>
      // </div>
      <Loader />
    );
  }

  // const master = resMaster.master;

  return (
    <div className={styles.master}>
      <div className={styles.master__top}>
        <span className={styles['master__top-title']}>{master.name}</span>
        <div className={styles['master__top-inner']}>
          <span>Id: {master.id}</span>
          <span>{master.description}</span>
        </div>
      </div>
      <div className={styles.master__comments}>
        <span className={styles["master__comments-title"]}>Coments</span>
        <div className={styles["master__comments-inner"]}>
          {comments.map((comment) => (
            <div key={comment.comment__id} className={styles.master__comment}>
              <span className={styles["master__commentator"]}>
                {comment.user__name}
              </span>
              <span className={styles["master__comment-text"]}>
                {comment.comment__text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
