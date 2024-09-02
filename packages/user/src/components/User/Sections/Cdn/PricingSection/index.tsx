import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'

import UserTitle from '@/components/UI/User/Title'
import UserContainer from '@/components/UI/User/Container'

import UserCdnPricingCard from './Card'
import type { ICdnrPricingData } from './types'

const mockCdn: ICdnrPricingData[] = [
  {
    name: 'CDN #1',
    price: 1200,
    storage: `Storage 30 GB`,
    transfer: `Transfer 20 TB (Monthly)`,
    bandwidth: `Bandwidth 3 Gbps`,
    ftp: `FTP, Web Manager`,
    subDomain: `Subdomain *.cdn.csne.cloud`,
  },
  {
    name: 'CDN #2',
    price: 2500,
    storage: `Storage 30 GB`,
    transfer: `Transfer 50 TB (Monthly)`,
    bandwidth: `Bandwidth 4 Gbps`,
    ftp: `FTP, Web Manager`,
    subDomain: `Subdomain *.cdn.csne.cloud`,
  },
  {
    name: 'CDN #3',
    price: 6500,
    storage: `Storage 40 GB`,
    transfer: `Transfer 150 TB (Monthly)`,
    bandwidth: `Bandwidth 6 Gbps`,
    ftp: `FTP, Web Manager`,
    subDomain: `Subdomain *.cdn.csne.cloud`,
  },
]

const UserCdnPricingSection = () => {
  const { i18n } = useLingui()
  return (
    <section className={clsx(`pb-20 pt-8`)}>
      <UserContainer>
        <UserTitle className={clsx(`text-center`)}>{i18n._(t`CDN`)}</UserTitle>

        <div className={clsx(`mt-10 grid grid-cols-3 gap-6`, `2xl:gap-4`, `lg:grid-cols-2`, `sm:grid-cols-1`)}>
          {mockCdn.map((item, itemIdx) => (
            <UserCdnPricingCard key={`cdn-${itemIdx}`} data={item} />
          ))}
        </div>
      </UserContainer>
    </section>
  )
}

export default UserCdnPricingSection
