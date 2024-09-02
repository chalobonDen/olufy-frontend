import type { FC } from 'react'
import { Fragment } from 'react'

import clsx from 'clsx'
import { Popover, SvgIcon } from '@olufy-frontend/shared/UI'
import type { IBackofficeLayoutMenuItem } from '@olufy-frontend/shared/layouts/Backoffice/types'

import { useUserStore } from '@/stores/user'

import UserDropdown from './UserDropdown'

interface IBackofficeLayoutNavbarProps {
  menu: IBackofficeLayoutMenuItem[]
}

const BackofficeLayoutNavbar: FC<IBackofficeLayoutNavbarProps> = ({ menu }) => {
  const { profile } = useUserStore()

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
      <UserDropdown
        button={
          <div className={clsx(`flex max-w-[150px] flex-col text-left`, `lg:max-w-[120px]`)}>
            <span className={clsx(`truncate`)}>{profile?.nameEn || profile?.email}</span>
            <span className={clsx(`desc -mt-1 truncate text-body-14`)}>{profile?.role?.name}</span>
          </div>
        }
        showCaret={true}
        buttonProps={{
          className: clsx(`space-x-2 !px-0`),
        }}
        menu={menu}
      />
    </Fragment>
  )
}

export default BackofficeLayoutNavbar
