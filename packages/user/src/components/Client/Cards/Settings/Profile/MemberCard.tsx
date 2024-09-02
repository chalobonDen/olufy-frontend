import type { FC } from 'react'
import { Fragment } from 'react'

import { Card, SvgIcon } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'

import type { IUserSettingProfile } from '@/types/modules/user'

interface IClientSettingProfileMemberCardProps {
  data?: IUserSettingProfile
}

const initialData = {
  color: '#ccc',
  maxOrderAmount: 10,
  orderAmount: 0,
  role: 'Member',
}

const ClientSettingProfileMemberCard: FC<IClientSettingProfileMemberCardProps> = ({ data }) => {
  const { i18n } = useLingui()
  const accountMembership = data?.accountMembership ?? initialData

  return (
    <Fragment>
      <Card title={i18n._(t`ระดับสมาชิก`)}>
        <div className={clsx(`mt-2 rounded-lg bg-dark-500 p-2 text-white-900`)}>
          <div className={clsx(`flex items-center space-x-2`)}>
            <div
              className={clsx(`flex items-center justify-center rounded-full square-12`)}
              style={{ backgroundColor: accountMembership.color }}
            >
              <SvgIcon name="crown" className={clsx(`square-8`)} />
            </div>
            <div className={clsx(`text-header-3`)}>{accountMembership.role}</div>
          </div>

          <div className={clsx(`mt-2 text-body-14`)}>{i18n._(t`สั่งซื้อไปแล้ว`)}</div>
          <div className={clsx(`flex items-center space-x-2`)}>
            <div className={clsx(`h-[8px] flex-1 overflow-hidden rounded-full bg-white-900`)}>
              <div
                className={clsx(`h-full rounded-full`)}
                style={{
                  backgroundColor: accountMembership.color,
                  width: `${(accountMembership.orderAmount / accountMembership.maxOrderAmount) * 100}%`,
                }}
              ></div>
            </div>
            <div className={clsx(`text-body-14`)}>
              {accountMembership.orderAmount}/{accountMembership.maxOrderAmount}
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  )
}

export default ClientSettingProfileMemberCard
