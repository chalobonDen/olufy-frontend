import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export const Page = ({ is404 }: { is404: boolean }) => {
  const { i18n } = useLingui()

  if (is404) {
    return (
      <section>
        <h1>404 Page Not Found</h1>
        <p className="text-sub">{i18n._(t`This page could not be found.`)}</p>
      </section>
    )
  } else {
    return (
      <section>
        <h1>500 Internal Server Error</h1>
        <p className="text-sub">{i18n._(t`Something went wrong.`)}</p>
      </section>
    )
  }
}
