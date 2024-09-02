import type { Key, ReactNode, TableHTMLAttributes, ThHTMLAttributes } from 'react'

export enum Order {
  ASC = 'asc', // ascend
  DESC = 'desc', // descend
}

export type TableColumn<T> = Omit<ThHTMLAttributes<HTMLTableCellElement>, 'title'> & {
  title: ReactNode
  dataIndex: string
  colSpan?: number
  rowSpan?: number
  onCell?: (record?: T, index?: number) => ThHTMLAttributes<HTMLTableCellElement>
  render?: (value: any, record?: T, index?: number) => ReactNode
  defaultFilter?: string[] | number[]
  filter?: {
    text: string
    value: string | number
  }[]
  filterOptions?: {
    resetText?: string
    submitText?: string
  }
  onFilter?: (value: any, record?: T, index?: number) => void
  defaultSortOrder?: Order | null
  onSort?: (value: Order, record?: T, index?: number) => void
  defaultSearch?: string
  onSearch?: (value: any, record?: T, index?: number) => void
  searchOption?: {
    label?: string
  }
}

export type GetRowKey<RecordType> = (record: RecordType, index?: number) => Key

export type RowSelectMethod = 'all' | 'none' | 'invert' | 'single' | 'multiple'

export type SelectionSelectFn<T> = (record: T, selected: boolean, selectedRows: T[], nativeEvent: Event) => void

export interface ITableRowSelection<T> {
  type?: 'checkbox'
  selectedRowKeys?: Key[]
  defaultSelectedRowKeys?: Key[]
  onChange?: (selectedRowKeys: Key[], selectedRows: T[], info: { type: RowSelectMethod }) => void
  onSelect?: SelectionSelectFn<T>
  preserveSelectedRowKeys?: boolean
}

export interface ITableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
  className?: string
  tableClassName?: string
  headerClassName?: string
  headerRowClassName?: string
  bodyClassName?: string
  bodyRowClassName?: (record?: T) => string
  maxHeight?: number
  minWidth?: number
  rowKey?: (record?: T, index?: number) => Key
  columns: TableColumn<T>[]
  dataSource: T[]
  loading?: boolean
  loadingMsg?: string
  emptyMsg?: string
  rowSelection?: ITableRowSelection<T>
}
