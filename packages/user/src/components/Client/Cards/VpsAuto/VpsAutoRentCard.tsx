import type { FC } from 'react'

import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { SvgIcon } from '@olufy-frontend/shared/UI'
import { formatNumber } from '@olufy-frontend/shared/utils'
import { t } from '@lingui/macro'

import { useSetting } from '@/hooks/stores/useSetting'
import Button from '@/components/Button'

enum type {
  WINDOWS = 'windows',
  LINUX = 'linux',
}

interface IVpsAutoRentCardProps {
  data: any
  cardType: string
}

const VpsAutoRentCard: FC<IVpsAutoRentCardProps> = ({ data, cardType = type.WINDOWS }) => {
  const { i18n } = useLingui()
  const { lang } = useSetting()

  return (
    <div
      className={clsx([
        `flex flex-col items-center rounded-lg border border-white-600 p-4`,
        `transition-shadow duration-200 hover:shadow-01`,
        `dark:border-dark-300`,
      ])}
    >
      <span className={clsx(`text-header-5`)}>{data.name}</span>
      <SvgIcon
        name={cardType === type.WINDOWS ? 'backoffice-vps-auto-windows' : 'backoffice-vps-auto-linux'}
        className={clsx(`mt-2 square-20`)}
      />
      <div>
        <span className={clsx(`text-[32px] text-header-2`)}>{formatNumber({ number: data.price })}฿</span>
        <span>/monthly</span>
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
        <SvgIcon name="hardware-ssd" className={clsx(`square-6`)} />
        <span>{data.storage}</span>
      </div>

      <Button
        variant="success"
        className={clsx(`mt-12 w-full`)}
        size="medium"
        as="a"
        href={`/app/vps-auto/packages/${data.id}`}
      >
        <span>{i18n._(t`Rent`)}</span>
      </Button>
    </div>
  )
}

export default VpsAutoRentCard
