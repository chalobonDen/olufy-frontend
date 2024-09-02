import { Fragment, useState } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Card } from '@olufy-frontend/shared/UI'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageHostingForm from '@/components/Forms/Hosting'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'

import type { IHostingForm } from '@/types/modules/hosting'

interface IPageProps {
  data: IHostingForm
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _State
  const [updatedData, setUpdatedData] = useState<IHostingForm | null>(null)

  // _Events
  const transformData = (e: IHostingForm) => {
    return {
      name: e.name,
      domain: e.domain,
      storage: e.storage,
      bandwidth: e.bandwidth,
      database: e.database,
      fipAccount: e.fipAccount,
      webControlPanel: e.webControlPanel,
      price: e.price,
      taxWithheld: e.taxWithheld,
      taxRate: e.taxRate,
      taxAmount: e.taxAmount,
    }
  }

  return (
    <Fragment>
      <BackButton as="a" href="/app/hosting" />

      <Card title={i18n._(t`แก้ไขแพ็กเกจ Hosting`)} className={clsx(`mt-6`)} hasDivider>
        <ManageHostingForm
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
  title: t`Hoting`,
}
