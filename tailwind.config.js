/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#79CCF2', // Màu chủ đạo của phòng khám
      }
    },
  },
  plugins: [],
}
