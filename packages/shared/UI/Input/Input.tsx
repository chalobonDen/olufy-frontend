import type { InputHTMLAttributes, ReactNode } from 'react'
import { Fragment, forwardRef } from 'react'

import clsx from 'clsx'

export type InputRef = HTMLInputElement

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> & {
  prefix?: ReactNode
  suffix?: ReactNode
  // size?: 'small' | 'large'
  inputClassName?: string
  isShowCharacter?: boolean
  error?: ReactNode
}

const Input = forwardRef<InputRef, InputProps>(
  (
    {
      className,
      prefix,
      suffix,
      maxLength,
      value,
      // size = 'small',
      inputClassName,
      isShowCharacter = false,
      error,
      ...props
    },
    ref,
  ) => {
    return (
      <Fragment>
        <div
          className={clsx(
            `input`,
            { 'is-invalid': typeof error === 'string' || !!error },
            // [`input-size-${size}`],
            className,
          )}
        >
          {prefix}
          <input ref={ref} {...props} maxLength={maxLength} value={value ?? ''} className={inputClassName} />
          {suffix}
        </div>
        {!!error && <span className={clsx(`input-invalid-message`)}>{error}</span>}
        {isShowCharacter && maxLength && (
          <span className={clsx(`input-display-characters`)}>
            {value ? String(value).length : 0}/{maxLength} characters
          </span>
        )}
      </Fragment>
    )
  },
)

Input.displayName = 'Input'

export default Input
