/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/**/**/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.main-space-x': {
          padding: `0px ${theme('spacing.8')}`,
          '@media (max-width: 640px)': {
            padding: `0px ${theme('spacing.4')}`,
          },
          '@media (max-width: 340px)': {
            padding: `0px ${theme('spacing.3')}`,
          },
        },
        '.replace-main-space-x': {
          margin: `0px -${theme('spacing.8')}`,
          '@media (max-width: 640px)': {
            margin: `0px -${theme('spacing.4')}`,
          },
          '@media (max-width: 340px)': {
            margin: `0px -${theme('spacing.3')}`,
          },
        },
        '.container': {
          margin: '0 auto',
          maxWidth: '1280px',
          '@media (max-width: 1280px)': {
            maxWidth: '100%',
          },
        },
      })
    }),
  ],
  presets: [require('../shared/presets/olufy.cjs')],
}
