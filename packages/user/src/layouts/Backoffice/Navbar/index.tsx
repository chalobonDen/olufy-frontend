import { Fragment } from 'react'

import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { formatPrice } from '@olufy-frontend/shared/utils'
import { Popover, SvgIcon } from '@olufy-frontend/shared/UI'
import { useQuery } from '@tanstack/react-query'

import { useUserStore } from '@/stores/user'
import UserProfileButton from '@/layouts/Default/Header/Buttons/UserProfile'
import { UserService } from '@/services'

const BackofficeLayoutNavbar = () => {
  const { profile } = useUserStore()
  const { i18n } = useLingui()

  // _Query
  // -- Revalidate for check credit
  useQuery(['me'], () => UserService.me())

  return (
    <Fragment>
      <Popover
        button={
          <div
            className={clsx([
              `relative`,
              `after:absolute after:right-[6px] after:top-0 after:rounded-full after:bg-error after:square-[10px]`,
            ])}
          >
            <SvgIcon name="notification" className={clsx(`text-warning square-10`)} />
          </div>
        }
        buttonProps={() => ({
          className: clsx(`!px-0`),
        })}
        showCaret={false}
        isHover={false}
        placement={'bottom-end'}
      >
        <div className={clsx(`w-[270px] text-center text-white-400`)}>Empty..</div>
      </Popover>
      <UserProfileButton
        button={
          <div className={clsx(`flex max-w-[150px] flex-col text-left`, `lg:max-w-[120px]`)}>
            <span className={clsx(`truncate`)}>{profile?.nameEn || profile?.email}</span>
            <span className={clsx(`text-body-12 text-primary-500`)}>
              {i18n._(t`CREDIT ${formatPrice(profile?.credit)} THB`)}
            </span>
          </div>
        }
        showCaret={true}
        buttonProps={{
          className: clsx(`space-x-2 !px-0`),
        }}
      />
    </Fragment>
  )
}

export default BackofficeLayoutNavbar
