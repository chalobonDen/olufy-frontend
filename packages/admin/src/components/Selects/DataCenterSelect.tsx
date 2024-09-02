import type { ChangeEvent, FC } from 'react'

import { useLingui } from '@lingui/react'
import { Input } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'
import { useQuery } from '@tanstack/react-query'
import type { ISelectProps } from '@olufy-frontend/shared/UI/Input/Select'

import { DataCenterService } from '@/services'
import { useUserStore } from '@/stores/user'

import type { IDataCenterRackItem } from '@/types/modules/data-center'

interface IDataCenterSelectProps extends ISelectProps {
  onGetRacks?: (e: IDataCenterRackItem[]) => void
  disabledPlaceholder?: boolean
}

const DataCenterSelect: FC<IDataCenterSelectProps> = ({
  disabledPlaceholder = true,
  placeholder,
  onGetRacks,
  onChange,
  ...props
}) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { value } = props

  // _Query
  const { data } = useQuery(['data-center-list'], () => DataCenterService.all(), {
    enabled: !!profile,
    onSuccess: (res) => {
      handlerGetRacks(res.dataCenters, value as string)
    },
  })

  // _Events
  const handlerGetRacks = (
    dataCenters: {
      id: number
      name: string
      racks: IDataCenterRackItem[]
    }[],
    dataCenterSelectedId: string | number,
  ) => {
    if (Boolean(onGetRacks)) {
      onGetRacks?.(dataCenters.find((dataCenter) => dataCenter.id === Number(dataCenterSelectedId))?.racks ?? [])
    }
  }

  const handlerChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e)
    handlerGetRacks(data.dataCenters, e.target.value)
  }

  return (
    <Input.Select onChange={handlerChange} {...props}>
      <option value="" disabled={disabledPlaceholder}>
        {placeholder ?? i18n._(t`เลือก Data Center`)}
      </option>
      {data?.dataCenters.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Input.Select>
  )
}

export default DataCenterSelect
