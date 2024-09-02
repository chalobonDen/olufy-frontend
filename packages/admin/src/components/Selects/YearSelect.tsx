import type { FC } from 'react'
import { useMemo, useState } from 'react'

import { Input } from '@olufy-frontend/shared/UI'
import type { ISelectProps } from '@olufy-frontend/shared/UI/Input/Select'
import { range } from 'lodash-es'
import { differenceInYears, subYears } from 'date-fns'

interface IYearSelectProps extends ISelectProps {
  endYear?: Date
  diffYear?: number
}

const YearSelect: FC<IYearSelectProps> = ({ diffYear = 5, endYear = new Date(), ...props }) => {
  const dateRight = useMemo(() => subYears(endYear, diffYear), [diffYear, endYear])

  const diff = useMemo(() => differenceInYears(endYear, dateRight), [dateRight, endYear])

  const years = useMemo(() => {
    return range(0, diff + 1)
      .map((e) => ({
        label: dateRight.getFullYear() + e,
        value: dateRight.getFullYear() + e,
      }))
      .sort((a, b) => b.value - a.value)
  }, [diff, dateRight])

  return (
    <Input.Select {...props}>
      {Object.values(years).map((item, idx) => (
        <option key={idx} value={item.value}>
          {item.label}
        </option>
      ))}
    </Input.Select>
  )
}

export default YearSelect
