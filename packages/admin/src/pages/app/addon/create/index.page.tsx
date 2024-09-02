import { Fragment } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Card } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageAddonForm from '@/components/Forms/Addon'

export const Page = () => {
  const { i18n } = useLingui()

  return (
    <Fragment>
      <BackButton as="a" href="/app/addon" />

      <Card title={i18n._(t`เพิ่มแพ็กเกจ Add On`)} className={clsx(`mt-6`)} hasDivider>
        <ManageAddonForm
          onSubmit={(data) => {
            // mutate(data)
          }}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการ Add On`,
}
