import About from "../About";
import BeautyPost from "../BeautyPost";
import Clients from "../Clients";
import Description from "../Description";
import HelpGrowe from "../HelpGrowe";
import OtherProject from "../OtherProject";
import Projects from "../Projects";
import Top from "../Top";
import styles from "./Main.module.scss";

export default function Main({ children }) {
  return (
    <>
      <Top />
      <Clients />
      <Description />
      <Projects />
      <OtherProject />
      <BeautyPost />
      <HelpGrowe />
      <About />

      <HelpGrowe />
      <HelpGrowe />
      <HelpGrowe />
      <HelpGrowe />
    </>
  );
}
