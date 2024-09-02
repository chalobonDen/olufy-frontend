import type { FC } from 'react'

import type { Style } from '@react-pdf/types'
import { View } from '@react-pdf/renderer'

import { getStyles } from './styles'

interface IDocumentDividerProps {
  color?: string
  customStyles?: Style
}

const DocumentDivider: FC<IDocumentDividerProps> = ({ color, customStyles }) => {
  const styles = getStyles(color)

  return <View style={{ ...styles.divider, ...customStyles }} />
}

export default DocumentDivider
