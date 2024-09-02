import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { SvgIcon } from '@olufy-frontend/shared/UI'

import UserContainer from '@/components/UI/User/Container'
import UserTitle from '@/components/UI/User/Title'
import UserCard from '@/components/UI/User/Card'

const features = [
  {
    iconName: 'intel-cores',
    title: t`Intel Cores`,
  },
  {
    iconName: 'infinite-os',
    title: t`Infinite OS`,
  },
  {
    iconName: 'firewall',
    title: t`Firewall Protection`,
  },
  {
    iconName: 'storage',
    title: t`Storage`,
  },
  {
    iconName: 'fast-deploy',
    title: t`Fast Deploy`,
  },
  {
    iconName: 'control-panel',
    title: t`Control Panel`,
  },
]

const UserFeatureSection = () => {
  const { i18n } = useLingui()

  return (
    <section className={clsx(`pb-20 pt-12`, `sm:pb-10 sm:pt-8`)}>
      <UserContainer>
        <UserTitle className={clsx(`text-center`)}>{i18n._(t`คุณสมบัติ`)}</UserTitle>

        <div className={clsx([`mt-10 grid grid-cols-3 gap-6`, `2xl:gap-4`, `lg:grid-cols-2`])}>
          {features.map((feature, featureIdx) => (
            <UserCard key={`feature-${featureIdx}`}>
              <SvgIcon name={`feature-${feature.iconName}`} className={clsx(`square-20`, `sm:square-10`)} />
              <span className={clsx(`mt-2 inline-block text-header-3`, `sm:text-header-5`)}>{feature.title}</span>
            </UserCard>
          ))}
        </div>
      </UserContainer>
    </section>
  )
}

export default UserFeatureSection
