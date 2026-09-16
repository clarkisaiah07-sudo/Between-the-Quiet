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
          950: "#08090a", // near-black base
          900: "#0d0f10",
          850: "#111315",
        },
        ivory: {
          100: "#e4ddd3", // warm ivory main text
          300: "#beb4aa", // secondary italic
          500: "#8f8880", // dim text
        },
        rust: {
          500: "#8c3e36", // restrained, aged red accent
          600: "#733329",
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
