/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    fontSize: {
      base: 16 + "px",
      sm: 14 + "px",
      lg: 18 + "px",
      xl: 20 + "px",
      "2xl": 24 + "px",
      "3xl": 32 + "px",
      "4xl": 40 + "px",
    },
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
