import { StyleSheet } from '@react-pdf/renderer'

import { baseStyles } from '../styles'

export const getStyles = (color = 'red') =>
  StyleSheet.create({
    ...baseStyles,
    summaryContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },

    detailContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    labelContent: {
      width: 100,
    },
    labelText: {
      textAlign: 'right',
      color: color,
    },
    valueText: { ...baseStyles['ml-2xl'], maxWidth: 150 },
  })
