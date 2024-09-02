import { useMemo } from 'react'

import clsx from 'clsx'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

import Tooltip from '../Tooltip'
import { useIsMounted } from '../../hooks'

import { Order } from '.'
import type { TableColumn } from '.'

const Sorter = ({ record, onSort }: { record: TableColumn<any>; onSort: (val: Order) => void }) => {
  const sorting = record?.defaultSortOrder ?? null

  const { isMounted } = useIsMounted()

  // _Memo
  const tooltipMsg = useMemo(() => {
    switch (sorting) {
      case Order.ASC:
        return `Click to sort descending`

      case Order.DESC:
        return `Click to cancel sorting`

      default:
        return `Click to sort ascending`
    }
  }, [sorting])

  if (!isMounted) {
    return (
      <div className={clsx(`sorter-container`)}>
        <span>{record.title}</span>
      </div>
    )
  }

  return (
    <Tooltip
      title={tooltipMsg}
      className={clsx(`sorter-container`)}
      onClick={() => {
        switch (sorting) {
          case Order.ASC:
            onSort(Order.DESC)
            break

          case Order.DESC:
            onSort(null)
            break

          default:
            onSort(Order.ASC)
            break
        }
      }}
    >
      <span>{record.title}</span>
      <span
        className={clsx(`sort-icon`, {
          'is-desc': sorting === Order.DESC,
          'is-asc': sorting === Order.ASC,
        })}
      >
        <FaCaretUp />
        <FaCaretDown />
      </span>
    </Tooltip>
  )
}

export default Sorter
