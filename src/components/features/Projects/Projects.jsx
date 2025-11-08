"use client";
import styles from "./Projects.module.scss";
import { motion } from "framer-motion";
import appearance from "@/lib/animation/appearance";

export default function Projects({ children }) {
  return (
    <section className={styles.projects}>
      <motion.h2
        {...appearance.getAppearanceScroll(appearance.appearanceDown)}
        className={styles.projects__title}
      >
        Projects
      </motion.h2>
      <div className={styles.projects__inner}>
        <motion.div
          {...appearance.getAppearanceScroll(appearance.appearanceLeft)}
          className={styles["projects__inner-1"]}
        ></motion.div>
        <motion.div
          {...appearance.getAppearanceScroll(appearance.appearanceRight)}
          className={styles["projects__inner-2"]}
        ></motion.div>
        <motion.div
          {...appearance.getAppearanceScroll(appearance.appearanceLeft)}
          className={styles["projects__inner-3"]}
        ></motion.div>
        <motion.div
          {...appearance.getAppearanceScroll(appearance.appearanceRight)}
          className={styles["projects__inner-4"]}
        ></motion.div>
        <motion.div
          {...appearance.getAppearanceScroll(appearance.appearanceLeft)}
          className={styles["projects__inner-5"]}
        >
          <span>How we design web3 products</span>
          <button>coming soon</button>
        </motion.div>
      </div>
    </section>
  );
}
