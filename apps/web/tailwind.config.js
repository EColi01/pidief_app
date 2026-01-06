/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E1E1E",
        secondary: "#2D2D2D",
        tertiary: "#F2F2F2",
        accent: "#007BFF",
        "accent-secondary": "#8A2BE2",
      }
    },
  },
  plugins: [],
}
