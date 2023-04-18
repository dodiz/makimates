import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dish: "#8ab9ad",
        "dish-hover": "#5a887c",
      },
      gap: {
        1: "0.2rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
