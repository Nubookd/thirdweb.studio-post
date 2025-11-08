"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HelpGrowe.module.scss";
import Image from "next/image";
import content from "./content";
import { motion } from "framer-motion";
import appearance from "@/lib/animation/appearance";

export default function HelpGrowe({ children }) {
  const [nowSection, setnowSection] = useState(0);

  const handleSection = (sectionIndex) => {
    setnowSection(sectionIndex);
  };

  return (
    <section className={styles.helpGrowe}>
      <motion.h2
        {...appearance.getAppearanceScroll(appearance.appearanceDown)}
        className={styles.helpGrowe__title}
      >
        How we can
        <br />
        help grow
      </motion.h2>
      <div className={styles.helpGrowe__inner}>
        <span className={styles["helpGrowe__inner-text"]}>
          <motion.span
            {...appearance.getAppearanceScroll(appearance.appearanceLeft)}
            className={nowSection === 0 ? styles.active : ""}
            onClick={() => handleSection(0)}
          >
            Product clarity
          </motion.span>
          <motion.span
            {...appearance.getAppearanceScroll(appearance.appearanceLeft)}
            className={nowSection === 1 ? styles.active : ""}
            onClick={() => handleSection(1)}
          >
            UX/UI design
          </motion.span>
          <motion.span
            {...appearance.getAppearanceScroll(appearance.appearanceLeft)}
            className={nowSection === 2 ? styles.active : ""}
            onClick={() => handleSection(2)}
          >
            Maintain process
          </motion.span>
        </span>
        <div className={styles["helpGrowe__inner-img__container"]}>
          <motion.div
            {...appearance.getAppearanceScroll(appearance.appearanceDown)}
          >
            <Image
              src={content[nowSection].img.src}
              alt={content[nowSection].img.alt}
              width={content[nowSection].img.width}
              height={content[nowSection].img.height}
            />
          </motion.div>
          <div className={styles["helpGrowe__inner-img__text"]}>
            <motion.span
              {...appearance.getAppearanceScroll(appearance.appearanceDown)}
            >
              {content[nowSection].description}
            </motion.span>
            <ul>
              <motion.li
                {...appearance.getAppearanceScroll(appearance.appearanceRight)}
              >
                {content[nowSection].features[0]}
              </motion.li>
              <motion.li
                {...appearance.getAppearanceScroll(appearance.appearanceRight)}
              >
                {content[nowSection].features[1]}
              </motion.li>
              <motion.li
                {...appearance.getAppearanceScroll(appearance.appearanceDown)}
              >
                {content[nowSection].features[2]}
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
