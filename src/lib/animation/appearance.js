const appearanceUp = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
};

const appearanceDown = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

const appearanceLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
};

const appearanceRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
};

export default {
  appearanceUp,
  appearanceDown,
  appearanceLeft,
  appearanceRight,
  getAppearance: (variants, delay) => ({
    variants,
    initial: "initial",
    animate: "animate",
    viewport: { once: true, amount: 0.3 },
    transition: { delay },
  }),
  getAppearanceScroll: (variants) => ({
    variants,
    initial: "initial",
    whileInView: "animate",
    viewport: { once: true, amount: 0.3 },
    transition: { delay: 0.2 },
  }),
};
