import { Fragment, useState } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Card } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageLicenseForm from '@/components/Forms/License'

import type { ILicenseForm } from '@/types/modules/license'

interface IPageProps {
  data: ILicenseForm
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()

  // _State
  const [updatedData, setUpdatedData] = useState<ILicenseForm | null>(null)

  // _Events
  const transformData = (e: ILicenseForm) => {
    return {
      name: e.name,
      price: e.price,
      paymentType: e.paymentType,
      taxWithheld: e.taxWithheld,
      taxRate: e.taxRate,
      taxAmount: e.taxAmount,
    }
  }

  return (
    <Fragment>
      <BackButton as="a" href="/app/license" />

      <Card title={i18n._(t`แก้ไขแพ็กเกจ License Key`)} className={clsx(`mt-6`)} hasDivider>
        <ManageLicenseForm
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
  title: t`จัดการ License Key`,
}
