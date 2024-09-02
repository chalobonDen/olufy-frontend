import type { FC } from 'react'

import { Canvas, View } from '@react-pdf/renderer'

import { getStyles } from './styles'

interface IDocumentTriangleProps {
  size?: number
  color: string
}

const DocumentTriangle: FC<IDocumentTriangleProps> = ({ color, size = 45 }) => {
  const styles = getStyles(size)

  return (
    <View style={styles.triangle}>
      <Canvas
        paint={(painterObject) => painterObject.save().moveTo(0, 0).lineTo(size, 0).lineTo(size, size).fill(color)}
      />
    </View>
  )
}

export default DocumentTriangle
