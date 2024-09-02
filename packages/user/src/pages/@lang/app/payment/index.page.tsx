import { Fragment, useMemo } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Input, Pagination, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { useQuery } from '@tanstack/react-query'
import { range, sample } from 'lodash-es'
import { formatPrice } from '@olufy-frontend/shared/utils'

import type { DocumentProps } from '@/renderer/types'
import Button from '@/components/Button'
import { formatDate, showRangeAndTotalPagination } from '@/utils'

type Status = 'paid' | 'failed' | 'cancel' | 'waiting'

interface ITableData {
  id?: number
  name: string
  expiredAt: Date
  amount: number
  status?: Status
}

const MOCK_DATA: ITableData[] = range(1, 11).map((n) => ({
  id: n,
  name: 'HOSTING JUNIOR',
  expiredAt: new Date('2023-07-01'),
  amount: 500,
  status: sample(['paid', 'failed', 'cancel', 'waiting']),
}))

export const Page = () => {
  const { i18n } = useLingui()

  // _Query
  const { data, isLoading } = useQuery(['get-payment-list'], () => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_DATA), 500)) as Promise<ITableData[]>
  })

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'id',
        title: i18n._(t`Order ID`),
        align: 'left',
        className: clsx(`min-w-[120px]`),
        render: (val: number) => `#${val}`,
      },
      {
        dataIndex: 'name',
        title: i18n._(t`Order Name`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'expiredAt',
        title: i18n._(t`Due Date`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val: Date) => formatDate(new Date(val), 'dd/MM/yyyy'),
      },
      {
        dataIndex: 'amount',
        title: i18n._(t`Total`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val: number) => `${formatPrice(val)} THB`,
      },
      {
        dataIndex: 'status',
        title: i18n._(t`Status`),
        align: 'center',
        className: clsx(`min-w-[40px]`),
        render: (val: Status) => {
          switch (val) {
            case 'waiting':
              return (
                <Tag variant="info" className={clsx(`w-[120px] font-medium`)}>
                  {i18n._(t`WAITING`)}
                </Tag>
              )

            case 'paid':
              return (
                <Tag variant="success" className={clsx(`w-[120px] font-medium`)}>
                  {i18n._(t`PAID`)}
                </Tag>
              )

            case 'failed':
              return (
                <Tag variant="error" className={clsx(`w-[120px] font-medium`)}>
                  {i18n._(t`FAILED`)}
                </Tag>
              )

            case 'cancel':
              return (
                <Tag variant="error" className={clsx(`w-[120px] font-medium`)}>
                  {i18n._(t`CANCEL`)}
                </Tag>
              )
          }
        },
      },
      {
        dataIndex: 'actions',
        title: 'Action',
        align: 'center',
        className: clsx(`w-[100px] min-w-[120px]`),
        render: (_val, record) => {
          const isCanPayment = record.status === 'waiting'

          return (
            <Button
              buttonType="icon-text"
              size="small"
              variant={isCanPayment ? 'success' : 'default'}
              className={clsx({
                'bg-white-600 dark:bg-dark-300': !isCanPayment,
              })}
              disabled={!isCanPayment}
            >
              <SvgIcon name="cart" />
              <span>Payment</span>
            </Button>
          )
        },
      },
    ] as TableColumn<ITableData>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-payment-icon" className={clsx(`square-8`)} />
        <h3 className={clsx(`text-header-3`)}>{i18n._(t`Payment`)}</h3>
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
        dataSource={data ?? []}
        emptyMsg={i18n._(t`ไม่มีรายการ`)}
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
  title: t`Payment`,
}
