export interface INavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  label?: string
}

export interface INavItemWithChildren extends INavItem {
  items: INavItemWithChildren[]
}

export interface ISidebarNavItem extends INavItemWithChildren {}
