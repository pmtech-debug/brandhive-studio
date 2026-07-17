export const colors = {
  primary: {
    DEFAULT: "#12BDF7",
    light: "#60D6FF",
    dark: "#0096C7",
  },
  common: {
    white: "#FFFFFF",
    black: "#000000",
  },
  neutral: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
    950: "#030712",
  },
  status: {
    success: {
      DEFAULT: "#22C55E",
      light: "#86EFAC",
      dark: "#15803D",
    },
    warning: {
      DEFAULT: "#EAB308",
      light: "#FDE047",
      dark: "#A16207",
    },
    error: {
      DEFAULT: "#EF4444",
      light: "#FCA5A5",
      dark: "#B91C1C",
    },
  },
} as const;

export type Colors = typeof colors;
