import type { FC, PropsWithChildren } from 'react'
import { useEffect, useMemo } from 'react'

import { navigate } from 'vite-plugin-ssr/client/router'

import { useUserStore } from '@/stores/user'
import { GET_BACKOFFICE_SIDEBAR_CONFIG } from '@/constants/backoffice/sidebar'

import type { PageContext } from './types'
import { PageContextProvider } from './PageContext'
import { getIsBackoffice } from './utils'

import LayoutProvider from '@/layouts'
import { Layout } from '@/enums'

interface IProps extends PropsWithChildren {
  pageContext: PageContext
}

export const PageShell: FC<IProps> = ({ children, pageContext }) => {
  const { urlPathname } = pageContext
  const isBackoffice = getIsBackoffice(pageContext)
  const { profile } = useUserStore()
  const forbiddenPath = '/app/forbidden'

  // _Memo
  const menu = useMemo(() => {
    if (!profile || !profile?.role || !profile?.role?.rolePermissions) return []
    return GET_BACKOFFICE_SIDEBAR_CONFIG().filter((e) => profile.role.rolePermissions.includes(e.symbole))
  }, [profile])

  const findPermission = useMemo(
    () => menu.find((e) => e.path.split('/')[2] === urlPathname.split('/')[2]),
    [menu, urlPathname],
  )

  const mainPath = useMemo(() => {
    if (menu.length === 0) return forbiddenPath
    if (!findPermission) return menu[0].path
    return '/app/'
  }, [menu, findPermission])

  // _Effect
  useEffect(() => {
    if (!findPermission && menu.length === 0 && !!profile) navigate(forbiddenPath)
    if (!findPermission && menu.length > 0 && !!profile) navigate(mainPath)
  }, [findPermission, mainPath, menu, menu.length, profile])

  return (
    <PageContextProvider pageContext={pageContext} mainPath={mainPath}>
      <LayoutProvider
        pageContext={{
          ...pageContext,
          ...(isBackoffice
            ? {
                layout: Layout.BACKOFFICE,
                layoutProps: {
                  ...pageContext.layoutProps,
                  menu,
                },
              }
            : {}),
        }}
      >
        {children}
      </LayoutProvider>
    </PageContextProvider>
  )
}
