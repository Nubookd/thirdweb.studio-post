import styles from "./Footer.module.scss";

export default function Footer({ children }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__description}>
        <div>
          <span className={styles["footer__description-title"]}>
            Web3 product studio
          </span>
          <span className={styles["footer__description-text"]}>
            Feel free to reach out if you want to collaborate with us, or simply
            have a chat.
          </span>
        </div>
        <span className={styles["footer__description-email"]}>
          <span className={styles["footer__description-email-text"]}>
            hello@thirdweb.studio
          </span>
        </span>
      </div>
      <div className={styles.footer__links}>
        <ul className={styles["footer__links-ul"]}>
          <li className={styles["footer__links-li"]}>Our projects</li>
          <li className={styles["footer__links-li"]}>WingRiders</li>
          <li className={styles["footer__links-li"]}>Trackee</li>
          <li className={styles["footer__links-li"]}>Worldcoin</li>
          <li className={styles["footer__links-li"]}>Audience</li>
        </ul>
        <ul className={styles["footer__links-ul"]}>
          <li className={styles["footer__links-li"]}>Follow us</li>
          <li className={styles["footer__links-li"]}>Facebook</li>
          <li className={styles["footer__links-li"]}>Instagram</li>
          <li className={styles["footer__links-li"]}>Dribbble</li>
          <li className={styles["footer__links-li"]}>Linkedin</li>
        </ul>
      </div>
      <div className={styles["footer__drag-container"]}>
        <div className={styles["footer__drag-container-up"]}>
          <span className={styles["footer__drag-container-up-text"]}>
            Back to top
          </span>
        </div>
      </div>
    </footer>
  );
}
