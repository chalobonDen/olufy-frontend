import { Fragment, useState } from 'react'

import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'

import BackButton from '@/components/Buttons/BackButton'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import type { DocumentProps } from '@/renderer/types'
import ManageCoLocationForm from '@/components/Forms/CoLocation'

import type { ICoLocation } from '@/types/modules/co-location'

interface IPageProps {
  data: ICoLocation
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _State
  const [updatedData, setUpdatedData] = useState<ICoLocation | null>(null)

  // _Events
  const transformData = (e: ICoLocation) => {
    return {
      name: e.name,
      sizeRack: e.sizeRack,
      dataCenter: e.dataCenter,
      os: e.os,
      networkShare: e.networkShare,
      price: e.price,
      bandwidth: e.bandwidth,
      taxWithheld: e.taxWithheld,
      taxRate: e.taxRate,
      taxAmount: e.taxAmount,
    }
  }

  return (
    <Fragment>
      <BackButton as="a" href="/app/co-location" />

      <Card title={i18n._(t`แก้ไขแพ็กเกจ Co-location`)} className={clsx(`mt-6`)} hasDivider>
        <ManageCoLocationForm
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
  title: t`Co-location`,
}
