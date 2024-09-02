import type { InputHTMLAttributes, PropsWithChildren } from 'react'
import { forwardRef } from 'react'

import clsx from 'clsx'

import './styles.scss'

export type CheckboxRef = HTMLInputElement

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  PropsWithChildren & {
    inputClassName?: string
  }

const Checkbox = forwardRef<CheckboxRef, InputProps>(({ inputClassName, className, children, ...props }, ref) => {
  return (
    <label className={clsx(`checkbox`, className)}>
      <input ref={ref} type="checkbox" className={clsx(inputClassName)} {...props} />
      {children}
    </label>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
