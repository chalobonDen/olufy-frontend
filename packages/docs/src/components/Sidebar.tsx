import type { FC } from 'react'

import clsx from 'clsx'

import { SIDEBAR_CONFIG } from '@/constants'
import usePageContext from '@/hooks/usePageContext'

import type { ISidebarNavItem } from '@/types/nav'

interface ISibebarItemsProps {
  items: ISidebarNavItem[]
  pathname: string
}

const SibebarItems: FC<ISibebarItemsProps> = ({ items, pathname }) => {
  return (
    <div className={clsx(`mt-1 grid grid-flow-row auto-rows-max text-body-14`)}>
      {items.map((item, itemIdx) =>
        item.href && !item.disabled ? (
          <a
            key={`item-${itemIdx}`}
            href={item.href}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
            className={clsx(`px-2 py-1 hover:underline`, {
              desc: pathname !== item.href,
            })}
          >
            {item.title}
            {item.label && <span>{item.label}</span>}
          </a>
        ) : (
          <span key={`item-${itemIdx}`} className={clsx(`px-2 py-1`)}>
            {item.title}
            {item.label && <span>{item.label}</span>}
          </span>
        ),
      )}
    </div>
  )
}

const Sidebar = () => {
  const { urlPathname } = usePageContext()

  return (
    <aside className={clsx(`sticky top-14 self-start py-8 pl-8 pr-6`, `lg:pointer-events-none lg:fixed lg:opacity-0`)}>
      {SIDEBAR_CONFIG.map((item, itemIdx) => (
        <div key={itemIdx} className={clsx(`pb-4`)}>
          <h4>{item.title}</h4>
          {item.items?.length && <SibebarItems items={item.items} pathname={urlPathname} />}
        </div>
      ))}
    </aside>
  )
}

export default Sidebar
