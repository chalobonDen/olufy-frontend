import { Fragment, useState } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Client/Buttons/BackButton'
import DomainPrices from '@/components/Client/Sections/Domain/DomainPrices'
import RegisterNewDomainForm from '@/components/Client/Forms/Hosting/RegisterNewDomainForm'
import TransferDomainForm from '@/components/Client/Forms/Hosting/TransferDomainForm'
import { ExistingDomainForm } from '@/components/Client/Forms/Hosting/ExistingDomainForm'
import { usePageContext } from '@/hooks/usePageContext'
import useRouter from '@/hooks/useRouter'

export interface IDomainDataRecommend {
  id: number
  name: string
  price: number
  domain: string
}

export const Page = () => {
  const { i18n } = useLingui()
  const { routeParams } = usePageContext()
  const { push } = useRouter()

  // _State
  const [selectAction, setSelectAction] = useState<string>('new')

  return (
    <Fragment>
      <BackButton as="a" href="/app/hosting/packages" />

      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`Domain`)}</h3>
      <RegisterNewDomainForm
        className={clsx(`mt-6`)}
        isSelect={selectAction}
        onSelected={(e) => setSelectAction(e)}
        onContinue={() => {
          //
          push(`/app/hosting/packages/${routeParams.id}/setup-package`)
        }}
      />
      <TransferDomainForm
        className={clsx(`mt-2`)}
        isSelect={selectAction}
        onSelected={(e) => setSelectAction(e)}
        onContinue={() => {
          //
          push(`/app/hosting/packages/${routeParams.id}/setup-package`)
        }}
      />
      <ExistingDomainForm
        className={clsx(`mt-2`)}
        isSelect={selectAction}
        onSelected={(e) => setSelectAction(e)}
        onContinue={() => {
          //
          push(`/app/hosting/packages/${routeParams.id}/setup-package`)
        }}
      />

      <DomainPrices />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Hosting`,
}
