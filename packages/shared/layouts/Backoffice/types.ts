import type { HTMLAttributes, ReactNode } from 'react'

export interface IBackofficeLayoutSubMenu<SymboleType = string> {
  label: string
  path: string
  symbole?: SymboleType
  isAvailable?: boolean
}

export interface IBackofficeLayoutMenuItem<SymboleType = string> extends IBackofficeLayoutSubMenu<SymboleType> {
  key: string
  iconName: string
  items?: IBackofficeLayoutSubMenu<SymboleType>[]
}

export interface IBackofficeLayoutProps extends HTMLAttributes<HTMLDivElement> {
  menu?: IBackofficeLayoutMenuItem[]
  urlPathname?: string
  navbar?: ReactNode
  homePath?: string
  sidebarFooter?: ReactNode
}
