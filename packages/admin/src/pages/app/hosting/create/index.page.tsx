import { Fragment } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Card } from '@olufy-frontend/shared/UI'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageHostingForm from '@/components/Forms/Hosting'

export const Page = () => {
  const { i18n } = useLingui()

  return (
    <Fragment>
      <BackButton as="a" href="/app/hosting" />

      <Card title={i18n._(t`เพิ่มแพ็กเกจ Hosting`)} className={clsx(`mt-6`)} hasDivider>
        <ManageHostingForm
          onSubmit={(data) => {
            // mutate(data)
          }}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Hosting`,
}
