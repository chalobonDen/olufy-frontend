import type { FC } from 'react'

import type { ISelectProps } from '@olufy-frontend/shared/UI/Input/Select'
import { useLingui } from '@lingui/react'
import { useQuery } from '@tanstack/react-query'
import { Input } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'

import { useUserStore } from '@/stores/user'
import { UserService } from '@/services'

interface IUserListSelectProps extends ISelectProps {}

const UserListSelect: FC<IUserListSelectProps> = ({ placeholder, ...props }) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()

  // _Query
  const { data } = useQuery(['users-list'], () => UserService.all(), {
    enabled: !!profile,
  })

  return (
    <Input.Select {...props}>
      <option value="" disabled>
        {placeholder ?? i18n._(t`เลือก`)}
      </option>
      {data?.users.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Input.Select>
  )
}

export default UserListSelect
