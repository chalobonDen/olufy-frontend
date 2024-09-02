import { Fragment, useState, useMemo } from 'react'

import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { t } from '@lingui/macro'
import { Card, SvgIcon } from '@olufy-frontend/shared/UI'

import { usePageContext } from '@/hooks/usePageContext'
import BackButton from '@/components/Client/Buttons/BackButton'
import Link from '@/components/Link'
import SelectTaxInvoince from '@/components/Client/Selects/TaxInvoince'
import type { DocumentProps } from '@/renderer/types'
import UserSummaryOrder from '@/components/Client/Sections/UserSummaryOrder'
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

    return `/app/vps-auto/packages/${routeParams?.id}?${params}`
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
            <span className={clsx(`text-header-3`, `lg:text-header-5`)}>VPU Auto SSD #</span>
            <span className={clsx(`text-header-3`, `lg:text-header-5`)}>200.00 THB</span>
          </div>
          <div className={clsx(`flex items-center justify-between`)}>
            <span className={clsx(`text-body-16`, `lg:text-body-14`)}>2 CPU vCore</span>
            <span className={clsx(`desc text-body-16 font-light`, `lg:text-body-14`)}>1 {i18n._(t`Year`)}</span>
          </div>
          <div className={clsx(`flex items-center justify-between`)}>
            <span className={clsx(`desc text-body-14 font-light`)}>Hostname</span>
            <div className={clsx(`flex items-center divide-x`, `lg:flex-col lg:items-end lg:divide-x-0`)}>
              <Link href={routeBack} className={clsx(`flex items-center space-x-2 pr-4 text-primary-500`, `lg:pr-0`)}>
                <SvgIcon name="edit" className={clsx(`square-4`)} />
                <span className={clsx(`text-body-14`)}>{i18n._(t`Edit Configuration`)}</span>
              </Link>
              <Link
                href="/app/vps-auto/packages"
                className={clsx(`flex items-center space-x-2 pl-4 text-red-500`, `lg:pl-0`)}
              >
                <SvgIcon name="backoffice-sort-remove" className={clsx(`square-4`)} />
                <span className={clsx(`text-body-14`)}>{i18n._(t`Remove`)}</span>
              </Link>
            </div>
          </div>
        </div>

        <UserSummaryOrder
          vat={14}
          total={214}
          onCheckCode={(e) => {
            //
          }}
        />

        <SelectTaxInvoince
          onSelect={() => {
            //
          }}
        />
      </Card>

      <div className={clsx(`mt-4 flex justify-end space-x-4`, `sm:space-x-2`)}>
        <Button
          variant="danger"
          as="a"
          href="/app/vps-auto"
          size="medium"
          className={clsx(`min-w-[154px]`, `sm:flex-1`)}
        >
          <span>{i18n._(t`ยกเลิก`)}</span>
        </Button>
        <Button variant="success" size="medium" className={clsx(`min-w-[154px]`, `sm:flex-1`)}>
          <span>{i18n._(t`ดำเนินการต่อ`)}</span>
        </Button>
      </div>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`VPS Auto`,
}
