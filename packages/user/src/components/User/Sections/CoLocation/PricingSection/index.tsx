import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { t } from '@lingui/macro'

import UserContainer from '@/components/UI/User/Container'
import UserTitle from '@/components/UI/User/Title'

import type { IColocationPricingData } from './types'
import { UserColocationPricingCard } from './Card'

const mockItems = [
  {
    content: 'CSLoxinfo @ The Cloud',
  },
  {
    content: 'Port 1 Gbps (Dedicated)',
  },
  {
    content: 'Unlimited domestic bandwidth',
  },
  {
    content: 'International 7/7 Mbps per IP',
  },
  {
    content: 'FREE! Firewall protection',
  },
]

const mockColocation: IColocationPricingData[] = [
  {
    name: '1U Rack',
    price: 2000,
    items: mockItems,
  },
  {
    name: '2U Rack',
    price: 3500,
    items: mockItems,
  },
  {
    name: '4U Rack',
    price: 6500,
    items: mockItems,
  },
  {
    name: '1/4U Rack (10U)',
    price: 10000,
    items: mockItems,
  },
  {
    name: '1/2U Rack (20U)',
    price: 15000,
    items: mockItems,
  },
  {
    name: 'FULL Rack',
    price: 30000,
    items: mockItems,
  },
]

const UserColocationPricingSection = () => {
  const { i18n } = useLingui()
  return (
    <section className={clsx(`pb-10 pt-8`)}>
      <UserContainer className={clsx(`flex flex-col items-center`)}>
        <UserTitle className={clsx(`text-center`)}>{i18n._(t`CDN`)}</UserTitle>

        <div className={clsx(`mt-10 grid w-full grid-cols-3 gap-6`, `2xl:gap-4`, `lg:grid-cols-2`, `sm:grid-cols-1`)}>
          {mockColocation.map((item, itemIdx) => (
            <UserColocationPricingCard key={`vps-server-${itemIdx}`} data={item} />
          ))}
        </div>
      </UserContainer>
    </section>
  )
}

export default UserColocationPricingSection
