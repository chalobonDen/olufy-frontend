import type { HTMLAttributes, ReactNode } from 'react'
import { FC, forwardRef } from 'react'

import clsx from 'clsx'

import './styles.scss'
import Divider from '../Divider'

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  headerRight?: ReactNode
  hasDivider?: boolean
  headerClassName?: string
  titleClassName?: string
}

const Card = forwardRef<HTMLDivElement, ICardProps>(
  ({ className, title, headerRight, hasDivider, children, headerClassName, titleClassName }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          `card`,
          {
            'has-divider': hasDivider,
          },
          className,
        )}
      >
        {title && (
          <div className={clsx(`card-header`, headerClassName)}>
            <h3 className={clsx(titleClassName)}>{title}</h3>
            {headerRight}
          </div>
        )}
        {hasDivider && <Divider />}
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'

export default Card
