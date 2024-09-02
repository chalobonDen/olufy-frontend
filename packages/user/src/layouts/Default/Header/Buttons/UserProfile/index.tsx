import type { FC, ReactNode } from 'react'
import { Fragment } from 'react'

import { Menu } from '@headlessui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Dropdown } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { DropdownDivider } from '@olufy-frontend/shared/UI/Dropdown'
import type { ButtonProps } from '@olufy-frontend/shared/UI/Button/types'

import { useLogout } from '@/hooks/useLogout'
import { useUserStore } from '@/stores/user'
import Link from '@/components/Link'

interface IUserProfileButtonProps {
  button?: ReactNode
  showCaret?: boolean
  buttonProps?: ButtonProps
}

const UserProfileButton: FC<IUserProfileButtonProps> = ({ button, buttonProps, showCaret = false }) => {
  const { i18n } = useLingui()
  const { mutate: logout } = useLogout()
  const { profile } = useUserStore()

  return (
    <Dropdown
      button={button ?? <div className={clsx(`bg-gradient-primary rounded-full square-8`)}></div>}
      buttonProps={{
        ...(buttonProps
          ? buttonProps
          : {
              size: 'small',
              className: clsx(`!p-0`),
            }),
      }}
      className={clsx(`flex items-center`)}
      showCaret={showCaret}
      items={
        <Fragment>
          <Menu.Item>
            <Link
              href="/app/settings/profile"
              className={clsx(`dropdown-dialog-item no-hover !min-h-[30px] !w-[180px] truncate !py-0`)}
            >
              <p className={clsx(`truncate`)}>{profile?.nameEn || profile?.email}</p>
            </Link>
          </Menu.Item>
          <DropdownDivider />
          <Menu.Item>
            {() => (
              <Link href="/app" className={clsx(`dropdown-dialog-item !min-h-[0px] !w-[180px]`)}>
                <span>{i18n._(t`Dashboard`)}</span>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {() => (
              <Link href="/app/settings/profile" className={clsx(`dropdown-dialog-item !min-h-[0px] !w-[180px]`)}>
                <span>{i18n._(t`ตั้งค่าโปรไฟล์`)}</span>
              </Link>
            )}
          </Menu.Item>
          <DropdownDivider />
          <Menu.Item>
            {() => (
              <button className={clsx(`dropdown-dialog-item !min-h-[0px] !w-[180px]`)} onClick={() => logout()}>
                <span>{i18n._(t`ออกจากระบบ`)}</span>
              </button>
            )}
          </Menu.Item>
        </Fragment>
      }
    />
  )
}

export default UserProfileButton
