import React from "react";
import Logo from "@/components/ui/Logo";
import styles from "./Header.module.scss";

export default function Header({ children }) {
  return (
    <header className={styles.header}>
      <Logo />
      <nav>
        <ul className={styles.header__navigation}>
          <li className={styles.header__navigation__link}>Home</li>
          <li className={styles.header__navigation__link}>About</li>
          <li className={styles.header__navigation__link}>Contact</li>
          <li className={styles.header__navigation__link}>Career</li>
        </ul>
      </nav>
      <div>
        <div className={styles.header__menu}>
          <span>Menu</span>
          <svg
            width="21"
            height="13"
            viewBox="0 0 21 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_27_6208)">
              <path d="M0.500001 0L0.5 13" stroke="white" />
              <path d="M10.5 0V13" stroke="white" />
              <path d="M20.5 0V13" stroke="white" />
            </g>
            <defs>
              <clipPath id="clip0_27_6208">
                <rect width="21" height="13" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </header>
  );
}
