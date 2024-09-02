import { Fragment } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Card } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageCoLocationForm from '@/components/Forms/CoLocation'

export const Page = () => {
  const { i18n } = useLingui()

  return (
    <Fragment>
      <BackButton as="a" href="/app/co-location" />

      <Card title={i18n._(t`เพิ่มแพ็กเกจ Co-location`)} className={clsx(`mt-6`)} hasDivider>
        <ManageCoLocationForm
          onSubmit={(data) => {
            // mutate(data)
          }}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Co-location`,
}
