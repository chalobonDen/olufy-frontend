import { Font, StyleSheet } from '@react-pdf/renderer'

import KanitRegularFont from '../Fonts/kanit/Kanit-Regular.ttf'
import { generateStyleSize } from './utils'

export type DocumentSizeType = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export const defaultFontFamily = 'Kanit'

export const sizes: {
  [key in DocumentSizeType]: number
} = {
  sm: 2,
  md: 5,
  lg: 10,
  xl: 15,
  '2xl': 20,
}

export const defaultDividerColor = '#CBCBCB'

const fontStyles = StyleSheet.create({
  title: {
    fontFamily: defaultFontFamily,
    fontSize: 16,
  },
  subTitle: {
    fontFamily: defaultFontFamily,
    fontSize: 10,
  },
  body: {
    fontFamily: defaultFontFamily,
    fontSize: 9.5,
    lineHeight: 1.25,
  },
})

const marginStyles = StyleSheet.create(generateStyleSize('margin'))
const paddingStyles = StyleSheet.create(generateStyleSize('padding'))

export const baseStyles = StyleSheet.create({
  page: {
    padding: '0.5in',
    position: 'relative',
    ...fontStyles.body,
  },
  ...fontStyles,
  ...marginStyles,
  ...paddingStyles,
})

// Register font
Font.register({
  family: defaultFontFamily,
  fonts: [
    {
      src: KanitRegularFont,
      fontWeight: 'normal',
    },
  ],
})
