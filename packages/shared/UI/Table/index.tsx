import { Fragment, useEffect, useState, useRef, useMemo } from 'react'

import clsx from 'clsx'

import Loader from '../Loader'
import Empty from '../Empty'
import Sorter from './Sorter'
import Filter from './Filter'
import Search from './Search'
import Checkbox from '../Checkbox'
import useTableSelection from './hooks/useSelection'
import type { GetRowKey, ITableProps } from './types'
import type { Order } from '../../types/pagination'
import useLazyKVMap from './hooks/useLazyKVMap'

import './styles.scss'

const CHILDREN_COLUMN_NAME = 'children'

const Table = <T,>({
  className,
  tableClassName,
  bodyClassName,
  bodyRowClassName,
  headerClassName,
  headerRowClassName,
  minWidth,
  maxHeight,
  rowKey,
  columns,
  dataSource,
  loading,
  loadingMsg = `Loading`,
  emptyMsg,
  rowSelection,
  ...props
}: ITableProps<T>) => {
  const tableBodyRef = useRef<HTMLTableSectionElement>()
  const rowKeysRef = useRef([])

  // _Memo
  const getRowKey = useMemo<GetRowKey<T>>(() => {
    if (typeof rowKey === 'function') {
      return rowKey
    }

    return (record: T) => (record as any)?.[rowKey as string]
  }, [rowKey])

  const { getRecordByKey } = useLazyKVMap(dataSource, CHILDREN_COLUMN_NAME, getRowKey)

  const {
    selectedKeys,
    onSelect,
    onSelectAll: onSelectionAllChange,
    selectedAll: isSelectedAll,
  } = useTableSelection<T>(rowSelection, {
    data: dataSource,
    getRowKey,
    getRecordByKey,
    childrenColumnName: CHILDREN_COLUMN_NAME,
  })

  // _State
  const [isBodyHasScroll, setIsBodyHasScroll] = useState<boolean>(false)

  // _Effect
  useEffect(() => {
    if (maxHeight && tableBodyRef.current) {
      if (tableBodyRef.current.querySelector('.table-body-row')) {
        const rowHeight = tableBodyRef.current.querySelector('.table-body-row').clientHeight
        const rowLength = tableBodyRef.current.querySelectorAll('.table-body-row').length
        const contentHeight = rowHeight * rowLength

        setIsBodyHasScroll(maxHeight < contentHeight)
      }
    }
  }, [maxHeight])

  return (
    <Fragment>
      <div className={clsx(`table-wrapper`, className)}>
        <table
          className={clsx(`table`, isBodyHasScroll ? `has-scroll-body` : ``, tableClassName)}
          style={{
            ...(minWidth
              ? {
                  minWidth,
                }
              : {}),
          }}
          {...props}
        >
          {/* Header */}
          <thead className={clsx(`table-header`, headerClassName)}>
            <tr className={clsx(`table-header-row`, headerRowClassName)}>
              {Boolean(rowSelection?.type) && (
                <th className={clsx(`table-th`)}>
                  <Checkbox onChange={onSelectionAllChange} checked={isSelectedAll} />
                </th>
              )}

              {columns.map((column, idx) => {
                if (column?.colSpan === 0) return

                const hasFilter = column?.filter
                const hasSorter = Boolean(column?.defaultSortOrder || column?.onSort)
                const hasSearch = Boolean(column?.defaultSearch || column?.onSearch)

                return (
                  <th
                    key={`${column.dataIndex}-${idx}`}
                    className={clsx(`table-th`, column.className)}
                    colSpan={column.colSpan}
                    rowSpan={column.rowSpan}
                    align={column.align}
                  >
                    {hasFilter || hasSorter || hasSearch ? (
                      <div
                        className={clsx({
                          'is-sorter': !!hasSorter,
                        })}
                      >
                        {!hasSorter ? (
                          <span>{column.title}</span>
                        ) : (
                          <Sorter record={column} onSort={(val: Order) => column?.onSort(val, dataSource[idx], idx)} />
                        )}
                        {!!hasFilter && (
                          <Filter
                            record={column}
                            onSubmit={(filterValues) => {
                              column?.onFilter?.(filterValues, dataSource[idx], idx)
                            }}
                          />
                        )}
                        {!!hasSearch && (
                          <Search
                            record={column}
                            onSubmit={(keyword) => {
                              column?.onSearch?.(keyword, dataSource[idx], idx)
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      column.title
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>

          {/* Body */}
          <tbody ref={tableBodyRef} className={clsx(`table-body`, bodyClassName)}>
            {!loading &&
              dataSource.map((data, idx) => {
                const _rowKey = rowKey?.(data, idx) ?? `row-${idx}`
                rowKeysRef.current.push(_rowKey)

                return (
                  <tr key={_rowKey} className={clsx(`table-body-row`, bodyRowClassName?.(data) ?? ``)}>
                    {Boolean(rowSelection?.type) && (
                      <td className={clsx(`table-td`)}>
                        <Checkbox
                          onChange={({ nativeEvent }) => onSelect(nativeEvent, data, idx)}
                          checked={selectedKeys?.includes(_rowKey)}
                        />
                      </td>
                    )}

                    {columns.map((column, columnIdx) => {
                      const cellProps = column.onCell?.(data, idx) ?? {}

                      if (!!cellProps && (cellProps.colSpan === 0 || cellProps.rowSpan === 0)) return

                      const { className: cellClassName, ...cellPropsRest } = cellProps

                      return (
                        <td
                          key={`${rowKey?.(data, idx) ?? `col-${idx}`}-${column.dataIndex}-${columnIdx}`}
                          className={clsx(`table-td`, cellClassName)}
                          align={column.align}
                          {...cellPropsRest}
                        >
                          {!!column?.render ? column.render(data[column.dataIndex], data, idx) : data[column.dataIndex]}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}

            {dataSource?.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="table-td-empty">
                  <Empty content={emptyMsg} />
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {!!loading && (
          <div className="table-loader">
            <Loader size={30} />
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default Table

export * from './types'
