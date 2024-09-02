import type { FC } from 'react'

import clsx from 'clsx'
import { SvgIcon } from '@olufy-frontend/shared/UI'
import { formatNumber } from '@olufy-frontend/shared/utils'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import Button from '@/components/Button'

import type { ICloudServerPricingData } from './types'

interface IUserCloudServerPricingCardProps {
  data: ICloudServerPricingData
}

const UserCloudServerPricingCard: FC<IUserCloudServerPricingCardProps> = ({ data }) => {
  const { i18n } = useLingui()

  return (
    <div
      className={clsx([
        `flex flex-col items-center rounded-lg border border-white-600 p-4`,
        `transition-shadow duration-200 hover:shadow-01`,
        `dark:border-dark-300`,
      ])}
    >
      <span>{data.name}</span>
      <SvgIcon name="statistics-cloud-signal" className={clsx(`mt-2 square-20`)} />
      <div>
        <span className={clsx(`text-[32px] text-header-2`)}>{formatNumber({ number: data.price.month })}฿</span>
        <span>/mo</span>
      </div>
      <div className={clsx(`desc font-light`)}>
        {formatNumber({ number: data.price.day })}฿/day | {formatNumber({ number: data.price.year })}฿/year
      </div>

      <div className={clsx(`desc mt-4 flex items-center space-x-2`)}>
        <SvgIcon name="hardware-cpu" className={clsx(`square-6`)} />
        <span>{data.cpu}</span>
      </div>
      <div className={clsx(`desc mt-2 flex items-center space-x-2`)}>
        <SvgIcon name="hardware-ram" className={clsx(`square-6`)} />
        <span>{data.memory}</span>
      </div>
      <div className={clsx(`desc mt-2 flex items-center space-x-2`)}>
        <SvgIcon name="hardware-storage" className={clsx(`square-6`)} />
        <span>{data.storage}</span>
      </div>
      <div className={clsx(`desc mt-2 flex items-center space-x-2`)}>
        <span>{data.bandwidth}</span>
      </div>

      <Button variant="primary" isOutline className={clsx(`mt-4 w-full`)}>
        <span>{i18n._(t`สั่งซื้อ`)}</span>
      </Button>
    </div>
  )
}

export default UserCloudServerPricingCard
