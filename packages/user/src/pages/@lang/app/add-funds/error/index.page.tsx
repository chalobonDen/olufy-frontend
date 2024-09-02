import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'

import type { DocumentProps } from '@/renderer/types'
import Button from '@/components/Button'

import { Layout } from '@/enums'

export const Page = () => {
  const { i18n } = useLingui()

  return (
    <section className={clsx(`flex flex-col items-center justify-center py-4 min-h-screen`)}>
      <img src="/images/payment/error.svg" alt="image success" className={clsx(`sm:square-72`)} />
      <h2 className={clsx(`mt-2 text-center text-header-2 text-red-500`, `sm:text-header-4`, `se:text-header-5`)}>
        {i18n._(t`ขออภัยรายการชำระเงินของท่านไม่สำเร็จ`)}
      </h2>
      <p className={clsx(`text-center text-body-18`, `sm:mt-2 sm:text-body-14`, `se:text-body-12`)}>
        {i18n._(t`การชำระเงินไม่สำเร็จ กรุณาเริ่มต้นการชำระเงินใหม่อีกครั้ง`)}
      </p>

      <Button variant="primary" size="medium" className={clsx(`mt-4`)} as="a" href="/app/add-funds">
        <span>{i18n._(t`กลับสู่หน้าหลัก`)}</span>
      </Button>
    </section>
  )
}

export const layout = Layout.BLANK

export const documentProps: DocumentProps = {
  title: t`Payment Error`,
}
