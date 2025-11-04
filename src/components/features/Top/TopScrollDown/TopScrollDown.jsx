import styles from "./TopScrollDown.module.scss";

export default function TopScrollDown({ children }) {
  return (
    <div className={styles.top__scroll__down}>
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
          d="M33.3327 25L19.9994 38.3333L6.66602 25"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className={styles['top__scroll__down-text']}>
        We help companies design their
        <br />
        products to be ready for web3 world
      </div>
    </div>
  );
}
