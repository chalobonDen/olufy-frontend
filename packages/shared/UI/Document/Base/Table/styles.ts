import { StyleSheet } from '@react-pdf/renderer'

import { baseStyles, defaultDividerColor } from '../styles'

export const styles = StyleSheet.create({
  table: {
    width: 'auto',
    ...baseStyles['mt-lg'],
  },
  tableHeader: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: defaultDividerColor,
    borderTopWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    textAlign: 'center',
    width: '20%',
    borderColor: defaultDividerColor,
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRight: 0,
    borderTopWidth: 0,
    ...baseStyles['px-sm'],
  },
  tableCell: {
    ...baseStyles['py-md'],
    fontSize: 10,
  },
})
