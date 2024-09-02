import type { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'
import { IoMenu } from 'react-icons/io5'

const TopNavbar: FC<
  PropsWithChildren & {
    onClickMenuIcon?: VoidFunction
  }
> = ({ onClickMenuIcon, children }) => {
  return (
    <div className={clsx(`backoffice-navbar`)}>
      <div className={clsx(`backoffice-navbar-left`)}>
        <IoMenu className={clsx(`backoffice-navbar-menu-icon`)} onClick={() => onClickMenuIcon?.()} />
      </div>

      <div className={clsx(`backoffice-navbar-right`)}>{children}</div>
    </div>
  )
}

export default TopNavbar
