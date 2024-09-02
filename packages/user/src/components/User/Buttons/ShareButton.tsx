import type { FC } from 'react'
import { Fragment } from 'react'

import { SvgIcon } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'

import Button from '@/components/Button'

import UserShareModal from '../Modals/ShareModal'
import { useUserShareModal } from '../Modals/ShareModal/hooks'

interface IUserShareButtonProps {
  className?: string
}

const UserShareButton: FC<IUserShareButtonProps> = ({ className }) => {
  const { i18n } = useLingui()

  const { show } = useUserShareModal()

  return (
    <Fragment>
      <Button variant="primary-solid" isOutline rounder="full" className={clsx('space-x-2', className)} onClick={show}>
        <span>{i18n._(t`แชร์`)}</span>
        <SvgIcon name="share" className={clsx(`square-6`)} />
      </Button>

      <UserShareModal />
    </Fragment>
  )
}

export default UserShareButton
