import { Fragment } from 'react'

import { Card } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import BackButton from '@/components/Buttons/BackButton'
import ManageLicenseForm from '@/components/Forms/License'
import type { DocumentProps } from '@/renderer/types'

export const Page = () => {
  const { i18n } = useLingui()

  return (
    <Fragment>
      <BackButton as="a" href="/app/license" />

      <Card title={i18n._(t`เพิ่มแพ็กเกจ License Key`)} className={clsx(`mt-6`)} hasDivider>
        <ManageLicenseForm
          onSubmit={(data) => {
            // mutate(data)
          }}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการ License Key`,
}
