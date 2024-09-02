import type { FC } from 'react'

import { SvgIcon } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import type { IPaymentChannelOption } from '@/types/modules/deposit'
import type { PaymentChannel } from '@/enums'

interface IPaymentChanelCardProps {
  data: IPaymentChannelOption
  onSelected?: (e: PaymentChannel) => void
  isSelected?: boolean
}

const PaymentChanelCard: FC<IPaymentChanelCardProps> = ({ data, isSelected = false, onSelected }) => {
  const { i18n } = useLingui()

  return (
    <div
      className={clsx(`relative cursor-pointer rounded-lg border p-4 pb-2`, {
        'border-primary-500': isSelected,
        'border-white-300 dark:border-dark-200': !isSelected,
      })}
      onClick={() => onSelected?.(data.key)}
    >
      <div className={clsx(`absolute right-2 top-2`)}>
        {isSelected ? (
          <SvgIcon name="check-round" className={clsx(`text-primary-500 square-5`)} />
        ) : (
          <div className={clsx(`h-4 w-4 rounded-full border border-white-800`, `dark:border-dark-200`)} />
        )}
      </div>
      <img src={data.img} className={clsx(`mx-auto h-[40px] w-[190px] object-contain`)} />
      <p className={clsx(`desc mt-2 text-center`)}>
        {data.fees > 0 ? i18n._(t`+ค่าธรรมเนียม ${data.fees}%`) : i18n._(t`รวมค่าธรรมเนียมแล้ว`)}
      </p>
    </div>
  )
}

export default PaymentChanelCard
