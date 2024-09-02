import type { FC } from 'react'
import { useState } from 'react'

import clsx from 'clsx'

import BackofficeSidebar from './Sidebar'
import type { IBackofficeLayoutProps } from './types'
import TopNavbar from './TopNavbar'

import './styles.scss'

const BackofficeLayout: FC<IBackofficeLayoutProps> = ({
  menu,
  navbar,
  urlPathname,
  children,
  homePath,
  sidebarFooter,
}) => {
  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false)

  return (
    <div className={clsx(`backoffice-layout`)}>
      <div
        className={clsx(`backoffice-sidebar-overlay`, {
          active: isShowSidebar,
        })}
        onClick={() => setIsShowSidebar(false)}
      ></div>
      <BackofficeSidebar
        isShowSidebar={isShowSidebar}
        menu={menu}
        urlPathname={urlPathname}
        onClickLink={() => setIsShowSidebar(false)}
        homePath={homePath}
        sidebarFooter={sidebarFooter}
      />
      <div className={clsx(`backoffice-content`)}>
        <TopNavbar onClickMenuIcon={() => setIsShowSidebar((e) => !e)}>{navbar}</TopNavbar>
        <main>{children}</main>
      </div>
    </div>
  )
}

BackofficeLayout.displayName = 'BackofficeLayout'

export default BackofficeLayout
