export const durations = {
  xs: 0.125,
  s: 0.2,
  m: 0.3,
  l: 0.5,
};

export const transitions = {
  enter: {
    duration: durations.s,
    ease: 'circOut',
  },
  exit: {
    duration: durations.s,
    ease: 'circIn',
  },
  slide: {
    duration: durations.s,
    ease: 'easeInOut',
  },
  fade: {
    duration: durations.xs,
    ease: 'linear',
  },
  spring: {
    type: 'spring',
    mass: durations.xs,
  },
};

export const timeouts = {
  short: 1,
  medium: 3.5,
  long: 5,
};
