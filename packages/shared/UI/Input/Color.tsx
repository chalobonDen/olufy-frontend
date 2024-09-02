import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import type { InputProps } from './Input'
import Input from './Input'

export interface IColorProps extends InputProps {
  error?: ReactNode
}

const Color = forwardRef<HTMLInputElement, IColorProps>(({ type, ...props }, ref) => {
  return <Input ref={ref} type="color" {...props} />
})

Color.displayName = 'ColorInput'

export default Color
