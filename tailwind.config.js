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
        display: ['"Baloo Tamma 2"', '"Baloo 2"', "cursive"],
      },
      boxShadow: {
        elevation:
          "0px 1px 5px rgba(0,0,0,0.12), 0px 2px 2px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.2)",
        "card-hover":
          "0px 0px 15px 0px #90CAF9, 5px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      transitionDuration: {
        micro: "200ms",
        component: "300ms",
        page: "400ms",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "feedback-in-next": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "feedback-in-prev": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "feedback-in-next":
          "feedback-in-next 320ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "feedback-in-prev":
          "feedback-in-prev 320ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      maxWidth: {
        page: "1440px",
      },
    },
  },
  plugins: [],
}
