/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./UI/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [require('./presets/olufy.cjs')],
}
