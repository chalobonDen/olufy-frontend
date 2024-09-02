import type { Dispatch, FC, SetStateAction } from 'react'
import { useCallback, useState, createContext } from 'react'

import SharedBackofficeLayout from '@olufy-frontend/shared/layouts/Backoffice'
import type { IBackofficeLayoutProps } from '@olufy-frontend/shared/layouts/Backoffice/types'
import { SimplePageLoader } from '@olufy-frontend/shared/UI'

import { usePageContext } from '@/hooks/usePageContext'

import BackofficeLayoutNavbar from './Navbar'
import BackofficeLayoutSidebarFooter from './Sidebar/Footer'

import { Layout } from '@/enums'

interface IBackofficeLayoutContext {
  setSimplePageLoadingVisible: Dispatch<SetStateAction<boolean>>
  scrollToTop: VoidFunction
}

export const BackofficeLayoutContext = createContext<Partial<IBackofficeLayoutContext>>({})

const BackofficeLayout: FC<IBackofficeLayoutProps> = ({ children, menu, ...props }) => {
  const { urlPathname } = usePageContext()

  // _State
  const [simplePageLoadingVisible, setSimplePageLoadingVisible] = useState<boolean>(false)

  // _Callback
  const scrollToTop = useCallback(() => {
    document.querySelector('main').scrollTo(0, 0)
  }, [])

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
        homePath={'/app/'}
        navbar={<BackofficeLayoutNavbar menu={menu} />}
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
