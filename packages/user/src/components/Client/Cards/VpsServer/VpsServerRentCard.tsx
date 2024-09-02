import type { FC } from 'react'

import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { SvgIcon } from '@olufy-frontend/shared/UI'
import { formatPrice } from '@olufy-frontend/shared/utils'
import { t } from '@lingui/macro'

import Button from '@/components/Button'

import type { ISimpleVpsServer } from '@/types/modules/vps-server'

interface IVpsServerRentCardProps {
  data: ISimpleVpsServer
}

const VpsServerRentCard: FC<IVpsServerRentCardProps> = ({ data }) => {
  const { i18n } = useLingui()

  return (
    <div
      className={clsx([
        `flex flex-col items-start rounded-lg border border-white-600 p-4`,
        `dark:border-dark-300`,
        {
          'bg-white-600 shadow-none dark:bg-dark-500': !data.status,
          'transition-shadow duration-200 hover:shadow-01': data.status,
        },
      ])}
    >
      <div>
        <span className={clsx(`text-header-3`)}>{data.name}</span>
        {/* <span className={clsx(`ml-2 font-light`)}>{data.subName}</span> */}
      </div>
      <span className={clsx(`text-gradient-primary text-[32px] text-header-2 font-semibold`)}>
        {formatPrice(data.price)}
      </span>
      <span className={clsx(`desc font-light`)}>{i18n._(t`THB / Monthly`)}</span>

      <div className={clsx(`desc mt-4 flex items-center space-x-2`)}>
        <SvgIcon name="hardware-cpu" className={clsx(`square-6`)} />
        <span>{data.cpu} Core</span>
      </div>
      <div className={clsx(`desc mt-2 flex items-center space-x-2`)}>
        <SvgIcon name="hardware-ram" className={clsx(`square-6`)} />
        <span>
          {data.ram.amount} {data.ram.unit}
        </span>
      </div>
      <div className={clsx(`desc mt-2 flex items-center space-x-2`)}>
        <SvgIcon name="hardware-ssd" className={clsx(`square-6`)} />
        <span>
          {data.diskType} {data.diskCapacity.amount} {data.diskCapacity.unit}
        </span>
      </div>
      <div className={clsx(`desc mt-2 flex items-center space-x-2`)}>
        <SvgIcon name="hardware-network" className={clsx(`square-6`)} />
        <span>{data.networkType}</span>
      </div>
      <div className={clsx(`desc mt-2 flex items-center space-x-2`)}>
        <SvgIcon name="hardware-data-check" className={clsx(`square-6`)} />
        <span>{data.bandwidth}</span>
      </div>

      {data.status ? (
        <Button
          variant="success"
          className={clsx(`mt-6 w-full`)}
          size="medium"
          as="a"
          href={`/app/vps-server/packages/${data.id}`}
        >
          <span>{i18n._(t`Rent`)}</span>
        </Button>
      ) : (
        <Button
          variant="error"
          buttonType="icon-text"
          isOutline
          size="medium"
          className={clsx(`mt-6 w-full cursor-not-allowed`)}
        >
          <SvgIcon name="close-square" className={clsx(`square-6`)} />
          <span>{i18n._(t`Not available`)}</span>
        </Button>
      )}
    </div>
  )
}

export default VpsServerRentCard
