import type { FC } from 'react'
import { useEffect } from 'react'

import { Input } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import type { ISelectProps } from '@olufy-frontend/shared/UI/Input/Select'
import { useQuery } from '@tanstack/react-query'

import { MembershipService } from '@/services'
import { useUserStore } from '@/stores/user'

import type { IMembership } from '@/types/modules/membership'

interface IMemberShipSelectProps extends ISelectProps {
  disabledPlaceholder?: boolean
  getFirstSelected?: (item: IMembership) => void
}

const MemberShipSelect: FC<IMemberShipSelectProps> = ({
  disabledPlaceholder = true,
  getFirstSelected,
  className,
  ...props
}) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { value } = props

  // _Query
  const { data } = useQuery(['get-membership-all'], ({ signal }) => MembershipService.all({ signal }), {
    enabled: !!profile,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      if (res?.memberShips?.length > 0) getFirstSelected?.(res.memberShips[0])
    },
  })

  // _Effect
  useEffect(() => {
    if (!!data?.memberShips && getFirstSelected && !value) {
      getFirstSelected?.(data.memberShips[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Input.Select className={className} {...props}>
      <option value="" disabled={disabledPlaceholder}>
        {i18n._(t`ระดับสมาชิก`)}
      </option>
      {data?.memberShips.map((item, itemIdx) => (
        <option key={`${item.id}-${itemIdx}`} value={item.id}>
          {item.name}
        </option>
      ))}
    </Input.Select>
  )
}

export default MemberShipSelect
