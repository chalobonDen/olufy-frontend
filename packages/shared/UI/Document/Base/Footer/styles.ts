import { StyleSheet } from '@react-pdf/renderer'

import { baseStyles } from '../styles'

export const styles = StyleSheet.create({
  ...baseStyles,
  footerContent: {
    paddingHorizontal: '0.5in',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },

  InvoiceCheckbox: {
    flexDirection: 'row',
  },

  checkbox: {
    ...baseStyles['ml-lg'],
  },

  invoiceSignature: {
    ...baseStyles['mt-lg'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    ...baseStyles['py-sm'],
    height: 70,
    width: 70,
    objectFit: 'contain',
    marginHorizontal: 'auto',
  },

  signContent: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 50,
  },

  signText: {
    ...baseStyles['mr-lg'],
    width: '100%',
  },

  dateText: {
    width: '100%',
  },
})
