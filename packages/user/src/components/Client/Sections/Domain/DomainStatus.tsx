import { useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Button, SvgIcon } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'

const DomainStatus = () => {
  const { i18n } = useLingui()
  const [status, setStatus] = useState(true)

  return (
    <div className={clsx(`flex items-center p-6`, `sm:flex-col sm:space-y-3`)}>
      <div className={clsx(`flex flex-1 items-center space-x-2`)}>
        <SvgIcon name="backoffice-domain-checkmark-lock" className={clsx(`text-primary-500 square-8`)} />
        <span className={clsx(`text-header-4`)}>{i18n._(t`สถานะการล็อก :`)}</span>
        <span className={clsx([`text-header-4`, { 'text-success': status, 'text-error': !status }])}>
          {status ? 'Enabled' : 'Disabled'}
        </span>
      </div>

      {status ? (
        <Button
          variant="error"
          size="medium"
          className={clsx(`min-w-[240px]`, `sm:w-full`)}
          onClick={() => setStatus((state) => !state)}
        >
          <span className={clsx(`text-header-5`)}>{i18n._(t`Disable Registara Lock`)}</span>
        </Button>
      ) : (
        <Button
          variant="success"
          size="medium"
          className={clsx(`min-w-[240px]`, `sm:w-full`)}
          onClick={() => setStatus((state) => !state)}
        >
          <span className={clsx(`text-header-5`)}>{i18n._(t`Enabled Registara Lock`)}</span>
        </Button>
      )}
    </div>
  )
}

export default DomainStatus
