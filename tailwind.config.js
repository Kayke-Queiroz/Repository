/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        overlay: "30",
        hero: "40",
        nav: "50",
        hud: "60",
      },
    },
  },
  plugins: [],
}
