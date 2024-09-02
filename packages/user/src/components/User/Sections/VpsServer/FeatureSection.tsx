import clsx from 'clsx'
import { SvgIcon } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'

import UserContainer from '@/components/UI/User/Container'
import UserCard from '@/components/UI/User/Card'

const vpsFeatures = [
  {
    iconName: 'cloud-thunder',
    title: t`VPS Auto`,
  },
  {
    iconName: 'cloud-setting',
    title: t`Self Manage`,
  },
  {
    iconName: 'intel-cores',
    title: t`Re-Install OS`,
  },
  {
    iconName: 'cloud-thunder',
    title: t`Firewall Protection`,
  },
  {
    iconName: 'cloud-setting',
    title: t`Guarantee protected`,
  },
  {
    iconName: 'intel-cores',
    title: t`Enterprise Server`,
  },
]

const UserVpsServerFeatureSection = () => {
  return (
    <section className={clsx(`pb-20`)}>
      <UserContainer>
        <div className={clsx(`grid grid-cols-3 gap-3`, `sm:grid-cols-2`)}>
          {vpsFeatures.map((feature, featureIdx) => (
            <UserCard key={`feature-${featureIdx}`}>
              {featureIdx !== 2 && featureIdx !== 5 && (
                <SvgIcon name={`statistics-${feature.iconName}`} className={clsx(`square-20`, `sm:square-10`)} />
              )}
              {(featureIdx === 2 || featureIdx === 5) && (
                <SvgIcon name={`feature-${feature.iconName}`} className={clsx(`square-20`, `sm:square-10`)} />
              )}
              <span className={clsx(`mt-2 inline-block text-header-3`, `sm:text-header-5`)}>{feature.title}</span>
            </UserCard>
          ))}
        </div>
      </UserContainer>
    </section>
  )
}

export default UserVpsServerFeatureSection
