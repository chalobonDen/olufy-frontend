import { StyleSheet } from '@react-pdf/renderer'

import { baseStyles } from '../styles'

export const getStyles = (color = 'red') =>
  StyleSheet.create({
    title: {
      ...baseStyles.title,
      textAlign: 'center',
      color,
    },
    subTitle: {
      ...baseStyles.subTitle,
      textAlign: 'center',
      color,
      marginTop: -2,
    },
    label: {
      color,
      width: 65,
    },
    customerLable: {
      color,
      ...baseStyles['mt-lg'],
    },
    address: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: 240,
    },
    addressInfo: {
      ...baseStyles['pr-sm'],
    },
    contentLabel: {
      flexDirection: 'row',
      lineHeight: 1.35,
    },
    contentLogo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      height: 40,
      width: 40,
      padding: 1,
      objectFit: 'contain',
    },
    logoText: {
      height: 22,
      padding: 1,
      marginLeft: 3,
    },
  })
