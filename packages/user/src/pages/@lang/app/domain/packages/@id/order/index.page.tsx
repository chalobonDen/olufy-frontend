import { Fragment, useState, useMemo } from 'react'

import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { Card, Input, SvgIcon } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'
import { formatPrice } from '@olufy-frontend/shared/utils'

import BackButton from '@/components/Client/Buttons/BackButton'
import { usePageContext } from '@/hooks/usePageContext'
import Link from '@/components/Link'
import SelectTaxInvoince from '@/components/Client/Selects/TaxInvoince'
import Button from '@/components/Button'

export const Page = () => {
  const { i18n } = useLingui()
  const { routeParams, urlParsed } = usePageContext()

  // _Memo
  const routeBack = useMemo(() => {
    const params = new URLSearchParams()
    Object.entries(urlParsed.search).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })

    return `/app/domain/packages/${routeParams?.id}?${params}`
  }, [routeParams?.id, urlParsed.search])

  return (
    <Fragment>
      <BackButton as="a" href={routeBack} />
      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`คำสั่งซื้อ`)}</h3>

      <Card className={clsx(`mt-6 p-0`, `sm:mt-4`)}>
        <h3 className={clsx(`p-4 text-header-3`, `sm:text-header-4`)}>{i18n._(t`ตรวจสอบคำสั่งซื้อ`)}</h3>

        <div className={clsx(`bg-primary-500 px-4 py-2 text-body-16 text-white-900`)}>
          {i18n._(t`รายการสินค้าและบริการที่เลือก`)}
        </div>
        <div className={clsx(`p-4`)}>
          <div className={clsx(`flex items-center justify-between`)}>
            <span className={clsx(`text-header-3`, `lg:text-header-5`)}>Domain name registration</span>
            <span className={clsx(`text-header-3`, `lg:text-header-5`)}>{formatPrice(350)} THB</span>
          </div>
          <div className={clsx(`flex items-center justify-between`)}>
            <span className={clsx(`text-body-16`, `lg:text-body-14`)}>Domainname.com</span>
            <span className={clsx(`desc text-body-16 font-light`, `lg:text-body-14`)}>1 {i18n._(t`Year`)}</span>
          </div>
          <div className={clsx(`flex items-center justify-end`)}>
            <div className={clsx(`flex items-center divide-x`, `lg:flex-col lg:items-end lg:divide-x-0`)}>
              <Link href={routeBack} className={clsx(`flex items-center space-x-2 pr-4 text-primary-500`, `lg:pr-0`)}>
                <SvgIcon name="edit" className={clsx(`square-4`)} />
                <span className={clsx(`text-body-14`)}>{i18n._(t`Edit Configuration`)}</span>
              </Link>
              <Link
                href="/app/domain/packages"
                className={clsx(`flex items-center space-x-2 pl-4 text-red-500`, `lg:pl-0`)}
              >
                <SvgIcon name="backoffice-sort-remove" className={clsx(`square-4`)} />
                <span className={clsx(`text-body-14`)}>{i18n._(t`Remove`)}</span>
              </Link>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            `flex items-center justify-between space-x-4 bg-primary-100 px-4 py-6 dark:bg-dark-300`,
            `xl:flex-col xl:items-stretch`,
            `sm:space-x-0`,
          )}
        >
          <div>
            <div className={clsx(`text-body-16`)}>{i18n._(t`Promotion Code`)}</div>
            <div className={clsx(`flex items-end space-x-4`)}>
              <Input
                name="code"
                className={clsx(`mt-4`, `sm:mt-2 sm:flex-1`)}
                onChange={() => {
                  //
                }}
              />
              <Button variant="success" size="medium">
                <span>{i18n._(t`CHECK`)}</span>
              </Button>
            </div>
          </div>
          <div className={clsx(`mt-0`, `xl:mt-4`)}>
            <div className={clsx(`flex items-center justify-end`, `sm:justify-between sm:space-x-0`)}>
              <div className={clsx(`text-body-20`, `text-body-16`)}>{i18n._(t`ภาษีมูลค่าเพิ่ม :`)}</div>
              <div className={clsx(`min-w-[265px] text-right text-body-20`, `text-body-16`)}>{formatPrice(35)} THB</div>
            </div>
            <div className={clsx(`mt-2 flex items-center justify-end space-x-6`, `sm:justify-between sm:space-x-0`)}>
              <div className={clsx(`text-body-20 text-primary-500`, `lg:text-body-16`)}>
                {i18n._(t`รวมยอดที่ต้องชำระวันนี้ :`)}
              </div>
              <div
                className={clsx(
                  `min-w-[240px] text-right text-[40px] font-medium text-primary-500`,
                  `lg:text-header-2`,
                  `md:text-header-3`,
                )}
              >
                {formatPrice(5350)} THB
              </div>
            </div>
          </div>
        </div>

        <SelectTaxInvoince
          onSelect={() => {
            //
          }}
        />
      </Card>

      <div className={clsx(`mt-4 flex justify-end space-x-4`, `sm:space-x-2`)}>
        <Button variant="danger" as="a" href="/app/domain" size="medium" className={clsx(`min-w-[154px]`, `sm:flex-1`)}>
          <span>{i18n._(t`ยกเลิก`)}</span>
        </Button>
        <Button variant="success" size="medium" className={clsx(`min-w-[154px]`, `sm:flex-1`)}>
          <span>{i18n._(t`ดำเนินการต่อ`)}</span>
        </Button>
      </div>
    </Fragment>
  )
}
