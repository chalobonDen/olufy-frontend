import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Divider } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { formatPrice } from '@olufy-frontend/shared/utils'

import { formatDate } from '@/utils'

const DomainDetail = () => {
  const { i18n } = useLingui()

  return (
    <div className={clsx(`grid grid-cols-6`, `lg:grid-cols-3`, `sm:grid-cols-2`)}>
      <div className={clsx(`flex items-center`)}>
        <div className={clsx(`flex-1 px-6 py-4`)}>
          <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`วันที่เริ่มใช้งาน`)}</div>
          <div className={clsx(`mt-2 text-primary-500`)}>{formatDate(new Date(), 'dd/MM/y')}</div>
        </div>
        <Divider type="vertical" className={clsx('h-[53px]')} />
      </div>
      <div className={clsx(`flex items-center`)}>
        <div className={clsx(`flex-1 px-6 py-4`)}>
          <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`งวดถัดไป`)}</div>
          <div className={clsx(`mt-2 text-primary-500`)}>{formatDate(new Date(), 'dd/MM/y')}</div>
        </div>
        <Divider type="vertical" className={clsx('h-[53px]', `sm:hidden`)} />
      </div>
      <div className={clsx(`flex items-center`)}>
        <div className={clsx(`flex-1 px-6 py-4`)}>
          <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`รอบการเรียกเก็บเงิน`)}</div>
          <div className={clsx(`mt-2 text-primary-500`)}>Annually</div>
        </div>
        <Divider type="vertical" className={clsx('h-[53px]')} />
      </div>
      <div className={clsx(`flex items-center`)}>
        <div className={clsx(`flex-1 px-6 py-4`)}>
          <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`ชำระครั้งแรก`)}</div>
          <div className={clsx(`mt-2 text-primary-500`)}>
            {formatPrice(3500)} THB/{i18n._(t`Monthly`)}
          </div>
        </div>
        <Divider type="vertical" className={clsx('h-[53px]', `sm:hidden`)} />
      </div>
      <div className={clsx(`flex items-center`)}>
        <div className={clsx(`flex-1 px-6 py-4`)}>
          <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`ชำระครั้งถัดไป`)}</div>
          <div className={clsx(`mt-2 text-primary-500`)}>
            {formatPrice(3500)} THB/{i18n._(t`Monthly`)}
          </div>
        </div>
        <Divider type="vertical" className={clsx('h-[53px]')} />
      </div>
      <div className={clsx(`flex-1 px-6 py-4`)}>
        <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`รูปแบบการชำระเงิน`)}</div>
        <div className={clsx(`mt-2 text-primary-500`)}>True Money Wallet</div>
      </div>
    </div>
  )
}

export default DomainDetail
