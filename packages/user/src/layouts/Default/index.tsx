import type { FC } from 'react'
import { Fragment } from 'react'

import clsx from 'clsx'

import useCookieConsent from '@/hooks/userCookieConsent'

import Header from './Header'
import type { IDefaultLayoutProps } from './types'
import Footer from './Footer'

import { Layout } from '@/enums'

const DefaultLayout: FC<IDefaultLayoutProps> = ({ className, children, isTopFooter = true }) => {
  useCookieConsent()

  return (
    <Fragment>
      <Header />
      <main className={clsx(`relative z-10`, className)}>{children}</main>
      <Footer isTopFooter={isTopFooter} />
    </Fragment>
  )
}

DefaultLayout.displayName = Layout.DEFAULT

export default DefaultLayout
