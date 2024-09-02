import type { InputHTMLAttributes, PropsWithChildren } from 'react'
import { forwardRef } from 'react'

import clsx from 'clsx'

export type RadioRef = HTMLInputElement

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  PropsWithChildren & {
    inputClassName?: string
  }

const Radio = forwardRef<RadioRef, InputProps>(({ inputClassName, className, children, ...props }, ref) => {
  return (
    <label className={clsx(`radio`, className)}>
      <input ref={ref} type="radio" className={clsx(inputClassName)} {...props} />
      {children}
    </label>
  )
})

Radio.displayName = 'Radio'

export default Radio
