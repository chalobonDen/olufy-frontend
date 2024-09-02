import type { FC } from 'react'

import type { IDrawerProps } from '@olufy-frontend/shared/UI/Drawer'
import clsx from 'clsx'
import { Drawer } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Disclosure } from '@headlessui/react'
import { IoChevronDown } from 'react-icons/io5'

import { GET_USER_NAVBAR_CONFIG } from '@/constants/user/navbar'
import Link from '@/components/Link'

interface INavbarMobileProps extends IDrawerProps {}

const NavbarMobile: FC<INavbarMobileProps> = ({ ...props }) => {
  const { i18n } = useLingui()

  return (
    <Drawer
      {...props}
      dialogPanelClassName={clsx(`p-4`)}
      iconCloseClassName={clsx(`!square-8`)}
      className={clsx(`hidden`, `lg:block`)}
    >
      <div className={clsx(`mt-12 space-y-4`)}>
        {GET_USER_NAVBAR_CONFIG()
          .filter((e) => e.items.length > 0)
          .map((menu, menuIdx) => (
            <div key={`menu-${menuIdx}`}>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={clsx([
                        `flex items-center justify-between`,
                        `w-full rounded-lg bg-white-700/30 p-4 text-left`,
                        `dark:bg-dark-300/40`,
                      ])}
                    >
                      <span>{menu.title}</span>
                      <IoChevronDown
                        className={clsx([
                          `h-5 w-5 text-dark-500/50`,
                          `dark:text-white-900/50`,
                          {
                            'rotate-180 transform': open,
                          },
                        ])}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className={clsx([`px-4`])}>
                      <ul>
                        {menu.items.map((item, itemIdx) => (
                          <li
                            key={`item-${itemIdx}`}
                            className={clsx(`h-14 border-b border-white-700/50`, `dark:border-dark-300/50`)}
                          >
                            <Link
                              href={item.path}
                              title={item.label}
                              className={clsx(`flex h-full items-center space-x-2`)}
                            >
                              <img src={item.imageUrl} className={clsx(`object-contain square-6`)} />
                              <span className={clsx(`flex-1`)}>{item.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}

        <Link
          href="/contact"
          className={clsx([`mt-4 block`, `w-full rounded-lg bg-white-700/30 p-4 text-left`, `dark:bg-dark-300/40`])}
        >
          {i18n._(t`Contact`)}
        </Link>
      </div>
    </Drawer>
  )
}

export default NavbarMobile
