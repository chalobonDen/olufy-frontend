/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

const BASE_FONT_SIZE = {
  header: {
    lineHeight: '150%',
    fontWeight: 500,
  },
  body: {
    lineHeight: '150%',
    fontWeight: 400,
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      '4xl': { max: '1600px' },
      '3xl': { max: '1440px' },
      '2xl': { max: '1366px' },
      xl: { max: '1280px' },
      lg: { max: '1024px' },
      md: { max: '768px' },
      sm: { max: '640px' },
      xs: { max: '376px' },
      se: { max: '340px' },
    },

    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },

      fontSize: {
        'header-1': ['48px', BASE_FONT_SIZE.header],
        'header-2': ['36px', BASE_FONT_SIZE.header],
        'header-3': ['24px', BASE_FONT_SIZE.header],
        'header-4': ['20px', BASE_FONT_SIZE.header],
        'header-5': ['16px', BASE_FONT_SIZE.header],
        'header-6': ['14px', BASE_FONT_SIZE.header],
        'header-7': ['12px', BASE_FONT_SIZE.header],
        'body-24': ['24px', BASE_FONT_SIZE.body],
        'body-20': ['20px', BASE_FONT_SIZE.body],
        'body-18': ['18px', BASE_FONT_SIZE.body],
        'body-16': ['16px', BASE_FONT_SIZE.body],
        'body-14': ['14px', BASE_FONT_SIZE.body],
        'body-12': ['12px', BASE_FONT_SIZE.body],
        'body-10': ['10px', BASE_FONT_SIZE.body],
        se: ['0.625rem', { lineHeight: '1.5' }],
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.5' }],
      },

      colors: {
        primary: {
          100: '#FEEEEA',
          400: '#FD7E14',
          500: '#F44D29',
        },

        dark: {
          200: '#46484B',
          300: '#303136',
          400: '#191B20',
          500: '#0E1113',
        },

        white: {
          300: '#E5E5E5',
          400: '#828282',
          500: '#BDBDBD',
          600: '#F3F5F8',
          700: '#E7E8E8',
          800: '#CBCBCB',
          900: '#ffffff',
        },

        success: '#00B76A',
        error: '#E2494F',
        warning: '#FFC000',
        info: '#377DFF',

        purple: {
          100: '#ebdcf9',
          200: '#d7b9f3',
          300: '#c397ec',
          400: '#af74e6',
          500: '#9b51e0',
          600: '#7c41b3',
          700: '#5d3186',
          800: '#3e205a',
          900: '#1f102d',
        },

        red: {
          100: '#ffd6dd',
          200: '#feadbc',
          300: '#fe849a',
          400: '#fd5b79',
          500: '#fd3257',
          600: '#ca2846',
          700: '#981e34',
          800: '#651423',
          900: '#330a11',
        },
      },

      boxShadow: {
        '01': '0px 3px 16px rgba(47, 83, 109, 0.12)',
        '02': '0px 3px 16px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, addUtilities, addComponents, theme }) {
      matchUtilities(
        {
          square: (value) => ({
            width: value,
            height: value,
          }),
        },
        {
          values: theme('spacing'),
        },
      )

      addComponents({
        // Text Gradient
        '.text-gradient-primary': {
          backgroundImage: 'linear-gradient(150deg, #D52274 12.6%, #F44D29 54.68%, #FD7E14 87.4%)',
          backgroundClip: 'text',
          '-webkit-background-clip': 'text',
          textFillColor: 'transparent',
          '-webkit-text-fill-color': 'transparent',
        },

        // Background Gradient
        '.bg-gradient-primary': {
          backgroundImage: 'linear-gradient(150deg, #D52274 12.6%, #F44D29 54.68%, #FD7E14 87.4%)',
        },
      })

      addUtilities({
        '.min-h-screen': {
          minHeight: '100vh',
          minHeight: 'calc((var(--vh, 1vh) * 100))',
        },
        '.h-screen': {
          height: '100vh',
          height: 'calc((var(--vh, 1vh) * 100))',
        },
      })
    }),
  ],
}
