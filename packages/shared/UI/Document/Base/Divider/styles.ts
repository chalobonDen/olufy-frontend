import { StyleSheet } from '@react-pdf/renderer'

import { defaultDividerColor } from '../styles'

export const getStyles = (color = defaultDividerColor) =>
  StyleSheet.create({
    divider: {
      backgroundColor: color,
      height: 1,
      width: '100%',
      marginVertical: 5,
    },
  })
