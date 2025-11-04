import TopImg from "./TopImg";
import React from "react";
import styles from "./Top.module.scss";
import TopScrollDown from "./TopScrollDown";
import TopTitle from "./TopTitle";

export default function Top({ children }) {
  return (
    <section className={styles.top}>
      <TopTitle/>
      <TopScrollDown />
      <TopImg />
      {/* <TopClientTitle /> */}
    </section>
  );
}
