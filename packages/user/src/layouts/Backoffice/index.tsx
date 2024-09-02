import type { Dispatch, FC, SetStateAction } from 'react'
import { useMemo, useCallback, useState, createContext } from 'react'

import SharedBackofficeLayout from '@olufy-frontend/shared/layouts/Backoffice'
import type { IBackofficeLayoutProps } from '@olufy-frontend/shared/layouts/Backoffice/types'
import { SimplePageLoader } from '@olufy-frontend/shared/UI'

import { GET_BACKOFFICE_SIDEBAR_CONFIG } from '@/constants/backoffice/sidebar'
import { useSetting } from '@/hooks/stores/useSetting'
import { usePageContext } from '@/hooks/usePageContext'

import BackofficeLayoutNavbar from './Navbar'
import BackofficeLayoutSidebarFooter from './Sidebar/Footer'

import { Layout } from '@/enums'

interface IBackofficeLayoutContext {
  setSimplePageLoadingVisible: Dispatch<SetStateAction<boolean>>
  scrollToTop: VoidFunction
}

export const BackofficeLayoutContext = createContext<Partial<IBackofficeLayoutContext>>({})

const BackofficeLayout: FC<IBackofficeLayoutProps> = ({ children, ...props }) => {
  const { lang } = useSetting()
  const { urlPathname } = usePageContext()

  // _State
  const [simplePageLoadingVisible, setSimplePageLoadingVisible] = useState<boolean>(false)

  // _Callback
  const scrollToTop = useCallback(() => {
    document.querySelector('main').scrollTo(0, 0)
  }, [])

  // _Memo
  const menu = useMemo(() => {
    return GET_BACKOFFICE_SIDEBAR_CONFIG().map((e) => {
      if (e?.items?.length > 0) {
        return {
          ...e,
          path: `/${lang}${e.path}`,
          items: e.items.map((item) => ({
            ...item,
            path: `/${lang}${item.path}`,
          })),
        }
      }

      return { ...e, path: `/${lang}${e.path}` }
    })
  }, [lang])

  return (
    <BackofficeLayoutContext.Provider
      value={{
        setSimplePageLoadingVisible,
        scrollToTop,
      }}
    >
      {simplePageLoadingVisible && <SimplePageLoader />}

      <SharedBackofficeLayout
        menu={menu}
        homePath={`/${lang}/app/`}
        navbar={<BackofficeLayoutNavbar />}
        sidebarFooter={<BackofficeLayoutSidebarFooter />}
        urlPathname={urlPathname}
        {...props}
      >
        {children}
      </SharedBackofficeLayout>
    </BackofficeLayoutContext.Provider>
  )
}

BackofficeLayout.displayName = Layout.BACKOFFICE

export default BackofficeLayout
