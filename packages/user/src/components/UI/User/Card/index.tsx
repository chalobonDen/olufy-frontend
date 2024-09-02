import type { FC, HTMLAttributes } from 'react'

import clsx from 'clsx'

interface IUserCardProps extends HTMLAttributes<HTMLDivElement> {}

const UserCard: FC<IUserCardProps> = ({ className, children, ...props }) => {
  return (
    <div className={clsx(`user-card`, className)} {...props}>
      {children}
    </div>
  )
}

export default UserCard
