import type { HTMLAttributes, PropsWithChildren } from 'react'
import { forwardRef } from 'react'

import clsx from 'clsx'
import { IoDocumentText } from 'react-icons/io5'

import './styles.scss'

interface IEmptyProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  content?: string
}

const Empty = forwardRef<HTMLDivElement, IEmptyProps>(({ content = 'Empty data...', className, children }, ref) => {
  return (
    <div ref={ref} className={clsx(`empty`, className)}>
      <IoDocumentText className={clsx(`empty-icon`)} />
      {children ? children : <span>{content}</span>}
    </div>
  )
})

Empty.displayName = 'Empty'

export default Empty
