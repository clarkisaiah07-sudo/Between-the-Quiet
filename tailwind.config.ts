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
          950: "#0b0a09", // warm near-black base (not pure black)
          900: "#0d0c0a",
          850: "#121110",
        },
        ivory: {
          100: "#f2ede2", // warm ivory type
          300: "#d9d0bf",
          500: "#a89d8a",
        },
        rust: {
          500: "#7c4a3c", // muted, aged dried-red accent
          600: "#68392e",
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
