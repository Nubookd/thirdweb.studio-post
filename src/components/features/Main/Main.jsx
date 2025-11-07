import About from "../About";
import BeautyPost from "../BeautyPost";
import Clients from "../Clients";
import Description from "../Description";
import HalloweenMusic from "../HalloweenMusic";
import HelpGrowe from "../HelpGrowe";
import OtherProject from "../OtherProject";
import Projects from "../Projects";
import Top from "../Top";
import styles from "./Main.module.scss";

export default function Main({ children }) {
  return (
    <main className={styles.main}>
      <HalloweenMusic />
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
