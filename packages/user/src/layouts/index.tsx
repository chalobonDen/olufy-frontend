import type { FC, PropsWithChildren } from 'react'
import { useMemo } from 'react'

import type { PageContext } from '@/renderer/types'
import { getLayout, getLayoutProps } from '@/renderer/utils'

import DefaultLayout from './Default'
import BlankLayout from './Blank'
import LoginLayout from './Login'
import BackofficeLayout from './Backoffice'

import { Layout } from '@/enums'

const RootLayout: FC<
  PropsWithChildren & {
    pageContext: PageContext
  }
> = ({ children, pageContext }) => {
  const layout = getLayout(pageContext)
  const layoutProps = getLayoutProps(pageContext)

  return useMemo(() => {
    switch (layout) {
      case Layout.BLANK:
        return <BlankLayout {...layoutProps}>{children}</BlankLayout>

      case Layout.LOGIN:
        return <LoginLayout {...layoutProps}>{children}</LoginLayout>

      case Layout.BACKOFFICE:
        return <BackofficeLayout {...layoutProps}>{children}</BackofficeLayout>

      default:
        return <DefaultLayout {...layoutProps}>{children}</DefaultLayout>
    }
  }, [children, layout, layoutProps])
}

export default RootLayout
