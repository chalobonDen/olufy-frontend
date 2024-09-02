import type { FC, PropsWithChildren } from 'react'
import { useEffect, createContext } from 'react'

import { useSetting } from '@/hooks/stores/useSetting'

import type { PageContext as IPageContext } from './types'

interface IPageProviderProps {
  pageContext: IPageContext
}

export const PageContext = createContext<Partial<IPageContext>>({})

const PageProvider: FC<PropsWithChildren<IPageProviderProps>> = ({ pageContext, children }) => {
  const { theme } = useSetting()

  // - Set theme
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
    } else {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    }
  }, [theme])

  return <PageContext.Provider value={pageContext}>{children}</PageContext.Provider>
}

export default PageProvider
