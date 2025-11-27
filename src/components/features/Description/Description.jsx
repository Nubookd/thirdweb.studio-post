"use client";

import styles from "./Description.module.scss";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { animationInfinity, createRefs } from "./animation";
import { motion } from "framer-motion";
import appearance from "@/lib/animation/appearance";

export default function Description() {
  const pathRef__1 = useRef();
  const prevpathRef__1 = useRef();
  const afterpathRef__1 = useRef();
  const elRef__1 = useRef([]);
  const pathRef__2 = useRef();
  const prevPathRef__2 = useRef();
  const afterPathRef__2 = useRef();
  const elRef__2 = useRef([]);
  const containerRef = useRef();

  useLayoutEffect(() => {
    const refs = {
      pathRef__1,
      prevpathRef__1,
      afterpathRef__1,
      elRef__1,
      pathRef__2,
      prevPathRef__2,
      afterPathRef__2,
      elRef__2,
      containerRef,
    };

    // const { addToRefs } = createRefsHelper();
    // const addToRefs__1 = addToRefs(elRef__1);
    // const addToRefs__2 = addToRefs(elRef__2);

    const { setupFirstAnimation, setupSecondAnimation } =
      animationInfinity(refs);
    const ctx = gsap.context(() => {
      setupFirstAnimation();
      setupSecondAnimation();
    });
    return () => {
      ctx.revert();
    };
  }, []);

  const addToRefs__1 = (el) => {
    if (el && !elRef__1.current.includes(el)) {
      elRef__1.current.push(el);
    }
  };
  const addToRefs__2 = (el) => {
    if (el && !elRef__2.current.includes(el)) {
      elRef__2.current.push(el);
    }
  };

  const text__1 = "new crypto";
  const text__2 = "design skills";

  return (
    <section className={styles.description}>
      <div className={styles.description__inner}>
        <motion.h2
          {...appearance.getAppearanceScroll(appearance.appearanceDown)}
          className={styles.description__title}
        >
          What is Web3 studio?
        </motion.h2>
        <motion.div
          {...appearance.getAppearanceScroll(appearance.appearanceDown)}
          className={styles.description__text}
        >
          Things around crypto, NFTs and web3 as a whole are unbelievably
          interesting. Unfortunately, the overall usability as well as the
          quality of the UI is often still not up to the task. To achieve mass
          adoption, overcoming those hurdles will be key. And this is where our
          story begins.
        </motion.div>
      </div>
      <div ref={containerRef} className={styles.description__svgContainer}>
        <svg
          width="100%"
          height="10%"
          viewBox="0 0 710 354"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* <defs>
            <path
              ref={prevpathRef__1}
              d="M138.5 177.067C272.143 177.358 347 172.067 441.5 105.067C536 38.067 646.5 69.567 651.5 178.567"
              stroke="none"
              fill="none"
            />
            <path
              ref={pathRef__1}
              d="M651.25 177.001C651.25 236.488 603.02 284.717 543.533 284.717C476.186 284.717 408.878 230.879 355 177.001C301.122 123.122 233.814 69.2835 166.466 69.2835C106.98 69.2835 58.75 117.513 58.75 177.001C58.75 236.488 106.98 284.717 166.466 284.717C233.814 284.717 301.122 230.879 355 177.001C408.878 123.122 476.186 69.2835 543.533 69.2835C603.02 69.2835 651.25 117.513 651.25 177.001Z"
              fill="none"
            />
            <path
              ref={afterpathRef__1}
              d="M651.184 176.717C651.184 236.204 602.954 284.433 543.467 284.433C476.12 284.433 377 208.5 286.5 176.717"
              stroke="white"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
            <path
              ref={prevPathRef__2}
              d="M571.5 177.512C437.857 177.221 363 182.512 268.5 249.512C174 316.512 63.5 285.012 58.5 176.012"
              fill="none"
            />
            <path
              ref={pathRef__2}
              d="M58.75 177.001C58.75 117.514 106.98 69.2845 166.467 69.2845C233.814 69.2845 301.122 123.122 355 177.001C408.878 230.879 476.186 284.717 543.533 284.717C603.02 284.717 651.25 236.488 651.25 177.001C651.25 117.514 603.02 69.2845 543.533 69.2845C476.186 69.2845 408.878 123.122 355 177.001C301.122 230.879 233.814 284.717 166.467 284.717C106.98 284.717 58.75 236.488 58.75 177.001Z" // ← Зеркально отражен
              fill="none"
            />
            <path
              ref={afterPathRef__2}
              d="M58.816 176.717C58.816 117.23 107.046 69.0005 166.533 69.0005C233.88 69.0005 333 144.933 423.5 176.717"
              fill="none"
            />
          </defs> */}
          <path
            ref={prevpathRef__1}
            d="M138.5 177.067C272.143 177.358 347 172.067 441.5 105.067C536 38.067 646.5 69.567 651.5 178.567"
            stroke="none"
            fill="none"
          />
          <path
            ref={pathRef__1}
            d="M651.25 177.001C651.25 236.488 603.02 284.717 543.533 284.717C476.186 284.717 408.878 230.879 355 177.001C301.122 123.122 233.814 69.2835 166.466 69.2835C106.98 69.2835 58.75 117.513 58.75 177.001C58.75 236.488 106.98 284.717 166.466 284.717C233.814 284.717 301.122 230.879 355 177.001C408.878 123.122 476.186 69.2835 543.533 69.2835C603.02 69.2835 651.25 117.513 651.25 177.001Z"
            fill="none"
            stroke="white"
          />
          <path
            ref={afterpathRef__1}
            d="M651.184 176.717C651.184 236.204 602.954 284.433 543.467 284.433C476.12 284.433 377 208.5 286.5 176.717"
            stroke="none"
            strokeMiterlimit="10"
            strokeLinecap="square"
          />
          <path
            ref={prevPathRef__2}
            d="M571.5 177.512C437.857 177.221 363 182.512 268.5 249.512C174 316.512 63.5 285.012 58.5 176.012"
            fill="none"
          />
          <path
            ref={pathRef__2}
            d="M58.75 177.001C58.75 117.514 106.98 69.2845 166.467 69.2845C233.814 69.2845 301.122 123.122 355 177.001C408.878 230.879 476.186 284.717 543.533 284.717C603.02 284.717 651.25 236.488 651.25 177.001C651.25 117.514 603.02 69.2845 543.533 69.2845C476.186 69.2845 408.878 123.122 355 177.001C301.122 230.879 233.814 284.717 166.467 284.717C106.98 284.717 58.75 236.488 58.75 177.001Z" // ← Зеркально отражен
            fill="none"
          />
          <path
            ref={afterPathRef__2}
            d="M58.816 176.717C58.816 117.23 107.046 69.0005 166.533 69.0005C233.88 69.0005 333 144.933 423.5 176.717"
            fill="none"
          />

          {text__1
            .split("")
            .reverse()
            .map((letter, index) => (
              <text
                key={index}
                ref={addToRefs__1}
                fill="white"
                fontSize="16"
                fontFamily="Arial, sans-serif"
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {letter}
              </text>
            ))}
          {text__2
            .split("")
            .reverse()
            .map((letter, index) => (
              <text
                key={index}
                ref={addToRefs__2}
                fill="white"
                fontSize="16"
                fontFamily="Arial, sans-serif"
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {letter}
              </text>
            ))}
        </svg>
      </div>
    </section>
  );
}
