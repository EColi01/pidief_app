/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#343333",
        secondary: "#F2F2F2",
        tertiary: "#A6A6A6",
      }
    },
  },
  plugins: [],
}
