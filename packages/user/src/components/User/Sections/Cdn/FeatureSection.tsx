import clsx from 'clsx'
import { SvgIcon } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import UserContainer from '@/components/UI/User/Container'
import UserCard from '@/components/UI/User/Card'
import UserTitle from '@/components/UI/User/Title'

const mockFeatureColocation = [
  {
    icon: 'startup',
    title: 'High Performance',
  },
  {
    icon: 'like',
    title: 'Cost Effective',
  },
  {
    icon: 'filter',
    title: 'Control Panel',
  },
]

const UserCdnFeatureSection = () => {
  const { i18n } = useLingui()
  return (
    <section className={clsx(`pb-20`)}>
      <UserContainer>
        <UserTitle className={clsx(`mb-10 text-center`)}>{i18n._(t`คุณสมบัติ`)}</UserTitle>
        <div className={clsx(`grid grid-cols-3 gap-6`, `2xl:gap-4`, `lg:grid-cols-2`, `sm:grid-cols-1`)}>
          {mockFeatureColocation.map((item, itemIdx) => (
            <UserCard key={`feature-${itemIdx}`}>
              <SvgIcon name={`feature-${item.icon}`} className={clsx(`square-20`)} />
              <h4 className={clsx(`mt-2 text-header-3`, `sm:text-header-5`)}>{item.title}</h4>
            </UserCard>
          ))}
        </div>
      </UserContainer>
    </section>
  )
}

export default UserCdnFeatureSection
