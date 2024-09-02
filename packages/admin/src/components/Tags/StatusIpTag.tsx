import { useMemo, type FC } from 'react'

import { Tag } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import type { TagVariant } from '@olufy-frontend/shared/UI/Tag'

import { StatusIp } from '@/enums'

interface IStatusIpTag {
  status: StatusIp
  className?: string
}

const StatusIpTag: FC<IStatusIpTag> = ({ status, className }) => {
  const { i18n } = useLingui()

  //_Memo
  const renderTag = useMemo(() => {
    const statusData: {
      variant: TagVariant
      label: string
    } = {
      variant: null,
      label: null,
    }

    switch (status) {
      case StatusIp.ACTIVE:
        statusData.variant = 'success'
        statusData.label = i18n._(t`ว่าง`)
        break

      case StatusIp.INACTIVE:
        statusData.variant = 'danger'
        statusData.label = i18n._(t`ไม่ว่าง`)
        break

      case StatusIp.LOCK:
        statusData.variant = 'dark'
        statusData.label = i18n._(t`ถูกล็อก`)
        break
    }

    return (
      <Tag variant={statusData.variant} isSolid className={className}>
        {statusData.label}
      </Tag>
    )
  }, [i18n, status, className])

  return renderTag
}

export default StatusIpTag
