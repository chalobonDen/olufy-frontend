import { Fragment } from 'react'

import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { t } from '@lingui/macro'
import { Card } from '@olufy-frontend/shared/UI'

import BackButton from '@/components/Buttons/BackButton'
import ManageVpsAutoForm from '@/components/Forms/VpsAuto'

export const Page = () => {
  const { i18n } = useLingui()

  return (
    <Fragment>
      <BackButton as="a" href="/app/vps-auto" />

      <Card title={i18n._(t`เพิ่มแพ็กเกจ Auto VPS`)} className={clsx(`mt-6`)} hasDivider>
        <ManageVpsAutoForm
          onSubmit={(data) => {
            // mutate(data)
          }}
        />
      </Card>
    </Fragment>
  )
}
