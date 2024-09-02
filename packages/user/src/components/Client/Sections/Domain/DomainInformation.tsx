import React from 'react'

import { Card, Divider, SvgIcon } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import { formatDate } from '@/utils'

const DomainInformation = () => {
  const { i18n } = useLingui()

  return (
    <Card className={clsx(`mt-4 p-0`)}>
      <div className={clsx(`flex cursor-pointer items-center space-x-3 p-6 text-primary-500`)}>
        <SvgIcon name="backoffice-dedicated-server" className={clsx(`square-8`, `sm:square-7`)} />
        <span className={clsx(`text-body-20`)}>Domian Information</span>
      </div>
      <Divider />
      <div className={clsx(`overflow-x-auto p-6`)}>
        <div className={clsx(`flex min-w-[400px] items-center bg-white-600 py-2 dark:bg-dark-200`)}>
          <div className={clsx(`flex-1 text-center`)}>SSL Status</div>
          <div className={clsx(`flex-1 text-center`)}>{formatDate(new Date(), 'eeee, MMMM do, y')}</div>
        </div>
        <div className={clsx(`flex min-w-[400px] items-center py-2`)}>
          <div className={clsx(`flex-1 text-center`)}>SSL Start Date</div>
          <div className={clsx(`flex-1 text-center`)}>ssd-sv53.Demo.com</div>
        </div>
        <div className={clsx(`flex min-w-[400px] items-center bg-white-600 py-2 dark:bg-dark-200`)}>
          <div className={clsx(`flex-1 text-center`)}>Built</div>
          <div className={clsx(`flex-1 text-center`)}>{formatDate(new Date(), 'eeee, MMMM do, y')}</div>
        </div>
        <div className={clsx(`flex min-w-[400px] items-center py-2`)}>
          <div className={clsx(`flex-1 text-center`)}>SSL Issuer Name</div>
          <div className={clsx(`flex-1 text-center`)}>R3</div>
        </div>
      </div>
    </Card>
  )
}

export default DomainInformation
