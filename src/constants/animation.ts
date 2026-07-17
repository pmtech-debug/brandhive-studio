export const animation = {
  durations: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },
  transitions: {
    fast: "transition-all duration-150 ease-in-out",
    normal: "transition-all duration-300 ease-in-out",
    slow: "transition-all duration-500 ease-in-out",
  },
  spring: {
    default: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
    gentle: {
      type: "spring",
      stiffness: 50,
      damping: 10,
    },
    stiff: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
} as const;

export type Animation = typeof animation;
