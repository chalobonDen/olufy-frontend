import { Fragment, useMemo } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Input, Pagination, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { range, sample } from 'lodash-es'
import { useQuery } from '@tanstack/react-query'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { formatPrice } from '@olufy-frontend/shared/utils'

import type { DocumentProps } from '@/renderer/types'
import Button from '@/components/Button'
import { formatDate, showRangeAndTotalPagination } from '@/utils'
import ViewButton from '@/components/Client/Buttons/ViewButton'

interface ITableData {
  id?: number
  orderId: string
  name: string
  createdAt: Date
  total: number
  status?: string
}

const MOCK_DATA: ITableData[] = range(1, 11).map((n) => ({
  id: n,
  orderId: '#453431',
  name: 'HOSTING JUNIOR',
  createdAt: new Date(),
  total: 500,
  status: sample(['paid', 'failed', 'cancel']),
}))

export const Page = () => {
  const { i18n } = useLingui()

  // _Query
  const { data, isLoading } = useQuery(['get-invoice-list'], () => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_DATA), 500)) as Promise<ITableData[]>
  })

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'orderId',
        title: i18n._(t`Order ID`),
        align: 'left',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'name',
        title: i18n._(t`Order Name`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'createdAt',
        title: i18n._(t`Registration date`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => formatDate(val, 'dd/MM/yyyy'),
      },
      {
        dataIndex: 'total',
        title: i18n._(t`Total`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => <span>{formatPrice(val)} THB</span>,
      },
      {
        dataIndex: 'status',
        title: i18n._(t`Status`),
        align: 'center',
        className: clsx(`min-w-[40px]`),
        render: (val) => {
          if (val === 'paid')
            return (
              <Tag variant="success" className={clsx(`w-[120px]`)}>
                {i18n._(t`PAID`)}
              </Tag>
            )
          if (val === 'failed')
            return (
              <Tag variant="error" className={clsx(`w-[120px]`)}>
                {i18n._(t`FAILED`)}
              </Tag>
            )
          if (val === 'cancel')
            return (
              <Tag variant="error" className={clsx(`w-[120px]`)}>
                {i18n._(t`CANCEL`)}
              </Tag>
            )
        },
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'center',
        className: clsx(`w-[100px] min-w-[120px]`),
        render: (_val, record) => <ViewButton as="a" href={`/app/invoice/${record.id}`} />,
      },
    ] as TableColumn<ITableData>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-invoice-icon" className={clsx(`square-8`)} />
        <h3 className={clsx(`text-header-3`)}>{i18n._(t`Invoice`)}</h3>
      </div>

      <div className={clsx(`mt-6 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <form
          className={clsx(`ml-auto flex items-center space-x-2`, `sm:ml-0 sm:w-full`)}
          onSubmit={(e) => {
            e.preventDefault()
            //
          }}
        >
          <Input
            name="search"
            prefix={<SvgIcon name="search" className={clsx(`square-6`)} />}
            placeholder={i18n._(t`ค้นหา`)}
            className={clsx(`w-[300px]`, `sm:flex-1`)}
            onChange={() => {
              //
            }}
          />
          <Button variant="primary" type="submit" size="medium">
            {i18n._(t`ค้นหา`)}
          </Button>
        </form>
      </div>

      <Table
        rowKey={(_, index) => index}
        className={clsx(`mt-4`)}
        loading={isLoading}
        columns={columns}
        dataSource={data ? data : []}
      />

      <Pagination
        className={clsx(`mt-6 w-full`)}
        current={1}
        total={100}
        pageSize={10}
        showTotal={showRangeAndTotalPagination}
        showLessItems
        onChange={() => {
          //
        }}
      />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Invoice`,
}
