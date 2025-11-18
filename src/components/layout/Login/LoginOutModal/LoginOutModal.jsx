"use client";

import useLoginStore from "@/store/useLoginStore";
import styles from "./LoginOutModal.module.scss";
import { memo, useCallback, useRef, useEffect } from "react";
import useLogOutModal from "@/store/useLogOutModalStore";
import Link from "next/link";

const LoginOutModal = () => {
  const { outLogin } = useLoginStore();
  const { showLogOutModal, closeLogOutModal } = useLogOutModal();
  const logOutModalRef = useRef();

  const handleLogout = () => {
    outLogin();
    closeLogOutModal();
    window.location.href = "/";
    // location.reload();
  };

  const handleCancel = () => {
    closeLogOutModal();
  };

  // const handleOverlayClick = useCallback(
  //   (e) => {
  //     if (
  //       logOutModalRef.current &&
  //       !logOutModalRef.current.contains(e.target)
  //     ) {
  //       closeLogOutModal();
  //     }
  //   },
  //   [closeLogOutModal]
  // );

  // useEffect(() => {
  //   if (showLogOutModal) {
  //     document.addEventListener("mousedown", handleOverlayClick);
  //   } else {
  //     document.removeEventListener("mousedown", handleOverlayClick);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleOverlayClick);
  //   };
  // }, [showLogOutModal, handleOverlayClick]);

  if (!showLogOutModal) return null;
  return (
    <div className={styles.loginOutModal} onClick={handleCancel}>
      <div
        ref={logOutModalRef}
        className={styles.loginOutModal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <Link
          href="/profileUser"
          onClick={handleCancel}
          className={styles.loginOutModal__button}
        >
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
