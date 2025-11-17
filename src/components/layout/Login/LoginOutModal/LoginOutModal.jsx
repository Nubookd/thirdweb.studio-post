"use";

import useLoginStore from "@/store/useLoginStore";
import styles from "./LoginOutModal.module.scss";
import { memo } from "react";
import useLogOutModal from "@/store/useLogOutModalStore";
import Link from "next/link";

const LoginOutModal = () => {
  const { outLogin } = useLoginStore();
  const { closeLogOutModal } = useLogOutModal();

  const handleLogout = () => {
    outLogin();
    closeLogOutModal();
    location.reload();
  };

  const handleCancel = () => {
    closeLogOutModal();
  };
  return (
    <div className={styles.loginOutModal} onClick={handleCancel}>
      <div
        className={styles.loginOutModal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <Link href="/profile" className={styles.loginOutModal__button}>
          Сabinet
        </Link>

        <button className={styles.loginOutModal__button} onClick={handleLogout}>
          Log out
        </button>
        <button
          className={`${styles.loginOutModal__button} ${styles.loginOutModal__close}`}
          onClick={handleCancel}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.06067 1.06067L6.06067 6.06067M11.0607 11.0607L6.06067 6.06067M6.06067 6.06067L11.0607 1.06067L1.06067 11.0607"
              stroke="#594336"
              strokeWidth="3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default memo(LoginOutModal);
