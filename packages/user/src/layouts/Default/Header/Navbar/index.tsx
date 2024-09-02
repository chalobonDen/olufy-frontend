import type { FC } from 'react'
import { Fragment, useRef } from 'react'

import clsx from 'clsx'
import { Popover } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import { GET_USER_NAVBAR_CONFIG } from '@/constants/user/navbar'
import Link from '@/components/Link'
import { IS_PRODUCTION } from '@/constants'

interface INavbarProps {
  className?: string
}

const Navbar: FC<INavbarProps> = ({ className }) => {
  const popoverCloseRef =
    useRef<
      (
        focusableElement?:
          | HTMLElement
          | React.MouseEvent<HTMLElement, MouseEvent>
          | React.MutableRefObject<HTMLElement>,
      ) => void
    >(null)
  const { i18n } = useLingui()

  return (
    <Fragment>
      <nav className={clsx(className, `space-x-8 lg:hidden`)}>
        <Popover
          button={<div>{i18n._(t`Products`)}</div>}
          buttonProps={(open) => ({
            size: 'small',
            className: clsx(`!px-2 !text-base`, {
              'bg-white-700': open,
              'dark:bg-dark-300': open,
            }),
          })}
          getClose={(e) => (popoverCloseRef.current = e)}
        >
          <div
            className={clsx([
              `grid gap-4`,
              {
                'w-[808px] grid-cols-3 xl:w-[720px]': !IS_PRODUCTION,
                'w-[420px] grid-cols-2': IS_PRODUCTION,
              },
            ])}
          >
            {GET_USER_NAVBAR_CONFIG().map((menu, menuIdx) => {
              if (menu.items.length === 0) return

              return (
                <div key={`menu-${menuIdx}`} className={clsx([`flex-1 space-y-2`])}>
                  <h4 className={clsx(`text-header-3`)}>{menu.title}</h4>
                  {menu.items.map((item, itemIdx) => {
                    return (
                      <Link
                        key={`item-${itemIdx}`}
                        href={item.path}
                        className={clsx([
                          `flex flex-1 items-center space-x-2 text-body-16`,
                          `rounded-lg px-2 py-4`,
                          'cursor-pointer hover:bg-white-700/70',
                          `dark:hover:bg-dark-300/70`,
                          {
                            'bg-white-700': false,
                          },
                        ])}
                        onClick={() => popoverCloseRef.current?.()}
                      >
                        <img src={item.imageUrl} className={clsx(`object-contain square-6`)} />
                        <span className={clsx(`flex-1`)}>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </Popover>

        <Link href="/contact" className={clsx(``)}>
          {i18n._(t`Contact`)}
        </Link>
      </nav>
    </Fragment>
  )
}

export default Navbar
