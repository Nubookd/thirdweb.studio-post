"use client";

import styles from "./Navigation.module.scss";
import React from "react";
import { motion } from "framer-motion";
import appearance from "@/lib/animation/appearance";
import Link from "next/link";

const MotionLink = motion(Link);

export default function Navigation() {
  return (
    <nav>
      <ul className={styles.header__navigation}>
        <motion.li
          {...appearance.getAppearance(appearance.appearanceLeft)}
          className={styles.header__navigation__link}
        >
          Home
        </motion.li>
        <motion.li
          {...appearance.getAppearance(appearance.appearanceLeft, 0.2)}
          className={styles.header__navigation__link}
        >
          About
        </motion.li>
        <motion.li
          {...appearance.getAppearance(appearance.appearanceLeft, 0.4)}
          className={styles.header__navigation__link}
        >
          Contact
        </motion.li>
        <MotionLink
          href="/masters"
          {...appearance.getAppearance(appearance.appearanceLeft, 0.6)}
          className={styles.header__navigation__link}
        >
          Masters
        </MotionLink>
      </ul>
    </nav>
  );
}
