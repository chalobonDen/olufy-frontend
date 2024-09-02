import type { FC, PropsWithChildren } from 'react'
import { Fragment } from 'react'

import clsx from 'clsx'

import { Layout } from '@/enums'

interface IBlankLayoutProps extends PropsWithChildren {
  className?: string
}

const BlankLayout: FC<IBlankLayoutProps> = ({ className, children }) => {
  return (
    <Fragment>
      <main className={clsx(`relative z-10`, className)}>{children}</main>
    </Fragment>
  )
}

BlankLayout.displayName = Layout.DEFAULT

export default BlankLayout
