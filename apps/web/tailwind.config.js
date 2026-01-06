/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a192f",
        secondary: "#172a45",
        tertiary: "#F2F2F2",
        accent: "#007BFF",
        "accent-secondary": "#8A2BE2",
      }
    },
  },
  plugins: [],
}
