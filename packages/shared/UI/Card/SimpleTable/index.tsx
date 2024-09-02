import type { ReactNode } from 'react'
import { Fragment } from 'react'

import clsx from 'clsx'

import Card from '..'
import type { ITableProps } from '../../Table'
import Table from '../../Table'
import SvgIcon from '../../SvgIcon'

interface ISimpleTableCardProps<T> {
  label?: string
  iconName?: string
  className?: string
  table: ITableProps<T>
  header?: ReactNode
}

const SimpleTableCard = <T,>({ label, iconName, className, table, header }: ISimpleTableCardProps<T>) => {
  return (
    <Card className={clsx(`card-simple-table`, className)}>
      <div className={clsx(`card-simple-table-header`)}>
        {header ? (
          header
        ) : (
          <Fragment>
            {iconName && <SvgIcon name={iconName} className={clsx(`card-simple-table-icon`)} />}
            <span className={clsx(`card-simple-table-label`)}>{label || 'Label'}</span>
          </Fragment>
        )}
      </div>
      <Table {...table} />
    </Card>
  )
}

export default SimpleTableCard
