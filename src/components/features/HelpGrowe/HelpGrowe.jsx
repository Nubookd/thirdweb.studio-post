"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HelpGrowe.module.scss";
import Image from "next/image";
import content from "./content";

export default function HelpGrowe({ children }) {
  const [nowSection, setnowSection] = useState(0);

  const handleSection = (sectionIndex) => {
    setnowSection(sectionIndex);
  };

  return (
    <section className={styles.helpGrowe}>
      <span className={styles.helpGrowe__title}>
        How we can
        <br />
        help grow
      </span>
      <div className={styles.helpGrowe__inner}>
        <span className={styles["helpGrowe__inner-text"]}>
          <span
            className={nowSection === 0 ? styles.active : ""}
            onClick={() => handleSection(0)}
          >
            Product clarity
          </span>
          <span
            className={nowSection === 1 ? styles.active : ""}
            onClick={() => handleSection(1)}
          >
            UX/UI design
          </span>
          <span
            className={nowSection === 2 ? styles.active : ""}
            onClick={() => handleSection(2)}
          >
            Maintain process
          </span>
        </span>
        <div className={styles["helpGrowe__inner-img__container"]}>
          <Image
            src={content[nowSection].img.src}
            alt={content[nowSection].img.alt}
            width={content[nowSection].img.width}
            height={content[nowSection].img.height}
          />
          <div className={styles["helpGrowe__inner-img__text"]}>
            <span>{content[nowSection].description}</span>
            <ul>
              <li>{content[nowSection].features[0]}</li>
              <li>{content[nowSection].features[1]}</li>
              <li>{content[nowSection].features[2]}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
