import type { FC, PropsWithChildren } from 'react'
import { useEffect, useMemo } from 'react'

import { useUserStore } from '@/stores/user'
import { GET_BACKOFFICE_SIDEBAR_CONFIG } from '@/constants/backoffice/sidebar'
import useRouter from '@/hooks/useRouter'

import type { PageContext } from './types'
import { PageContextProvider } from './PageContext'
import { getIsBackoffice } from './utils'

import LayoutProvider from '@/layouts'
import { Layout } from '@/enums'

interface IProps extends PropsWithChildren {
  pageContext: PageContext
}

export const PageShell: FC<IProps> = ({ children, pageContext }) => {
  const { urlPathname, locale } = pageContext
  const isBackoffice = getIsBackoffice(pageContext)
  const { profile } = useUserStore()
  const { push } = useRouter()
  const forbiddenPath = '/app/forbidden'

  // _Memo
  const menu = useMemo(() => {
    // if (!profile || !profile?.role || !profile?.role?.rolePermissions) return []
    // return GET_BACKOFFICE_SIDEBAR_CONFIG().filter((e) => profile.role.rolePermissions.includes(e.symbole))
    return GET_BACKOFFICE_SIDEBAR_CONFIG()
  }, [])

  const findPermission = useMemo(() => {
    // Force handle pathname `/settings/profile`
    if (urlPathname.includes('/settings/profile')) return true

    // Find menu for check condition
    const foundMenu = menu.find((e) => e.path.split('/')[2] === urlPathname.split('/')[3])

    // Find sub menu for check condition
    if (foundMenu?.items?.length > 0)
      !!foundMenu.items.find(
        (e) => e.path.split('/')[2] === urlPathname.split('/')[3] && e.path.split('/')[3] === urlPathname.split('/')[4],
      )

    // return find menu
    return !!foundMenu
  }, [menu, urlPathname])

  const mainPath = useMemo(() => {
    if (menu.length === 0) return '/' + locale + forbiddenPath
    if (!findPermission) return menu[0].path
    return '/app/'
  }, [menu, locale, findPermission])

  // _Effect
  useEffect(() => {
    if (isBackoffice && !findPermission && menu.length === 0 && !!profile) push(forbiddenPath)
    if (isBackoffice && !findPermission && menu.length > 0 && !!profile) push(mainPath)
  }, [isBackoffice, findPermission, mainPath, menu, menu.length, profile, push])

  return (
    <PageContextProvider pageContext={pageContext}>
      <LayoutProvider
        pageContext={{
          ...pageContext,
          ...(isBackoffice
            ? {
                layout: Layout.BACKOFFICE,
              }
            : {}),
        }}
      >
        {children}
      </LayoutProvider>
    </PageContextProvider>
  )
}
