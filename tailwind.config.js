/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#79CCF2",
        secondary: "#FDD835",
        "secondary-light": "#FFF9C4",
        "blue-900": "#0D47A1",
      },
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
        display: ['"Baloo 2"', "cursive"],
      },
      boxShadow: {
        elevation:
          "0px 1px 5px rgba(0,0,0,0.12), 0px 2px 2px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.2)",
      },
      maxWidth: {
        page: "1440px",
      },
    },
  },
  plugins: [],
}
