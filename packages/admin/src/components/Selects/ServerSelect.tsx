import type { FC } from 'react'

import { Input } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import type { ISelectProps } from '@olufy-frontend/shared/UI/Input/Select'
import { useQuery } from '@tanstack/react-query'

import { useUserStore } from '@/stores/user'
import { ServerService } from '@/services'

interface IServerSelectProps extends ISelectProps {
  disabledPlaceholder?: boolean
}

const ServerSelect: FC<IServerSelectProps> = ({ disabledPlaceholder = true, className, ...props }) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()

  // _Query
  const { data } = useQuery(['get-server-all'], ({ signal }) => ServerService.all({ signal }), {
    enabled: !!profile,
  })

  return (
    <Input.Select {...props}>
      <option value="">{i18n._(t`เลือก`)}</option>
      {data?.servers.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Input.Select>
  )
}

export default ServerSelect
