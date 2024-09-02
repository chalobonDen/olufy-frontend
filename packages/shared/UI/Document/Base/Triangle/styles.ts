import { StyleSheet } from '@react-pdf/renderer'

export const getStyles = (fontSize = 55) =>
  StyleSheet.create({
    triangle: {
      position: 'absolute',
      right: 3.5,
      top: 3.5,
      width: fontSize,
      height: fontSize,
    },
  })
