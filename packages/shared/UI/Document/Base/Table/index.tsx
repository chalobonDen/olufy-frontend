import type { ReactNode, TableHTMLAttributes, ThHTMLAttributes } from 'react'

import { View, Text } from '@react-pdf/renderer'

import { styles } from './styles'

export type TableColumn<T> = Omit<ThHTMLAttributes<HTMLTableCellElement>, 'title'> & {
  title: ReactNode
  dataIndex: string
  width?: number | string
  align?: 'center' | 'left' | 'right' | 'justify' | undefined
  onCell?: (record?: T, index?: number) => ThHTMLAttributes<HTMLTableCellElement>
  render?: (value: any, record?: T, index?: number) => ReactNode
}

interface IDocumentTableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
  columns: TableColumn<T>[]
  dataSource: T[]
  fixed?: boolean
}

const DocumentTable = <T,>({ columns, dataSource, fixed = true }: IDocumentTableProps<T>) => {
  return (
    <View style={styles.table}>
      {/* header table */}
      <View style={styles.tableHeader} fixed={fixed}>
        {columns.map((column, columnIndex) => {
          return (
            <View key={columnIndex} style={{ ...styles.tableCol, width: column.width }}>
              <Text style={styles.tableCell}>{column.title}</Text>
            </View>
          )
        })}
      </View>

      {/* body table */}
      {dataSource.map((data, dataIdx) => {
        return (
          <View key={dataIdx} style={styles.tableRow} wrap={false}>
            {columns.map((column, columnIdx) => {
              return (
                <View
                  key={columnIdx}
                  style={{
                    ...styles.tableCol,
                    width: column.width,
                  }}
                >
                  <Text style={{ ...styles.tableCell, textAlign: column.align }}>
                    {!!column?.render ? column.render(data[column.dataIndex], data, dataIdx) : data[column.dataIndex]}
                  </Text>
                </View>
              )
            })}
          </View>
        )
      })}
    </View>
  )
}

export default DocumentTable
