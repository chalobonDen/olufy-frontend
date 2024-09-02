import { Fragment, useState } from 'react'

import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'

import BackButton from '@/components/Buttons/BackButton'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import ManageVpsAutoForm from '@/components/Forms/VpsAuto'

import type { IVpsAuto } from '@/types/modules/vps-auto'

interface IPageProps {
  data: IVpsAuto
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _State
  const [updatedData, setUpdatedData] = useState<IVpsAuto | null>(null)

  // _Events
  const transformData = (e: IVpsAuto) => {
    return {
      name: e.name,
      os: e.os,
      cpu: e.cpu,
      ram: e.ram,
      storage: e.storage,
      disk: e.disk,
      networkShare: e.networkShare,
      bandwidth: e.bandwidth,
      price: e.price,
      taxRate: e.taxRate,
      taxAmount: e.taxAmount,
    }
  }

  return (
    <Fragment>
      <BackButton as="a" href="/app/vps-auto" />

      <Card title={i18n._(t`แก้ไขแพ็กเกจ Auto VPS`)} className={clsx(`mt-6`)} hasDivider>
        <ManageVpsAutoForm
          data={transformData(updatedData ?? data)}
          onSubmit={(data) => {
            // mutate(data)
          }}
        />
      </Card>
    </Fragment>
  )
}
