/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      colors: {
        gradientFrom: '#FF5A3B',
        gradientTo: '#FF8364'
      }

    },
  },
  plugins: [],
}

