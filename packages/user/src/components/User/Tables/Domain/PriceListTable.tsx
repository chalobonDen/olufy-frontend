import type { FC } from 'react'
import { Fragment, useMemo } from 'react'

import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { formatNumber } from '@olufy-frontend/shared/utils'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import Button from '@/components/Button'

export interface IDomainData {
  name: string
  registerPrice: number
  continuePrice: number
  transferPrice: number
}

interface IDomainOneTableProps {
  data: IDomainData[]
  refetch?: VoidFunction
}

const DomainPriceListTable: FC<IDomainOneTableProps> = ({ data, refetch }) => {
  const { i18n } = useLingui()

  // _Memo
  const columns = useMemo(
    () =>
      [
        {
          dataIndex: 'name',
          title: 'โดเมน',
          align: 'center',
          className: clsx(`min-w-[160px]`),
        },
        {
          dataIndex: 'registerPrice',
          title: 'จดทะเบียนโดเมน',
          align: 'center',
          className: clsx(`min-w-[160px]`),
          render: (value) => <span>{formatNumber({ number: value, decimals: 2 })}฿</span>,
        },
        {
          dataIndex: 'continuePrice',
          title: 'ต่ออายุโดเมน',
          align: 'center',
          className: clsx(`min-w-[160px]`),
          render: (value) => <span>{formatNumber({ number: value })}฿</span>,
        },
        {
          dataIndex: 'transferPrice',
          title: 'โอนโดเมน',
          align: 'center',
          className: clsx(`min-w-[160px]`),
          render: (value) => <span>{formatNumber({ number: value })}฿</span>,
        },
        {
          dataIndex: 'actions',
          title: 'จดทะเบียน',
          className: clsx(`min-w-[200px] w-[147px]`),
          render: (_value, record) => (
            <Button variant="success" className={clsx(`min-h-[40px] w-full !px-4`)}>
              {i18n._(t`จดทะเบียน`)} {record.name}
            </Button>
          ),
        },
      ] as TableColumn<IDomainData>[],
    [i18n],
  )

  return (
    <Fragment>
      <Table columns={columns} dataSource={data ?? []} />
    </Fragment>
  )
}

export default DomainPriceListTable
