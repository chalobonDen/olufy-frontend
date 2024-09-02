import type { FC } from 'react'

import clsx from 'clsx'
import { SvgIcon } from '@olufy-frontend/shared/UI'
import { formatNumber } from '@olufy-frontend/shared/utils'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import Button from '@/components/Button'

import type { ICdnrPricingData } from './types'

interface IUserCdnPricingCardProps {
  data: ICdnrPricingData
}

const UserCdnPricingCard: FC<IUserCdnPricingCardProps> = ({ data }) => {
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
      <SvgIcon name="statistics-cloud-thunder" className={clsx(`mt-2 square-20`)} />
      <div>
        <span className={clsx(`text-[32px] text-header-2`)}>{formatNumber({ number: data.price })}฿</span>
        <span>/mo</span>
      </div>

      <div className={clsx(`desc mt-4 flex items-center space-x-2`)}>
        <SvgIcon name="hardware-storage" className={clsx(`square-6`)} />
        <span>{data.storage}</span>
      </div>
      <div className={clsx(`desc mt-2 flex items-center space-x-2`)}>
        <SvgIcon name="hardware-swap" className={clsx(`square-6`)} />
        <span>{data.transfer}</span>
      </div>
      <div className={clsx(`desc mt-2 flex items-center space-x-2`)}>
        <SvgIcon name="hardware-page-speed" className={clsx(`square-6`)} />
        <span>{data.bandwidth}</span>
      </div>
      <div className={clsx(`desc mt-2 flex items-center space-x-2`)}>
        <SvgIcon name="check" className={clsx(`square-6`)} />
        <span>{data.ftp}</span>
      </div>
      <div className={clsx(`desc mt-2 flex items-center space-x-2`)}>
        <SvgIcon name="check" className={clsx(`square-6`)} />
        <span>{data.subDomain}</span>
      </div>

      <Button variant="primary" isOutline className={clsx(`mt-4 w-full`)}>
        <span>{i18n._(t`เช่า CDN`)}</span>
      </Button>
    </div>
  )
}

export default UserCdnPricingCard
