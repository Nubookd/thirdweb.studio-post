import styles from "./TopImg.module.scss";
import { motion } from "framer-motion";
import appearance from "@/lib/animation/appearance";

export default function TopImg({ children }) {
  return (
    <motion.div
      {...appearance.getAppearance(appearance.appearanceDown)}
      className={styles.top__img}
    ></motion.div>
  );
}
