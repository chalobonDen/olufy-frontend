import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'

export const Page = () => {
  const { i18n } = useLingui()

  return (
    <div className={clsx(`flex h-full flex-col items-center justify-center space-y-6 pb-16`)}>
      <img src="/images/forbidden.svg" className={clsx(`w-[600px] max-w-full`)} />

      <h1 className={clsx(`text-center text-header-3`, `sm:text-header-4`)}>
        {i18n._(t`คุณไม่มีสิทธิ์ในการใช้งานระบบ กรุณาติดต่อผู้ดูแลระบบ`)}
      </h1>
    </div>
  )
}
