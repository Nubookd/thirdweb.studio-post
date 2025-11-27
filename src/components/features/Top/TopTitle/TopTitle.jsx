import styles from "./TopTitle.module.scss";
import { motion } from "framer-motion";
import appearance from "@/lib/animation/appearance";

export default function TopTitle({ children }) {
  return (
    <div className={styles.top__title}>
      <motion.h1 {...appearance.getAppearance(appearance.appearanceUp, 0.2)}>
        Design studio
      </motion.h1>
      <motion.span
        {...appearance.getAppearance(appearance.appearanceLeft, 0.2)}
      >
        for the
      </motion.span>
      <motion.span
        {...appearance.getAppearance(appearance.appearanceDown, 0.4)}
      >
        web3 world
      </motion.span>
    </div>
  );
}
