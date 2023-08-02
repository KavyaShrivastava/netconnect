/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      animation: {
        neonGlow: "neonGlow 1.5s linear infinte",
      },
      keyframes: {
        neonGlow: {
          "0%": { boxShadow: "0 0 0 0 rgba(255, 140, 0, 0.7)" },
          "50%, 100%": { boxShadow: "0 0 0 2px rgba(255, 140, 0, 0.7)" },
        },
      },

    },
  },
  plugins: [],
}

