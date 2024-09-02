import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Button, SvgIcon } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'

const ManageProductController = () => {
  const { i18n } = useLingui()

  return (
    <div className={clsx(`p-6`)}>
      <h3 className={clsx(`text-header-3`)}>{i18n._(t`Manage`)}</h3>

      <div className={clsx(`mt-6 grid grid-cols-4 gap-4`, `lg:grid-cols-2`, `sm:grid-cols-1`)}>
        <Button variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="backoffice-dedicated-start" className={clsx(`square-6`)} />
          <span>{i18n._(t`Start`)}</span>
        </Button>
        <Button variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="backoffice-dedicated-stop" className={clsx(`square-6`)} />
          <span>{i18n._(t`Stop`)}</span>
        </Button>
        <Button variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="backoffice-dedicated-timer-open" />
          <span>{i18n._(t`Shutdown`)}</span>
        </Button>
        <Button variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="backoffice-dedicated-restart" className={clsx(`square-6`)} />
          <span>{i18n._(t`Reboot`)}</span>
        </Button>
        <Button variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="backoffice-dedicated-device-recover" className={clsx(`square-6`)} />
          <span>{i18n._(t`Startup On Recovery`)}</span>
        </Button>
        <Button variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="backoffice-dedicated-rebuild" className={clsx(`square-6`)} />
          <span>{i18n._(t`Rebuild`)}</span>
        </Button>
        <Button variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="backoffice-dedicated-console" className={clsx(`square-6`)} />
          <span>{i18n._(t`Open console`)}</span>
        </Button>
      </div>
    </div>
  )
}

export default ManageProductController
