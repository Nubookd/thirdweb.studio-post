"use client";

import styles from "./About.module.scss";
import Image from "next/image";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function About({ children }) {
  const parallaxRef__1 = useRef();
  const parallaxRef__2 = useRef();
  const parallaxRef__3 = useRef();
  const aboutContainerRef = useRef();

  useEffect(() => {
    const mm = gsap.matchMedia();

    const createParallaxAnimation = (yPresent__3) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutContainerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      tl.to(parallaxRef__1.current, { yPercent: 100, ease: "none" }, 0)
        .to(parallaxRef__2.current, { yPercent: 50, ease: "none" }, 0)
        .to(parallaxRef__3.current, { yPercent: yPresent__3, ease: "none" }, 0);
    };

    mm.add("(max-width: 767px)", () => createParallaxAnimation(-100));
    mm.add("(min-width: 768px) and (max-width: 1199px)", () =>
      createParallaxAnimation(-300)
    );
    mm.add("(min-width: 1200px)", () => createParallaxAnimation(-100));

    return () => mm.revert();
  }, []);

  return (
    <div ref={aboutContainerRef} className={styles.about}>
      <div className={styles.about__wrap}>
        <h2 className={styles["about__wrap-title"]}>About</h2>
        <span className={styles["about__wrap-text"]}>
          Team of product and brand designers that are really passionate about
          blockchain technology and good design. We are not just UI freaks! We
          advocate users for better product experience and common sense.
        </span>
        <span className={styles["about__wrap-link"]}>
          <span className={styles["about__wrap-link-text"]}>More about us</span>
        </span>
      </div>
      <div className={styles.about__image}>
        <div ref={parallaxRef__1} className={styles["about__image-1"]}>
          <Image
            src="/images/home__about-img-1.jpg"
            alt="img-1"
            width={230.39}
            height={344.77}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
      <div className={styles.about__image}>
        <div ref={parallaxRef__2} className={styles["about__image-2"]}>
          <Image
            src="/images/home__about-img-2.jpg"
            alt="img-1"
            width={230.39}
            height={343.16}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
      <div className={styles.about__image}>
        <div ref={parallaxRef__3} className={styles["about__image-3"]}>
          <Image
            src="/images/home__about-img-3.jpg"
            alt="img-1"
            width={288}
            height={190.83}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
