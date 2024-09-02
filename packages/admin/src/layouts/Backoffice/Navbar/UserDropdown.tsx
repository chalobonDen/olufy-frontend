import type { FC, ReactNode } from 'react'
import { useMemo, Fragment } from 'react'

import { Menu } from '@headlessui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Dropdown } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { DropdownDivider } from '@olufy-frontend/shared/UI/Dropdown'
import type { ButtonProps } from '@olufy-frontend/shared/UI/Button/types'
import type { IBackofficeLayoutMenuItem } from '@olufy-frontend/shared/layouts/Backoffice/types'

import { useLogout } from '@/hooks/useLogout'
// import { useUserStore } from '@/stores/user'

interface IUserDropdownProps {
  button?: ReactNode
  showCaret?: boolean
  buttonProps?: ButtonProps
  menu: IBackofficeLayoutMenuItem[]
}

const UserDropdown: FC<IUserDropdownProps> = ({ button, buttonProps, showCaret = false, menu }) => {
  const { i18n } = useLingui()
  const { mutate: logout } = useLogout()

  // _Memo
  const hasDashboard = useMemo(() => Boolean(menu.find((e) => e.key === 'dashboard')), [menu])

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
          {/* <Menu.Item>
            <a
              href="/app/settings/profile"
              className={clsx(`dropdown-dialog-item no-hover !min-h-[30px] !w-[180px] truncate !py-0`)}
            >
              <p className={clsx(`truncate`)}>{profile?.nameEn || profile?.email}</p>
            </a>
          </Menu.Item>
          <DropdownDivider /> */}
          {hasDashboard && (
            <Fragment>
              <Menu.Item>
                {() => (
                  <a href="/app" className={clsx(`dropdown-dialog-item !min-h-[0px] !w-[180px]`)}>
                    <span>{i18n._(t`Dashboard`)}</span>
                  </a>
                )}
              </Menu.Item>
              <DropdownDivider />
            </Fragment>
          )}
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

export default UserDropdown
