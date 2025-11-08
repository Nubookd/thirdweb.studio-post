"use client";

import { useRef } from "react";
import { animate, motion, useInView } from "framer-motion";

export default function useFade(variantName, delay, scroll) {
  const variants = {
    
  };

  const ref = useRef();

  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  const motionProps = {
    ref: scroll ? ref : undefined,
    variants: {
      ...variants[variantName],
      transition: {
        ...variants[variantName].transition,
        delay,
      },
    },
    initial: "initial",
    ...(scroll
      ? {
          whileInView: "animate",
          viewport: { once: true, amount: 0.3 },
        }
      : {
          animate: "animate",
        }),
  };
  return { ref, isInView, motionProps };
}
