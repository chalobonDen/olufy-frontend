import type { FC } from 'react'
import { useEffect, useMemo } from 'react'

import { Input } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import type { ISelectProps } from '@olufy-frontend/shared/UI/Input/Select'

import { StatusIp } from '@/enums'

interface IStatusIpSelectProps extends ISelectProps {
  disabledPlaceholder?: boolean
}

interface IOptionItem {
  label: string
  value: StatusIp
}

const StatusIpSelect: FC<IStatusIpSelectProps> = ({ disabledPlaceholder = true, className, ...props }) => {
  const { i18n } = useLingui()

  const options: IOptionItem[] = useMemo(() => {
    return [
      {
        label: i18n._(t`ว่าง`),
        value: StatusIp.ACTIVE,
      },
      {
        label: i18n._(t`ไม่ว่าง`),
        value: StatusIp.INACTIVE,
      },
      {
        label: i18n._(t`ถูกล็อก`),
        value: StatusIp.LOCK,
      },
    ]
  }, [i18n])

  return (
    <Input.Select className={className} {...props}>
      <option value="" disabled={disabledPlaceholder}>
        {i18n._(t`สถานะการใช้`)}
      </option>
      {options.map((option, itemIdx) => (
        <option key={`${itemIdx}-${option.value}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </Input.Select>
  )
}

export default StatusIpSelect
