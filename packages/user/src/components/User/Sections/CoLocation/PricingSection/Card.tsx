import type { FC } from 'react'

import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { formatNumber } from '@olufy-frontend/shared/utils'
import { SvgIcon } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'

import Button from '@/components/Button'

import type { IColocationPricingData } from './types'

interface IUserColocationPricingCardProps {
  data: IColocationPricingData
}

export const UserColocationPricingCard: FC<IUserColocationPricingCardProps> = ({ data }) => {
  const { i18n } = useLingui()
  return (
    <div
      className={clsx([
        `flex flex-col items-center rounded-lg border border-white-600 p-4`,
        `transition-shadow duration-200 hover:shadow-01`,
        `dark:border-dark-300`,
      ])}
    >
      <h4 className={clsx(`text-header-3`)}>{data.name}</h4>
      <div>
        <span className={clsx(`text-header-2`)}>{formatNumber({ number: data.price })}</span>
        <span>/mo</span>
      </div>

      <div className={clsx(`mt-4 space-y-2`)}>
        {data.items.map((item, itemIdx) => (
          <div key={itemIdx} className={clsx(`desc flex items-center justify-center space-x-2`)}>
            <SvgIcon name="check" className={clsx(`square-6`)} />
            <p className={clsx(`text-body-16`)}>{item.content}</p>
          </div>
        ))}
      </div>

      <Button variant="primary" isOutline className={clsx(`mt-4 w-full`)}>
        <span>{i18n._(t`ติดต่อเรา`)}</span>
      </Button>
    </div>
  )
}
