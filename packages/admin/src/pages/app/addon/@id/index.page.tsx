import { Fragment, useState } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Card } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageAddonForm from '@/components/Forms/Addon'

import type { IAddon } from '@/types/modules/addon'

interface IPageProps {
  data: IAddon
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()

  // _State
  const [updatedData, setUpdatedData] = useState<IAddon | null>(null)

  // _Events
  const transformData = (e: IAddon) => {
    return {
      name: e.name,
      price: e.price,
      detail: e.detail,
      taxWithheld: e.taxWithheld,
      taxRate: e.taxRate,
      taxAmount: e.taxAmount,
    }
  }

  return (
    <Fragment>
      <BackButton as="a" href="/app/addon" />

      <Card title={i18n._(t`แก้ไขแพ็กเกจ Add On`)} className={clsx(`mt-6`)} hasDivider>
        <ManageAddonForm
          data={transformData(updatedData ?? data)}
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
