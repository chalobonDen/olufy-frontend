import type { FC } from 'react'

import clsx from 'clsx'

import Card from '..'
import SvgIcon from '../../SvgIcon'

interface IStatisticCardProps {
  label: string
  count: string
  iconName: string
}

const StatisticCard: FC<IStatisticCardProps> = ({ label, count, iconName }) => {
  return (
    <Card className={clsx(`card-statistic`)}>
      <div className={clsx(`card-statistic-info`)}>
        <span className={clsx(`card-statistic-title`)}>{label}</span>
        <span className={clsx(`card-statistic-count`)}>{count}</span>
      </div>
      <SvgIcon name={iconName} className={clsx(`card-statistic-icon`)} />
    </Card>
  )
}

export default StatisticCard
