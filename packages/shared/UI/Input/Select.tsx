import type { ReactNode, SelectHTMLAttributes } from 'react'
import { Fragment, forwardRef } from 'react'

import clsx from 'clsx'

export interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: ReactNode
}

const Select = forwardRef<HTMLSelectElement, ISelectProps>(({ error, className, children, ...props }, ref) => {
  return (
    <Fragment>
      <div className={clsx(`input`, { 'is-invalid': typeof error === 'string' || !!error }, className)}>
        <select ref={ref} {...props}>
          {children}
        </select>
      </div>

      {!!error && <span className={clsx(`input-invalid-message`)}>{error}</span>}
    </Fragment>
  )
})

Select.displayName = 'SelectInput'

export default Select
