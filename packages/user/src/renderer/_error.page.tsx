import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import UserContainer from '@/components/UI/User/Container'

export const Page = ({ is404 }: { is404: boolean }) => {
  const { i18n } = useLingui()

  if (is404) {
    return (
      <section>
        <UserContainer className={clsx(`flex min-h-[60vh] flex-col justify-center space-y-6 text-center`)}>
          <h1>404 Page Not Found</h1>
          <p className="text-sub">{i18n._(t`This page could not be found.`)}</p>
        </UserContainer>
      </section>
    )
  } else {
    return (
      <section>
        <UserContainer className={clsx(`flex min-h-[60vh] flex-col justify-center space-y-6 text-center`)}>
          <h1>500 Internal Server Error</h1>
          <p className="text-sub">{i18n._(t`Something went wrong.`)}</p>
        </UserContainer>
      </section>
    )
  }
}
