export { PageLayout }

import type { FC, PropsWithChildren } from 'react'
import { useState, useEffect } from 'react'

import clsx from 'clsx'

import Sidebar from '@/components/Sidebar'
import MainPage from '@/components/MainPage'
import ThemeToggleButton from '@/components/ThemeToggle'

import PageProvider from './PageContext'
import type { PageContext } from './types'
import { getHeadings } from './utils'

interface IPageLayoutProps {
  pageContext: PageContext
}

const PageLayout: FC<PropsWithChildren<IPageLayoutProps>> = ({ children, pageContext }) => {
  const { urlPathname, headings: _headings } = pageContext

  // _State
  const [headings, setHeadings] = useState(_headings)

  // _Effect
  useEffect(() => {
    if (!_headings) {
      const root = document.getElementById('page-view')
      setHeadings(getHeadings(root.innerHTML))
    }
  }, [urlPathname, _headings])

  return (
    <PageProvider
      pageContext={{
        ...pageContext,
        headings,
      }}
    >
      <header
        className={clsx(
          `main-space-x sticky top-0 z-50 w-full border-b border-white-300 backdrop-blur-sm`,
          `dark:border-dark-300`,
        )}
      >
        <div className={clsx(`container flex h-14 items-center`)}>
          <a href="/" className={clsx(`font-medium`)}>
            Olufy Docs
          </a>

          <ThemeToggleButton className={clsx(`ml-auto`)} />
        </div>
      </header>
      <div className={clsx(`main-space-x flex-1 border-b border-white-300`, `dark:border-dark-300`)}>
        <div className={clsx(`container`, `grid grid-cols-[240px_minmax(0,1fr)] gap-10`, `lg:grid-cols-1 lg:gap-0`)}>
          <Sidebar />
          <MainPage>{children}</MainPage>
        </div>
      </div>
      <footer className={clsx(`main-space-x`)}>
        <div className={clsx(`container flex h-10 items-center text-body-14`)}>Build by Mahiro.</div>
      </footer>
    </PageProvider>
  )
}
