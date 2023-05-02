/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        cozyFilms: {
          "primary": "#db6b30",

          "secondary": "#d6873c",

          "accent": "#86efac",

          "neutral": "#4b362b",

          "base-100": "#2b140d",

          "info": "#94C5F0",

          "success": "#6ee7b7",

          "warning": "#fde047",

          "error": "#f87171",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

