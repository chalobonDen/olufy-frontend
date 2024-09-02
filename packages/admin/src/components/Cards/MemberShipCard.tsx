import type { FC } from 'react'

import { SvgIcon } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

interface IMemberShipCardProps {
  color: string
  title: string
  amount: number
  maxAmount: number
}

const MemberShipCard: FC<IMemberShipCardProps> = ({ title, color, amount, maxAmount }) => {
  const { i18n } = useLingui()

  return (
    <div className={clsx(`mt-2 rounded-lg bg-dark-500 p-4 text-white-900`)}>
      <div className={clsx(`flex items-center space-x-2`)}>
        <div
          className={clsx(`flex items-center justify-center rounded-full square-12`)}
          style={{ backgroundColor: color }}
        >
          <SvgIcon name="crown" className={clsx(`square-8`)} />
        </div>
        <div className={clsx(`text-header-3`)}>{title}</div>
      </div>

      <div className={clsx(`mt-2 text-body-14`)}>{i18n._(t`สั่งซื้อไปแล้ว`)}</div>
      <div className={clsx(`flex items-center space-x-2`)}>
        <div className={clsx(`h-[8px] flex-1 overflow-hidden rounded-full bg-white-900`)}>
          <div
            className={clsx(`h-full rounded-full`)}
            style={{
              backgroundColor: color,
              width: `${(amount / maxAmount) * 100}%`,
            }}
          ></div>
        </div>
        <div className={clsx(`text-body-14`)}>
          {amount}/{maxAmount}
        </div>
      </div>
    </div>
  )
}

export default MemberShipCard
