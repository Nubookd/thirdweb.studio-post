import useLoginStore from "@/store/useLoginStore";
import styles from "./LoginOutModal.module.scss";
import { memo } from "react";

const LoginOutModal = ({ onClose }) => {
  const { outLogin } = useLoginStore();

  console.log("out");

  const handleLogout = () => {
    outLogin();
    if (onClose) onClose();
  };
  return (
    <div className={styles.loginOutModal} onClick={onClose}>
      <div
        className={styles.loginOutModal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.loginOutModal__button} onClick={handleLogout}>
          Log out
        </button>
        <button className={styles.loginOutModal__cancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default memo(LoginOutModal);
