// tailwind.config.js
import daisyui from "daisyui";
import tailwindScrollbarHide from "tailwind-scrollbar-hide";

/** @type {import('tailwindcss').Config} */
const config = {
  plugins: [daisyui, tailwindScrollbarHide],
  daisyui: {
    themes: ["forest"],
  },
};

export default config;
