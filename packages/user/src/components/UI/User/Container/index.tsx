import type { HTMLAttributes } from 'react'
import { forwardRef } from 'react'

import clsx from 'clsx'

type UserContainerSize = 'base' | 'fluid'

export interface IUserContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: UserContainerSize
}

const SIZE = {
  base: 'max-w-[1280px] mx-auto xl:max-w-full',
  fluid: 'max-w-full mx-auto',
}

const UserContainer = forwardRef<HTMLDivElement, IUserContainerProps>(
  ({ size = 'base', className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx(`user-container`, SIZE[size], className)} {...props}>
        {children}
      </div>
    )
  },
)

UserContainer.displayName = 'UserContainer'

export default UserContainer
