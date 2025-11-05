"use client";

import { useEffect, useRef } from "react";
import styles from "./OtherProject.module.scss";
import { Slider } from "./slider";

export default function OtherProject({ children }) {
  const textRef = useRef();
  const prevButtonRef = useRef();
  const nextButtonRef = useRef();
  const sliderRef = useRef();
  const sliderCounter = useRef()

  const imgArray = [
    {
      src: "/images/other-1.png",
      alt: "img-1",
    },
    {
      src: "/images/other-2.png",
      alt: "img-2",
    },
    {
      src: "/images/other-3.png",
      alt: "img-3",
    },
    {
      src: "/images/other-1.png",
      alt: "img-1",
    },
    {
      src: "/images/other-2.png",
      alt: "img-2",
    },
    {
      src: "/images/other-3.png",
      alt: "img-3",
    },
    {
      src: "/images/other-1.png",
      alt: "img-1",
    },
    {
      src: "/images/other-2.png",
      alt: "img-2",
    },
    {
      src: "/images/other-3.png",
      alt: "img-3",
    },
  ];

  useEffect(() => {
    if (textRef.current && prevButtonRef.current && nextButtonRef.current && sliderCounter.current) {
      sliderRef.current = new Slider(
        textRef.current,
        prevButtonRef.current,
        nextButtonRef.current,
        imgArray,
        sliderCounter.current,
        styles
      );
    }
  }, []);

  return (
    <section className={styles.otherProjects}>
      <h2 className={styles.otherProjects__title}>Other Projects</h2>
      <div className={styles.slider}>
        <div ref={textRef} className={styles.slider__inner}>
          {imgArray.map((img, index) => (
            <img key={index} src={img.src} alt={img.alt} />
          ))}
        </div>
        <div className={styles.slider__footer}>
          <div ref={sliderCounter} className={styles.slider__counter}></div>
          <div className={styles.slider__buttons}>
            <span ref={prevButtonRef} className={styles.slider__prev}>
              <svg
                width="38"
                height="40"
                viewBox="0 0 38 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.3333 33.6672L12 20.3339L25.3333 7.00049"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span ref={nextButtonRef} className={styles.slider__next}>
              <svg
                width="38"
                height="40"
                viewBox="0 0 38 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 7L25.3333 20.3333L12 33.6667"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
