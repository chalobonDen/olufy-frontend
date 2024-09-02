import type { FC, ReactNode } from 'react'
import { useRef, useEffect, useCallback, Fragment, useMemo } from 'react'

import clsx from 'clsx'
import { Disclosure } from '@headlessui/react'
import { IoChevronBack } from 'react-icons/io5'

import { Logo, SvgIcon } from '../../../UI'
import type { IBackofficeLayoutMenuItem } from '../types'
import { useIsMounted } from '../../../hooks'

interface IBackofficeSidebarProps {
  isShowSidebar?: boolean
  menu: IBackofficeLayoutMenuItem[]
  urlPathname?: string
  onClickLink?: VoidFunction
  homePath?: string
  sidebarFooter?: ReactNode
}

const BackofficeSidebar: FC<IBackofficeSidebarProps> = ({
  isShowSidebar = false,
  urlPathname,
  menu,
  onClickLink,
  homePath = '/',
  sidebarFooter,
}) => {
  const { isMounted } = useIsMounted()
  const sidebarRef = useRef<HTMLElement>()

  // _Callback
  const getIsActive = useCallback(
    (path: string) => {
      if (!urlPathname) return false
      if (path === '/app' || path === '/app/') return urlPathname === path || urlPathname === path + '/'
      if (urlPathname.split('/')[2] === 'app') return urlPathname.split('/')[3] === path.split('/')[3]
      return urlPathname.split('/')[2] === path.split('/')[2]
    },
    [urlPathname],
  )

  const getIsSubActive = useCallback(
    (path: string) => {
      if (!urlPathname) return false
      if (urlPathname.split('/')[2] === 'app')
        return urlPathname.split('/')[3] === path.split('/')[3] && urlPathname.split('/')[4] === path.split('/')[4]
      return urlPathname.split('/')[2] === path.split('/')[2] && urlPathname.split('/')[3] === path.split('/')[3]
    },
    [urlPathname],
  )

  // _Memo
  const renderMenu = useMemo(() => {
    return (
      <Fragment>
        {menu.map((item, itemIdx) => (
          <div key={`menu-${itemIdx}`} className={clsx(`backoffice-sidebar-menu`)} data-key={item.key}>
            {!(item?.items?.length > 0) ? (
              <a
                href={item.path}
                className={clsx(`backoffice-sidebar-menu-link`, {
                  active: getIsActive(item.path),
                })}
                onClick={() => onClickLink?.()}
              >
                <SvgIcon name={item.iconName} />
                <span>{item.label}</span>
              </a>
            ) : (
              <Disclosure defaultOpen={getIsActive(item.path)}>
                <Disclosure.Button
                  className={clsx(`backoffice-sidebar-menu-link`, {
                    active: getIsActive(item.path),
                    'root-active': getIsActive(item.path),
                  })}
                >
                  {item?.iconName && <SvgIcon name={item.iconName} />}
                  <span>{item.label}</span>
                  <IoChevronBack className={clsx(`menu-caret`)} />
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                  {item.items?.map((submenu, submenuIdx) => (
                    <a
                      key={`submenu-${submenuIdx}`}
                      href={submenu.path}
                      className={clsx(`backoffice-sidebar-submenu-link`, {
                        active: getIsSubActive(submenu.path),
                      })}
                      onClick={() => onClickLink?.()}
                    >
                      <span>{submenu.label}</span>
                    </a>
                  ))}
                </Disclosure.Panel>
              </Disclosure>
            )}
          </div>
        ))}
      </Fragment>
    )
  }, [menu, getIsActive, onClickLink, getIsSubActive])

  // _Effect
  useEffect(() => {
    if (sidebarRef.current && renderMenu?.props?.children?.length > 0) {
      const sidebarElem = sidebarRef.current
      const menusElem = sidebarElem.querySelector('.backoffice-sidebar-menus') as HTMLElement
      const menus = menusElem.querySelectorAll('.backoffice-sidebar-menu')

      menus.forEach((menu: Element) => {
        const activeElem = menu.querySelector('.active') as HTMLElement
        if (menu.contains(activeElem)) {
          menusElem.scrollTo({
            top:
              activeElem.offsetTop -
              (menusElem.getBoundingClientRect().height - menu.getBoundingClientRect().height) / 2,
          })
        }
      })
    }
  }, [renderMenu])

  return (
    <aside
      ref={sidebarRef}
      className={clsx(`backoffice-sidebar`, {
        active: isShowSidebar,
      })}
    >
      <div className={clsx(`backoffice-sidebar-logo`)}>
        <a href={homePath} onClick={() => onClickLink?.()}>
          <Logo />
        </a>
      </div>

      <div className={clsx(`backoffice-sidebar-menus`)}>{isMounted && renderMenu}</div>

      {sidebarFooter && <div className={clsx(`backoffice-sidebar-footer`)}>{sidebarFooter}</div>}
    </aside>
  )
}

export default BackofficeSidebar
