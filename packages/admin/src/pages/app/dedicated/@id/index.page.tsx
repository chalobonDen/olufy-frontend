import { Fragment, useState } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Card } from '@olufy-frontend/shared/UI'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageDedicatedForm from '@/components/Forms/Dedicated'

import type { IDedicatedForm } from '@/types/modules/dedicated'

interface IPageProps {
  data: IDedicatedForm
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()

  // _State
  const [updatedData, setUpdatedData] = useState<IDedicatedForm | null>(null)

  // _Events
  const transformData = (e: IDedicatedForm) => {
    return {
      name: e.name,
      storageType: e.storageType,
      storageCapacity: e.storageCapacity,
      cpu: e.cpu,
      ram: e.ram,
      os: e.os,
      networkShare: e.networkShare,
      bandwidth: e.bandwidth,
      price: e.price,
      taxRate: e.taxRate,
      taxAmount: e.taxAmount,
    }
  }

  return (
    <Fragment>
      <BackButton as="a" href="/app/dedicated" />

      <Card title={i18n._(t`แก้ไขแพ็กเกจ License Key`)} className={clsx(`mt-6`)} hasDivider>
        <ManageDedicatedForm
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
  title: t`จัดการ Dedicated Server`,
}
