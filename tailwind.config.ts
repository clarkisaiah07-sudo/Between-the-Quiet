import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0a0a", // near-black base
          900: "#0d0d0d",
          850: "#121212",
        },
        ivory: {
          100: "#f2ede2", // warm ivory type
          300: "#d9d0bf",
          500: "#a89d8a",
        },
        rust: {
          500: "#8a4a3a", // muted dried-red accent
          600: "#733d30",
        },
      },
      fontFamily: {
        serif: ["var(--font-literary)", "Georgia", "serif"],
      },
      letterSpacing: {
        wide2: "0.14em",
      },
      transitionDuration: {
        2000: "2000ms",
        4000: "4000ms",
      },
    },
  },
  plugins: [],
};

export default config;
