"use client";

import Loader from "@/components/ui/Loader";
import styles from "./page.module.scss";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Master() {
  const [master, setMaster] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const params = useParams();

  const commentFormRef = useRef();

  const scrollToCommentForm = () => {
    commentFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const createComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      console.log(params);
      const res = await fetch(`/api/masters/${params.id}/newComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      });
      if (!res.ok) {
        console.log("post");
      }

      console.log(res);
    } catch (error) {}
  };

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
    return <Loader />;
  }

  return (
    <div className={styles.master}>
      <div className={styles.master__top}>
        <span className={styles["master__top-title"]}>{master.name}</span>
        <div className={styles["master__top-inner"]}>
          <span>Id: {master.id}</span>
          <span>{master.description}</span>
        </div>
        <span
          className={styles["master__top-scroll"]}
          onClick={() =>
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            })
          }
        >
          <svg
            width="40"
            height="39"
            viewBox="0 0 40 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 38.3332V1.6665"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M33.3333 25L20 38.3333L6.66663 25"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Comments</span>
        </span>
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
      <div
        onClick={scrollToCommentForm}
        className={styles["master__write-triger"]}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 19C6.229 19 4.343 19 3.172 17.828C2 16.657 2 14.771 2 11C2 7.229 2 5.343 3.172 4.172C4.343 3 6.229 3 10 3H14C17.771 3 19.657 3 20.828 4.172C22 5.343 22 7.229 22 11C22 14.771 22 16.657 20.828 17.828C20.175 18.482 19.3 18.771 18 18.898"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.99976 19C11.2358 19 12.5978 19.5 13.8408 20.145C15.8388 21.182 16.8378 21.701 17.3298 21.37C17.8218 21.04 17.7288 20.015 17.5418 17.966L17.4998 17.5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span>Написать отзыв</span>
      </div>
      <div ref={commentFormRef} className={styles.master__write}>
        <form id="commentForm" onSubmit={createComment}>
          <legend>Write a review</legend>
          <input
            type="text"
            placeholder="Text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}
