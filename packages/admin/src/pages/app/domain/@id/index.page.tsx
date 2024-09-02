import { Fragment, useState } from 'react'

import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'

import BackButton from '@/components/Buttons/BackButton'
import ManageDomainForm from '@/components/Forms/Domain'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'

import type { IDomain } from '@/types/modules/domain'

interface IPageProps {
  data: IDomain
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _State
  const [updatedData, setUpdatedData] = useState<IDomain | null>(null)

  // _Events
  const transformData = (e: IDomain) => {
    return {
      domain: e.domain,
      price: e.price,
      taxRate: e.taxRate,
      taxAmount: e.taxAmount,
    }
  }

  return (
    <Fragment>
      <BackButton as="a" href="/app/domain" />

      <Card title={i18n._(t`แก้ไขโดเมน`)} className={clsx(`mt-6`)} hasDivider>
        <ManageDomainForm
          data={transformData(updatedData ?? data)}
          onSubmit={(data) => {
            // mutate(data)
          }}
        />
      </Card>
    </Fragment>
  )
}
