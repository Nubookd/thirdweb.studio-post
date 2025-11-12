"use client";

import LoginModal from "@/components/layout/Login/LoginModal";
import About from "../About";
import BeautyPost from "../BeautyPost";
import Clients from "../Clients";
import Description from "../Description";
// import HalloweenMusic from "../HalloweenMusic";
import HelpGrowe from "../HelpGrowe";
import OtherProject from "../OtherProject";
import Projects from "../Projects";
import Top from "../Top";
import styles from "./Main.module.scss";
import useModalStore from "@/store/useModalStore";

export default function Main({ children }) {
  const { showModal } = useModalStore();
  return (
    <main className={styles.main}>
      {showModal && <LoginModal />}
      {/* <HalloweenMusic /> */}
      <Top />
      <Clients />
      <Description />
      <Projects />
      <OtherProject />
      <BeautyPost />
      <HelpGrowe />
      <About />
    </main>
  );
}
