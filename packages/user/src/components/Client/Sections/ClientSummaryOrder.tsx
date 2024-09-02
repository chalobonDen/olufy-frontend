import type { FC } from 'react'
import { Fragment, useMemo } from 'react'

import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { formatPrice } from '@olufy-frontend/shared/utils'
import { Divider } from '@olufy-frontend/shared/UI'

import type { ICalculateSummaryOrderResponse } from '@/types/base'

interface IClientSummaryOrderProps {
  data: ICalculateSummaryOrderResponse
}

const ClientSummaryOrder: FC<IClientSummaryOrderProps> = ({ data }) => {
  const { i18n } = useLingui()

  // _Memo
  const isWithholdTax = useMemo(() => (data?.withholdTax ?? 0) > 0, [data?.withholdTax])

  return (
    <div
      className={clsx(`flex items-center bg-primary-100 px-4 py-6 dark:bg-dark-300`, `xl:flex-col xl:items-stretch`)}
    >
      <div className={clsx(`ml-auto mt-0 space-y-1`, `xl:mt-4`, `sm:ml-0`)}>
        <div className={clsx(`flex flex-wrap items-center justify-end`, `sm:justify-between sm:space-x-0`)}>
          <div className={clsx(`text-body-20`, `sm:text-body-16`)}>{i18n._(t`ราคารวม :`)}</div>
          <div className={clsx(`min-w-[285px] text-right text-body-20`, `sm:min-w-fit sm:flex-1 sm:text-body-16`)}>
            {formatPrice(data?.price)} THB
          </div>
        </div>
        <div className={clsx(`flex flex-wrap items-center justify-end`, `sm:justify-between sm:space-x-0`)}>
          <div className={clsx(`text-body-20`, `sm:text-body-16`)}>{i18n._(t`ราคาก่อน VAT :`)}</div>
          <div className={clsx(`min-w-[285px] text-right text-body-20`, `sm:min-w-fit sm:flex-1 sm:text-body-16`)}>
            {formatPrice(data?.priceBeforeVat)} THB
          </div>
        </div>
        <div className={clsx(`flex flex-wrap items-center justify-end`, `sm:justify-between sm:space-x-0`)}>
          <div className={clsx(`text-body-20`, `sm:text-body-16`)}>{i18n._(t`ภาษีมูลค่าเพิ่ม ${data.vat}% :`)}</div>
          <div className={clsx(`min-w-[285px] text-right text-body-20`, `sm:min-w-fit sm:flex-1 sm:text-body-16`)}>
            {formatPrice(data?.vatAmount)} THB
          </div>
        </div>

        {isWithholdTax && (
          <Fragment>
            <Divider className={clsx(`bg-dark-500`)} />

            <div className={clsx(`flex flex-wrap items-center justify-end`, `sm:justify-between sm:space-x-0`)}>
              <div className={clsx(`text-body-20`, `sm:text-body-16`)}>{i18n._(t`รวมราคาสุทธิ :`)}</div>
              <div className={clsx(`min-w-[285px] text-right text-body-20`, `sm:min-w-fit sm:flex-1 sm:text-body-16`)}>
                {formatPrice(data?.netPrice)} THB
              </div>
            </div>
            <div className={clsx(`flex flex-wrap items-center justify-end`, `sm:justify-between sm:space-x-0`)}>
              <div className={clsx(`text-body-20`, `sm:text-body-16`)}>
                {i18n._(t`หักภาษี ณ ที่จ่าย ${data?.withholdTax}% :`)}
              </div>
              <div className={clsx(`min-w-[285px] text-right text-body-20`, `sm:min-w-fit sm:flex-1 sm:text-body-16`)}>
                {formatPrice(data?.withholdTaxAmount)} THB
              </div>
            </div>
          </Fragment>
        )}
        <div
          className={clsx(
            `flex justify-end space-x-6`,
            {
              'items-start': isWithholdTax,
              'items-center': !isWithholdTax,
            },
            `sm:justify-between sm:space-x-0`,
          )}
        >
          <div>
            <div className={clsx(`text-body-20 text-primary-500`, `sm:text-body-16`)}>
              {i18n._(t`รวมยอดที่ต้องชำระ :`)}
            </div>
            {isWithholdTax && (
              <div className={clsx(`-mt-1 text-body-14 text-primary-500`, `sm:text-body-12`)}>
                {i18n._(t`(ราคาหลังหักภาษี ณ ที่จ่าย)`)}
              </div>
            )}
          </div>
          <div
            className={clsx(
              `min-w-[260px] text-right text-header-3 font-medium text-primary-500`,
              `sm:min-w-[auto] sm:text-header-4`,
            )}
          >
            {formatPrice(data?.totalAmount)} THB
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientSummaryOrder
