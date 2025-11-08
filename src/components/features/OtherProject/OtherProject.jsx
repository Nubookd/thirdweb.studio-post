"use client";

import { useEffect, useRef } from "react";
import styles from "./OtherProject.module.scss";
import { Slider } from "./slider";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import appearance from "@/lib/animation/appearance";

export default function OtherProject({ children }) {
  const textRef = useRef();
  const prevButtonRef = useRef();
  const nextButtonRef = useRef();
  const sliderRef = useRef();
  const sliderCounter = useRef();

  const halloweenSvgRef = useRef();

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
    if (
      textRef.current &&
      prevButtonRef.current &&
      nextButtonRef.current &&
      sliderCounter.current
    ) {
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

  useEffect(() => {
    const mm = gsap.matchMedia();

    const createParallaxAnimation = (xPresent) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: halloweenSvgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      tl.to(halloweenSvgRef.current, { xPercent: xPresent, ease: "none" }, 0);
    };

    mm.add("(max-width: 767px)", () => createParallaxAnimation(200));
    mm.add("(min-width: 768px) and (max-width: 1199px)", () =>
      createParallaxAnimation(200)
    );
    mm.add("(min-width: 1200px)", () => createParallaxAnimation(300));

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.otherProjects}>
      <motion.h2
        {...appearance.getAppearanceScroll(appearance.appearanceDown)}
        className={styles.otherProjects__title}
      >
        Other Projects
      </motion.h2>
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
      <div ref={halloweenSvgRef} className={styles.otherProjects__halloween}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={styles["top__halloween-path"]}
            d="M461.973 202.346C458.96 193.904 452.933 186.576 449.463 178.239C443.453 163.791 437.862 149.126 433.069 134.235C428.902 121.298 427.533 107.324 422.322 94.8977C414.817 77.0017 398.517 74.6452 385.37 89.076C378.753 96.346 374.321 105.625 368.985 114.041C362.924 123.617 358.003 134.147 350.703 142.643C339.06 156.191 325.634 153.081 319.439 136.361C317.874 132.13 317.304 127.522 316.317 123.081C312.367 105.353 309.931 87.1174 304.155 70.0081C295.117 43.2224 275.313 30.9427 253.71 37.4092C237.015 42.4063 220.843 49.1531 202.52 55.8199C204.607 59.8295 207.318 64.2492 209.24 68.9952C210.653 72.4881 211.753 76.4074 211.739 80.1324C211.68 93.5502 211.699 107.018 210.491 120.361C209.684 129.296 209.753 141.877 204.276 146.029C195.205 152.906 188.6 141.166 182.672 134.98C176.093 128.12 170.757 120.081 164.737 112.668C160.729 107.738 156.908 102.536 152.254 98.2713C126.338 74.5449 98.5876 81.5217 84.8792 115.251C70.0802 151.667 64.6921 191.803 39.1369 224.067C30.4064 235.091 41.4706 249.891 56.571 249.443C63.8199 249.228 71.0754 247.078 78.2523 247.418C81.8826 247.596 88.23 251.097 88.4367 253.516C90.716 280.121 110.378 288.077 131.266 295.134C150.977 301.797 171.39 307.372 183.199 329.052C198.37 297.181 193.497 265.737 191.975 234.507C199.858 256.847 201.038 279.754 196.61 302.442C193.965 315.997 190.873 331.58 182.37 341.385C169.368 356.381 167.793 371.063 169.954 389.182C172.134 407.433 171.015 426.058 171.902 444.494C172.179 450.257 172.497 458.879 175.943 460.951C181.183 464.093 191.709 465.738 195.513 462.601C207.169 452.983 218.289 441.85 226.664 429.332C238.807 411.172 254.477 401.148 275.88 399.356C281.325 398.899 286.777 398.51 292.221 398.049C323.113 395.438 337.376 384.129 341.741 353.84C346.596 320.166 348.743 286.102 352.167 252.219C353.715 236.871 354.862 221.445 357.356 206.244C359.662 192.211 365.22 185.384 374.315 181.823C344.7 228.141 365.141 281.566 350.308 329.981C351.797 330.506 353.292 331.027 354.778 331.556C358.511 329.16 362.027 326.258 366.045 324.495C370.146 322.692 374.682 321.681 379.136 320.879C400.406 317.029 402.566 314.925 401.222 293.27C400.59 283.167 403.273 276.454 413.389 273.515C425.978 269.862 431.038 260.754 429.272 248.491C427.184 233.993 430.824 226.778 447.198 226.025C462.308 225.328 467.084 216.66 461.973 202.346ZM246.948 104.398C244.718 113.016 231.397 109.358 233.63 100.728C234.576 97.0617 236.275 93.1945 235.451 89.3692C234.657 85.6902 236.494 81.9109 240.274 80.8731C243.745 79.9195 247.975 82.0159 248.767 85.6984C250.193 92.2988 248.594 98.0367 246.948 104.398ZM288.764 143.577C287.235 147.921 284.922 151.474 280.857 153.86C277.598 155.767 273.755 156.513 270.027 156.053L269.966 156.124C269.945 156.091 269.925 156.053 269.904 156.017C269.127 155.91 268.355 155.767 267.597 155.571C262.172 154.081 257.559 149.536 255.69 144.153C254.922 142.843 254.283 141.428 253.756 139.913C253.331 138.681 252.816 137.496 252.392 136.264C250.991 132.225 251.853 127.241 253.861 123.52C254.631 120.67 256.062 118 258.181 115.882C264.988 109.077 275.657 109.495 282.517 115.882C289.869 122.729 292.054 134.227 288.764 143.577ZM291.129 98.9367C288.495 107.412 275.16 103.792 277.811 95.262C278.433 93.2584 278.709 91.8334 278.747 90.0638C278.77 88.9602 278.786 87.8424 278.651 86.7388C278.793 87.8888 277.847 84.5281 278.506 86.0067C276.97 82.5674 277.477 78.6113 280.984 76.5563C283.965 74.8099 288.896 75.5992 290.432 79.0349C293.209 85.2459 293.135 92.4745 291.129 98.9367Z"
            fill="white"
            fillOpacity="0.6"
          />
        </svg>
      </div>
    </section>
  );
}
