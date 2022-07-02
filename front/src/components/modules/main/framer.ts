// Main2
export const commonVariants = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: { duration: 0.5, when: 'beforeChildren' },
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

export const LogoEffectVariants = {
  animate: {
    scale: 1,
    rotate: 360,
    transition: { duration: 15, loop: Infinity, ease: 'linear' },
  },
};

export const EITestImgVariants = {
  initial: {
    rotate: -2,
  },
  animate: {
    rotate: 2,
    transition: { duration: 0.6, yoyo: Infinity },
  },
  hover: { rotate: 180 },
};

export const RightVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
    },
  },
  hover: { rotate: -10 },
};

// Main1
export const templateVariants = {
  hidden: {
    y: 50,
    rotateZ: 180,
    opacity: 0.5,
    scale: 0.2,
  },
  visible: {
    y: 0,
    rotateZ: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      type: 'spring',
      when: 'beforeChildren',
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};

export const childVariants = {
  normal: { scale: 0.9 },
  point: {
    scale: 1.1,
    transition: {
      duration: 0.5,
      delay: 0.4,
      stiffness: 700,
      yoyo: Infinity,
    },
  },
  hover: { scale: 1.2, color: 'red' },
};
