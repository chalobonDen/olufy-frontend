import type { FC } from 'react'
import { useMemo } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { SvgIcon } from '@olufy-frontend/shared/UI'
import { formatNumber } from '@olufy-frontend/shared/utils'

import UserContainer from '@/components/UI/User/Container'
import UserCard from '@/components/UI/User/Card'
import UserTitle from '@/components/UI/User/Title'

import type { IStatistics } from '@/types/modules/home'

interface IUserHomeStatisticSectionProps {
  statistics?: IStatistics
}

interface IConfig {
  iconName: string
  count: number
  label: string
  key: keyof IStatistics
}

const GetStatisticsConfigs = () =>
  [
    {
      iconName: 'statistics-approved-cloud',
      count: 0,
      label: t`Active Servers`,
      key: 'countServer',
    },
    {
      iconName: 'statistics-server',
      count: 0,
      label: t`Dedicated Server`,
      key: 'countDedicatedServer',
    },
    {
      iconName: 'statistics-lock-cloud',
      count: 0,
      label: t`Clients`,
      key: 'countUser',
    },
    {
      iconName: 'statistics-cloud-signal',
      count: 0,
      label: t`Hosting`,
      key: 'countHosting',
    },
  ] as IConfig[]

const UserHomeStatisticSection: FC<IUserHomeStatisticSectionProps> = ({ statistics }) => {
  const { i18n } = useLingui()

  // _Memo
  const newStatistics = useMemo(() => {
    return GetStatisticsConfigs().map((e) => ({
      ...e,
      count: statistics[e.key],
    }))
  }, [statistics])

  return (
    <section className={clsx(`py-12`, `sm:py-8`)}>
      <UserContainer>
        <UserCard className={clsx(`p-10`, `sm:px-4`)}>
          <UserTitle className={clsx(`text-center`)}>{i18n._(t`สถิติของเรา`)}</UserTitle>

          <div
            className={clsx(
              `mt-10 flex max-w-full flex-wrap items-center justify-between`,
              `lg:mx-auto lg:mt-6 lg:w-[560px] lg:justify-center`,
              `sm:mt-3`,
            )}
          >
            {newStatistics.map((item, itemIdx) => (
              <div
                key={itemIdx}
                className={clsx(`flex items-start space-x-4`, `lg:mt-4 lg:w-1/2`, `sm:space-x-3`, `se:w-full`)}
              >
                <SvgIcon name={item.iconName} className={clsx(`mt-3 square-[54px]`, `sm:square-10`)} />
                <div className={clsx(`flex flex-col`)}>
                  <span className={clsx(`text-gradient-primary text-header-1`, `sm:text-header-2`)}>
                    {formatNumber({ number: item.count })}
                  </span>
                  <span className={clsx(`text-body-14`, `sm:text-body-12`)}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </UserCard>
      </UserContainer>
    </section>
  )
}

export default UserHomeStatisticSection
