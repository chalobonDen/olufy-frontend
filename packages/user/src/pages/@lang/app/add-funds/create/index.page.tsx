import { Fragment } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { Card } from '@olufy-frontend/shared/UI'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Client/Buttons/BackButton'
import AddCreditAddFundsForm from '@/components/Client/Forms/AddFunds/AddCreditForm'

export const Page = ({ baseUrl }) => {
  const { i18n } = useLingui()

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`เติมเครดิต`)}</h3>

      <Card className={clsx(`mt-6`)}>
        <h4 className={clsx(`text-header-4`, `sm:text-header-5`)}>{i18n._(t`เติมเงินเข้าระบบเครดิต`)}</h4>

        <AddCreditAddFundsForm baseUrl={baseUrl} />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Add Funds `,
}
