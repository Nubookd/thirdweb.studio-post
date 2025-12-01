import styles from "./Loader.module.scss";

export default function Loader({ children }) {
  return (
    <>
      <div className={styles.loader}>
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 0L61.8034 38.1966H100L69.0983 61.8034L80.9017 100L50 76.3932L19.0983 100L30.9017 61.8034L0 38.1966H38.1966L50 0Z"
            fill="#D9D9D9"
          />
        </svg>
      </div>
      <div className={styles['loader-wrap']}></div>
    </>
  );
}
