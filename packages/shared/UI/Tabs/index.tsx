import type { Fragment } from 'react'

import type { TabGroupProps, TabListProps, TabPanelProps, TabPanelsProps, TabProps } from '@headlessui/react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { useIsMounted } from '../../hooks'

import './styles.scss'

const TabsList = ({ className, ...props }: TabListProps<'div'>) => {
  return <Tab.List className={clsx(`tabs-list`, className)} {...props} />
}

const TabsTrigger = ({ className, ...props }: TabProps<'button'>) => {
  return (
    <Tab
      className={({ selected }) =>
        clsx(
          `tabs-trigger`,
          {
            'tabs-trigger-selected': selected,
          },
          className,
        )
      }
      {...props}
    />
  )
}

const TabsPanels = ({ className, ...props }: TabPanelsProps<'div'>) => {
  return <Tab.Panels className={clsx(`tabs-trigger`, className)} {...props} />
}

const TabsContent = ({ className, ...props }: TabPanelProps<'div'>) => {
  return <Tab.Panel className={clsx(`tabs-trigger`, className)} {...props} />
}

const Tabs = ({ ...props }: TabGroupProps<typeof Fragment>) => {
  const { isMounted } = useIsMounted()

  return !isMounted ? null : <Tab.Group {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsPanels, TabsContent }
