"use client";

import React from "react";
import Logo from "@/components/ui/Logo";
import styles from "./Header.module.scss";
import { motion } from "framer-motion";
import appearance from "@/lib/animation/appearance";
import Login from "../Login";
import Link from "next/link";
import Navigation from "../Navigation";

export default function Header({ children }) {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Logo />
      </Link>
      <Navigation />
      <div>
        <Login />
        <div className={styles.header__menu}>
          <motion.span
            {...appearance.getAppearance(appearance.appearanceLeft, 0.8)}
          >
            Menu
          </motion.span>
          <motion.svg
            {...appearance.getAppearance(appearance.appearanceRight, 0.8)}
            width="21"
            height="13"
            viewBox="0 0 21 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.500001 0L0.5 13" stroke="white" />
            <path d="M10.5 0V13" stroke="white" />
            <path d="M20.5 0V13" stroke="white" />
          </motion.svg>
        </div>
      </div>
    </header>
  );
}
