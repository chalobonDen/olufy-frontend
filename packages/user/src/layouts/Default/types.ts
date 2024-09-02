import type { HTMLAttributes } from 'react'

export interface IDefaultLayoutProps extends HTMLAttributes<HTMLDivElement> {
  isTopFooter?: boolean
  urlPathname?: string
}
