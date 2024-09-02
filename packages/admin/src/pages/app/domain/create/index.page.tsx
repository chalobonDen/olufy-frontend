import { Fragment } from 'react'

import { Card } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import BackButton from '@/components/Buttons/BackButton'
import ManageDomainForm from '@/components/Forms/Domain'

export const Page = () => {
  const { i18n } = useLingui()
  return (
    <Fragment>
      <BackButton as="a" href="/app/domain" />

      <Card title={i18n._(t`เพิ่มโดเมน`)} className={clsx(`mt-6`)} hasDivider>
        <ManageDomainForm
          onSubmit={(data) => {
            // mutate(data)
          }}
        />
      </Card>
    </Fragment>
  )
}
