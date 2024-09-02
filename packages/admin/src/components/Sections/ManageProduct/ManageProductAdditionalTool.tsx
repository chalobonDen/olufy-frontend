import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Button, SvgIcon } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'

const ManageProductAdditionalTool = () => {
  const { i18n } = useLingui()

  return (
    <div className={clsx(`p-6`)}>
      <h3 className={clsx(`text-header-3`)}>{i18n._(t`Additional Tools`)}</h3>

      <div className={clsx(`mt-6 grid grid-cols-4 gap-4`, `lg:grid-cols-2`, `sm:grid-cols-1`)}>
        <Button variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="backoffice-dedicated-cpu" className={clsx(`square-6`)} />
          <span>{i18n._(t`CPU Usage Graphs`)}</span>
        </Button>
      </div>
    </div>
  )
}

export default ManageProductAdditionalTool
