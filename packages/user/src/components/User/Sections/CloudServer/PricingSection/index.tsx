import { useState } from 'react'

import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Tab } from '@headlessui/react'
import { SvgIcon } from '@olufy-frontend/shared/UI'

import UserContainer from '@/components/UI/User/Container'
import UserTitle from '@/components/UI/User/Title'

import UserCloudServerPricingCard from './Card'
import type { ICloudServerPricingData } from './types'

enum ServerType {
  LINUX,
  WINDOWS,
}

const tabStyle = clsx([
  `inline-flex min-w-[189px] items-center justify-center rounded-full py-2 space-x-2`,
  `sm:min-w-[auto] sm:w-full`,
])
const tabActiveStyle = clsx(`bg-primary-500 text-white-900`)

const mockLinux: ICloudServerPricingData[] = [
  {
    name: 'SSD-LINUX-01',
    price: {
      day: 29,
      month: 190,
      year: 2090,
    },
    cpu: `1 vCPU`,
    memory: `2 GB Memory`,
    storage: `Storage 30 SSD`,
    bandwidth: `Unlimited Bandwidth`,
  },
  {
    name: 'SSD-LINUX-02',
    price: {
      day: 39,
      month: 490,
      year: 5390,
    },
    cpu: `2 vCPU`,
    memory: `4 GB Memory`,
    storage: `Storage 40 SSD`,
    bandwidth: `Unlimited Bandwidth`,
  },
  {
    name: 'SSD-LINUX-03',
    price: {
      day: 49,
      month: 690,
      year: 8690,
    },
    cpu: `3 vCPU`,
    memory: `6 GB Memory`,
    storage: `Storage 50 SSD`,
    bandwidth: `Unlimited Bandwidth`,
  },
  {
    name: 'SSD-LINUX-04',
    price: {
      day: 59,
      month: 1090,
      year: 13090,
    },
    cpu: `4 vCPU`,
    memory: `8 GB Memory`,
    storage: `Storage 60 SSD`,
    bandwidth: `Unlimited Bandwidth`,
  },
]

const mockWindows: ICloudServerPricingData[] = [
  {
    name: 'SSD-WINDOWS-01',
    price: {
      day: 29,
      month: 190,
      year: 2090,
    },
    cpu: `1 vCPU`,
    memory: `2 GB Memory`,
    storage: `Storage 30 SSD`,
    bandwidth: `Unlimited Bandwidth`,
  },
  {
    name: 'SSD-WINDOWS-02',
    price: {
      day: 39,
      month: 490,
      year: 5390,
    },
    cpu: `2 vCPU`,
    memory: `4 GB Memory`,
    storage: `Storage 40 SSD`,
    bandwidth: `Unlimited Bandwidth`,
  },
  {
    name: 'SSD-WINDOWS-03',
    price: {
      day: 49,
      month: 690,
      year: 8690,
    },
    cpu: `3 vCPU`,
    memory: `6 GB Memory`,
    storage: `Storage 50 SSD`,
    bandwidth: `Unlimited Bandwidth`,
  },
  {
    name: 'SSD-WINDOWS-04',
    price: {
      day: 59,
      month: 1090,
      year: 13090,
    },
    cpu: `4 vCPU`,
    memory: `8 GB Memory`,
    storage: `Storage 60 SSD`,
    bandwidth: `Unlimited Bandwidth`,
  },
]

const UserCloudServerPricingSection = () => {
  const { i18n } = useLingui()
  const [selectedIndex, setSelectedIndex] = useState<ServerType>(ServerType.WINDOWS)

  return (
    <section className={clsx(`py-12`)}>
      <UserContainer className={clsx(`flex flex-col items-center`)}>
        <UserTitle className={clsx(`text-center`)}>{i18n._(t`Cloud Server`)}</UserTitle>

        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List
            className={clsx(`mt-10 flex rounded-full border border-white-600`, `dark:border-dark-300`, `sm:w-full`)}
          >
            <Tab
              className={clsx([
                tabStyle,
                {
                  [tabActiveStyle]: selectedIndex === ServerType.LINUX,
                  'text-primary-500': selectedIndex !== ServerType.LINUX,
                },
              ])}
            >
              <SvgIcon name="linux" className={clsx([`square-9`, `sm:square-6`])} />
              <span className={clsx(`text-header-3`, `sm:text-header-4`)}>Linux</span>
            </Tab>
            <Tab
              className={clsx([
                tabStyle,
                {
                  [tabActiveStyle]: selectedIndex === ServerType.WINDOWS,
                  'text-primary-500': selectedIndex !== ServerType.WINDOWS,
                },
              ])}
            >
              <SvgIcon name="windows" className={clsx([`square-9`, `sm:square-6`])} />
              <span className={clsx(`text-header-3`, `sm:text-header-4`)}>Windows</span>
            </Tab>
          </Tab.List>

          <Tab.Panels className={clsx(`mt-10 w-full`)}>
            <Tab.Panel className={clsx(`grid grid-cols-4 gap-6`, `2xl:gap-4`, `lg:grid-cols-2`, `sm:grid-cols-1`)}>
              {mockLinux.map((item, itemIdx) => (
                <UserCloudServerPricingCard key={`linux-${itemIdx}`} data={item} />
              ))}
            </Tab.Panel>
            <Tab.Panel className={clsx(`grid grid-cols-4 gap-6`, `2xl:gap-4`, `lg:grid-cols-2`, `sm:grid-cols-1`)}>
              {mockWindows.map((item, itemIdx) => (
                <UserCloudServerPricingCard key={`windows-${itemIdx}`} data={item} />
              ))}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </UserContainer>
    </section>
  )
}

export default UserCloudServerPricingSection
