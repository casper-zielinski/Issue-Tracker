// tailwind.config.js
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
  daisyui: {
    themes: ["forest"],
  },
};

export default config;
