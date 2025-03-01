/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/**/**/**/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [require('../shared/presets/olufy.cjs')],
}
