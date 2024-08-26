/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green": "#53E998",
        'grey': '#BFBFBF',
        'dark-grey': '#4F4F4F',
        'sky': '#56BCFF',
        "light-purple": "#5667FF",
        "dark-purple": "#353F9A",
        "custom-black": "#1B1B1B",
        'extra-light-purple': '#9EA8FF',
      },
      fontSize: {
        '28fs': '28px',
        '10fs': '10px',
      }
    },
  },
  plugins: [],
} 