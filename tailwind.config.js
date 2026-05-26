/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      colors: {
        accent: "#7c6aff",
        "accent-light": "#a78bfa",
      },
    },
  },
  plugins: [],
};
