import type { FC, HTMLAttributes } from 'react'
import { Fragment } from 'react'

import clsx from 'clsx'

import { Layout } from '@/enums'

interface IDefaultLayoutProps extends HTMLAttributes<HTMLDivElement> {}

const DefaultLayout: FC<IDefaultLayoutProps> = ({ className, children }) => {
  return (
    <Fragment>
      <main className={clsx(`relative z-10`, className)}>{children}</main>
    </Fragment>
  )
}

DefaultLayout.displayName = Layout.DEFAULT

export default DefaultLayout
