import type { InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef, Fragment } from 'react'

import clsx from 'clsx'

interface ITextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  error?: ReactNode
  isBgTransparent?: boolean
  isRounded?: boolean
  textAreaClassName?: string
}

const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  ({ className, isBgTransparent, isRounded = true, maxLength, error, value, textAreaClassName, ...props }, ref) => {
    return (
      <Fragment>
        <div
          className={clsx(
            `input textarea`,
            isBgTransparent ? `is-bg-transparent` : ``,
            { 'is-invalid': typeof error === 'string' || !!error },
            isRounded ? 'is-rounded' : '',
            className,
          )}
        >
          <textarea ref={ref} {...props} maxLength={maxLength} value={value} className={textAreaClassName} />
        </div>
        {!!error && <span className={clsx(`input-invalid-message`)}>{error}</span>}
        {maxLength && (
          <span className={clsx(`input-display-characters`)}>
            {value ? String(value).length : 0}/{maxLength} characters
          </span>
        )}
      </Fragment>
    )
  },
)

TextArea.displayName = 'TextArea'

export default TextArea
