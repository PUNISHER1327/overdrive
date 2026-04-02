/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        primary: "#7ED45A", // Turf Green
        secondary: "#F5C842", // Gold
        card: "#111111",
        border: "#1F1F1F",
        textPrimary: "#F0F0F0",
        textMuted: "#888888",
      },
      fontFamily: {
        bebas: ["'Bebas Neue'", "sans-serif"],
        dm: ["'DM Sans'", "sans-serif"],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
