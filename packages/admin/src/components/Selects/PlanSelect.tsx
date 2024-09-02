import type { FC } from 'react'

import { Input } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import type { ISelectProps } from '@olufy-frontend/shared/UI/Input/Select'
import { useQuery } from '@tanstack/react-query'

import { useUserStore } from '@/stores/user'
import { PlanService } from '@/services'

interface IPlanSelectProps extends ISelectProps {
  disabledPlaceholder?: boolean
}

const PlanSelect: FC<IPlanSelectProps> = ({ disabledPlaceholder = true, className, ...props }) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()

  // _Query
  const { data } = useQuery(['get-plan-all'], ({ signal }) => PlanService.all({ signal }), {
    enabled: !!profile,
  })

  return (
    <Input.Select {...props}>
      <option value="">{i18n._(t`เลือก`)}</option>
      {data?.plans.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Input.Select>
  )
}

export default PlanSelect
