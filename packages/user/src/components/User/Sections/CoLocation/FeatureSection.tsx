import clsx from 'clsx'
import { SvgIcon } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'

import UserCard from '@/components/UI/User/Card'
import UserContainer from '@/components/UI/User/Container'

const mockFeatureColocation = [
  {
    icon: 'security-shield',
    title: 'DDoS Protection',
    description: t`The most well-known dummy text is the Lorem Ipsum to have originated in the 16th century.`,
  },
  {
    icon: 'network',
    title: 'Network',
    description: t`The most well-known dummy text is the Lorem Ipsum to have originated in the 16th century.`,
  },
  {
    icon: 'firewall',
    title: 'Firewall Protection',
    description: t`The most well-known dummy text is the Lorem Ipsum to have originated in the 16th century.`,
  },
]

export const UserColocationFeatureSection = () => {
  return (
    <section className={clsx(`pb-20`)}>
      <UserContainer>
        <div className={clsx(`grid grid-cols-3 gap-6`, `2xl:gap-4`, `lg:grid-cols-1`)}>
          {mockFeatureColocation.map((item, itemIdx) => (
            <UserCard key={`feature-${itemIdx}`}>
              <SvgIcon name={`feature-${item.icon}`} className={clsx(`square-20`)} />
              <h4 className={clsx(`mt-2 text-header-3`, `sm:text-header-5`)}>{item.title}</h4>
              <p className={clsx(`desc mt-2 text-body-16`)}>{item.description}</p>
            </UserCard>
          ))}
        </div>
      </UserContainer>
    </section>
  )
}
