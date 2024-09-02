import type { FC, HTMLAttributes } from 'react'

import clsx from 'clsx'

interface IUserTitle extends HTMLAttributes<HTMLHeadingElement> {}

const UserTitle: FC<IUserTitle> = ({ className, children, ...props }) => {
  return (
    <h2 className={clsx(`user-title`, className)} {...props}>
      {children}
    </h2>
  )
}

export default UserTitle
