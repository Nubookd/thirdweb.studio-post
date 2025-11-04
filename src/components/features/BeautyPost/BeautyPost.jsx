"use client";

import { useLayoutEffect, useRef } from "react";
import styles from "./BeautyPost.module.scss";
import Animation from "./animation";

export default function BeautyPost({ children }) {
  const pathRef__1 = useRef();
  const pathRef__2 = useRef();
  const pathRef__3 = useRef();
  const pathRef__4 = useRef();
  const pathRef__5 = useRef();
  const pathRef__6 = useRef();
  const pathRef__7 = useRef();
  const pathRef__8 = useRef();
  const pathRef__9 = useRef();
  const pathContainer = useRef()

  const pathRefsArray = {
    pathRef__1,
    pathRef__2,
    pathRef__3,
    pathRef__4,
    pathRef__5,
    pathRef__6,
    pathRef__7,
    pathRef__8,
    pathRef__9,
  };
  useLayoutEffect(() => {
    const animation = new Animation(pathRefsArray, pathContainer);
    const revert = animation.animate();

    return () => {
      revert();
    };
  }, []);

  return (
    <section className={styles.beauty__post} ref={pathContainer}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M200 0H0V200H200V0Z"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="0.7"
        />
        <path
          d="M800 200H600V400H800V200Z"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="0.7"
        />
        <path
          d="M1000 0H800V200H1000V0Z"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="0.7"
        />
        <path
          d="M400 200H200L400 0V200Z"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="0.7"
        />
        <path
          d="M600 200H800L600 0V200Z"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="0.7"
        />
        <path
          d="M1400 200H1200L1400 400V200Z"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="0.7"
        />
        <path
          d="M1200 100V200H1000V100C1000 44.7715 1044.77 0 1100 0C1155.23 0 1200 44.7715 1200 100Z"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="0.7"
        />
        <path
          d="M566.946 0H600V200H400V166.946C400 74.7439 474.744 0 566.946 0Z"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="0.7"
        />
        <path
          d="M1166.95 200H1200V400H1000V366.946C1000 274.744 1074.74 200 1166.95 200Z"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="0.7"
        />
        <path
          d="M600 366.946V400H400V200H433.054C525.256 200 600 274.744 600 366.946Z"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="0.7"
        />
        <path
          d="M1600 0H1400V200H1600V0Z"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="0.7"
        />
        <path
          d="M1300 0L1200 200H1400L1300 0Z"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="0.7"
        />
        <path ref={pathRef__1} d="M0 200H100" stroke="white" strokeWidth="2" />
        <path
          ref={pathRef__2}
          d="M300 200H400V250"
          stroke="white"
          strokeWidth="2"
        />
        <path
          ref={pathRef__3}
          d="M500 400H400V350"
          stroke="white"
          strokeWidth="2"
        />
        <path
          ref={pathRef__4}
          d="M700 400H800V350"
          stroke="white"
          strokeWidth="2"
        />
        <path
          ref={pathRef__5}
          d="M900 200H800V250"
          stroke="white"
          strokeWidth="2"
        />
        <path
          ref={pathRef__6}
          d="M1100 200H1200L1225 150"
          stroke="white"
          strokeWidth="2"
        />
        <path
          ref={pathRef__7}
          d="M1325 50L1300 0L1275 50"
          stroke="white"
          strokeWidth="2"
        />
        <path
          ref={pathRef__8}
          d="M1400 150V200L1375 150"
          stroke="white"
          strokeWidth="2"
        />
        <path
          ref={pathRef__9}
          d="M1500 0H1400V50"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </section>
  );
}
