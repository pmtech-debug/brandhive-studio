export const typography = {
  fontFamily: {
    sans: "var(--font-sans), system-ui, -apple-system, sans-serif",
    mono: "var(--font-mono), monospace",
  },
  sizes: {
    display: {
      lg: "text-5xl lg:text-6xl font-extrabold tracking-tight",
      DEFAULT: "text-4xl lg:text-5xl font-extrabold tracking-tight",
      sm: "text-3xl lg:text-4xl font-extrabold tracking-tight",
    },
    heading: {
      lg: "text-3xl lg:text-4xl font-bold tracking-tight",
      DEFAULT: "text-2xl lg:text-3xl font-bold tracking-tight",
      sm: "text-xl lg:text-2xl font-bold tracking-tight",
    },
    body: {
      lg: "text-lg leading-8 text-muted-foreground",
      DEFAULT: "text-base leading-7 text-foreground",
      sm: "text-sm leading-6 text-muted-foreground",
    },
    small: "text-sm font-medium leading-none",
    caption: "text-xs text-muted-foreground tracking-wide uppercase",
  },
} as const;

export type Typography = typeof typography;
