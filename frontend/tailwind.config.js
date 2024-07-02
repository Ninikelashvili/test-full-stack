/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "color-1": "#F9F9FC",
        "color-2": "#6A6C8D",
        "color-3": "#E8E9EB",
        "color-4": "#3E3F59",
        "color-5": "#F0EEFB",
        "color-6": "#8362F6",
      },
    },
  },
  plugins: [],
};
