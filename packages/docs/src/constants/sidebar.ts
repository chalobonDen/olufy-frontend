import type { ISidebarNavItem } from '@/types/nav'

export const SIDEBAR_CONFIG: ISidebarNavItem[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/',
        items: [],
      },
      {
        title: 'Installation',
        href: '/installation',
        items: [],
      },
      {
        title: 'Project Structure',
        href: '/project-structure',
        items: [],
      },
    ],
  },
  {
    title: 'Conponents',
    items: [
      {
        title: 'Button',
        href: '/components/button',
        items: [],
      },
    ],
  },
  {
    title: 'Hooks',
    items: [
      {
        title: 'useSomething',
        href: '/hooks/use-something',
        items: [],
      },
    ],
  },
]
