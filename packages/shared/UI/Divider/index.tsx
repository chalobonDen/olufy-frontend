import type { FC, HTMLAttributes } from 'react'

import clsx from 'clsx'

import './styles.scss'

interface IDividerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  type?: 'vertical' | 'horizontal'
}

const Divider: FC<IDividerProps> = ({ className, children, type = 'horizontal' }) => {
  if (children)
    return (
      <div className={clsx(`divider-text`, className)}>
        <span>{children}</span>
      </div>
    )

  return <div className={clsx('divider', [`divider-type-${type}`], className)}></div>
}

export default Divider
