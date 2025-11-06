// INFINITY
// /animation.js

import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const animationInfinity = (refs) => {
  const {
    pathRef__1,
    prevpathRef__1,
    afterpathRef__1,
    elRef__1,
    pathRef__2,
    prevPathRef__2,
    afterPathRef__2,
    elRef__2,
    containerRef,
  } = refs;

  gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

  const setupFirstAnimation = () => {
    elRef__1.current.forEach((letter, index) => {
      if (letter) {
        gsap.set(letter, {
          x: -10,
          y: 0,
          opacity: 0,
        });
        const text__1 = "new crypto";
        const totalLetters__1 = text__1.length;
        const reverseIndex__1 = totalLetters__1 - 1 - index;
        const finalX = 140 + (reverseIndex__1 % 15) * 10;
        const finalY = 180 + Math.floor(index / 15) * 30;

        const animation = gsap.to(letter, {
          duration: 4.5,
          opacity: 1,
          motionPath: {
            path: prevpathRef__1.current,
            align: prevpathRef__1.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          paused: true,
          ease: "none",
          delay: index * 0.1,
          onComplete: () => {
            gsap.to(letter, {
              duration: 6,
              motionPath: {
                path: pathRef__1.current,
                align: pathRef__1.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
              },
              ease: "none",
              delay: index * 0.005,
              repeat: 0,
              onComplete: () => {
                gsap.to(letter, {
                  duration: 3,
                  motionPath: {
                    path: afterpathRef__1.current,
                    align: afterpathRef__1.current,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true,
                  },
                  ease: "none",
                  repeat: 0,
                  onComplete: () => {
                    gsap.to(letter, {
                      duration: 2,
                      x: finalX,
                      y: finalY,
                      rotation: 0,
                      scale: 1.2,
                      ease: "back.out(1.7)",
                      delay: index * 0.1,
                    });
                  },
                });
              },
            });
          },
        });
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80%",
          onEnter: () => animation.play(),
          onEnterBack: () => animation.play(),
          onLeave: () => animation.pause(),
          onLeaveBack: () => animation.pause(),

          once: false,
        });
      }
    });
  };
  const setupSecondAnimation = () => {
    elRef__2.current.forEach((letter, index) => {
      if (letter) {
        gsap.set(letter, {
          x: -10,
          y: 0,
          opacity: 0,
        });
        const text__2 = "new crypto";
        const totalLetters__2 = text__2.length;
        const reverseIndex__2 = totalLetters__2 - 1 - index;
        const finalX = 490 + (reverseIndex__2 % 15) * 10;
        const finalY = 180 + Math.floor(index / 15) * 30;

        const animation = gsap.to(letter, {
          duration: 4.5,
          opacity: 1,
          motionPath: {
            path: prevPathRef__2.current,
            align: prevPathRef__2.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: "none",
          delay: index * 0.06,
          paused: true,
          onComplete: () => {
            gsap.to(letter, {
              duration: 6,
              motionPath: {
                path: pathRef__2.current,
                align: pathRef__2.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
              },
              ease: "none",
              delay: index * 0.005,
              repeat: 0,
              onComplete: () => {
                gsap.to(letter, {
                  duration: 3,
                  rotation: 180,
                  motionPath: {
                    path: afterPathRef__2.current,
                    align: afterPathRef__2.current,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true,
                  },
                  ease: "none",
                  repeat: 0,
                  onComplete: () => {
                    gsap.to(letter, {
                      duration: 10,
                      x: finalX,
                      y: finalY,
                      rotation: 0,
                      scale: 1.2,
                      ease: "back.out(1.7)",
                      delay: index * 0.1,
                    });
                  },
                });
              },
            });
          },
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80%",
          onEnter: () => animation.play(),
          onEnterBack: () => animation.play(),
          onLeave: () => animation.pause(),
          onLeaveBack: () => animation.pause(),

          once: false,
        });
      }
    });
  };

  return {
    setupFirstAnimation,
    setupSecondAnimation,
  };
};

export const createRefs = () => {
  const addRefs = (refArray) => (el) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };
  return addRefs;
};
