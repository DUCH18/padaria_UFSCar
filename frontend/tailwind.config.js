/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0C0C0C",
        "vanilla": "#FFFCF0",
        "brown": "#73420E",
        "orange": "#F89226",
      },
      boxShadow: {
        "custom-01": "0px 0px 5px 0px rgba(0, 0, 0, 0.75)",
      }
    },
    fontFamily: {
      'pacifico': ["Pacifico", "cursive"],
      'lato': ["Lato", "serif"],
    }
  },
  plugins: [],
}