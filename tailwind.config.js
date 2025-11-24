// tailwind.config.js
import daisyui from "daisyui";
import tailwindScrollbarHide from "tailwind-scrollbar-hide";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [daisyui, tailwindScrollbarHide],
  daisyui: {
    themes: ["forest"],
  },
};

export default config;
