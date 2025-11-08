"use client";

import styles from "./Footer.module.scss";
import { motion } from "framer-motion";
import appearance from "@/lib/animation/appearance";

export default function Footer({ children }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__description}>
        <div>
          <motion.span
            {...appearance.getAppearanceScroll(appearance.appearanceLeft)}
            className={styles["footer__description-title"]}
          >
            Web3 product studio
          </motion.span>
          <motion.span
            {...appearance.getAppearanceScroll(appearance.appearanceLeft)}
            className={styles["footer__description-text"]}
          >
            Feel free to reach out if you want to collaborate with us, or simply
            have a chat.
          </motion.span>
        </div>
        <span className={styles["footer__description-email"]}>
          <motion.span
            {...appearance.getAppearanceScroll(appearance.appearanceLeft)}
            className={styles["footer__description-email-text"]}
          >
            hello@thirdweb.studio
          </motion.span>
        </span>
      </div>
      <div className={styles.footer__links}>
        <ul className={styles["footer__links-ul"]}>
          <motion.li
            {...appearance.getAppearanceScroll(appearance.appearanceLeft)}
            className={styles["footer__links-li"]}
          >
            Our projects
          </motion.li>
          <motion.li
            {...appearance.getAppearanceScroll(appearance.appearanceLeft)}
            className={styles["footer__links-li"]}
          >
            WingRiders
          </motion.li>
          <motion.li
            {...appearance.getAppearanceScroll(appearance.appearanceLeft)}
            className={styles["footer__links-li"]}
          >
            Trackee
          </motion.li>
          <motion.li
            {...appearance.getAppearanceScroll(appearance.appearanceLeft)}
            className={styles["footer__links-li"]}
          >
            Worldcoin
          </motion.li>
          <motion.li
            {...appearance.getAppearanceScroll(appearance.appearanceDown)}
            className={styles["footer__links-li"]}
          >
            Audience
          </motion.li>
        </ul>
        <ul className={styles["footer__links-ul"]}>
          <motion.li
            {...appearance.getAppearanceScroll(appearance.appearanceRight)}
            className={styles["footer__links-li"]}
          >
            Follow us
          </motion.li>
          <motion.li
            {...appearance.getAppearanceScroll(appearance.appearanceRight)}
            className={styles["footer__links-li"]}
          >
            Facebook
          </motion.li>
          <motion.li
            {...appearance.getAppearanceScroll(appearance.appearanceRight)}
            className={styles["footer__links-li"]}
          >
            Instagram
          </motion.li>
          <motion.li
            {...appearance.getAppearanceScroll(appearance.appearanceRight)}
            className={styles["footer__links-li"]}
          >
            Dribbble
          </motion.li>
          <motion.li
            {...appearance.getAppearanceScroll(appearance.appearanceDown)}
            className={styles["footer__links-li"]}
          >
            Linkedin
          </motion.li>
        </ul>
      </div>
      <div
        className={styles["footer__drag-container"]}
        onClick={() => window.scroll(0, 0)}
      >
        <div className={styles["footer__drag-container-up"]}>
          <motion.span
            {...appearance.getAppearanceScroll(appearance.appearanceRight)}
            className={styles["footer__drag-container-up-text"]}
          >
            Back to top
          </motion.span>
        </div>
      </div>
    </footer>
  );
}
