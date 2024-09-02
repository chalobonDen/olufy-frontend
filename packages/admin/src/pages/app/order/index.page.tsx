import { Fragment, useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Button, Input, SvgIcon, Pagination, Card } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { formatDate, formatNumber } from '@olufy-frontend/shared/utils'
import { range } from 'lodash-es'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { useQuery } from '@tanstack/react-query'

import type { DocumentProps } from '@/renderer/types'
import ViewButton from '@/components/Buttons/ViewButton'
import { showRangeAndTotalPagination } from '@/utils'

import type { IOrder, IOrderQueryParams } from '@/types/modules/order'

const mock: IOrder[] = range(1, 11).map((n) => ({
  id: n,
  orderId: '#453431',
  username: 'Demo Name',
  orderDetail: 'Dedicated Server',
  expiredAt: new Date('2023-07-01'),
  total: 500,
}))

export const Page = () => {
  const { i18n } = useLingui()

  // _State
  const [queryParams, setQueryParams] = useState<IOrderQueryParams>({
    page: 1,
    perPage: 10,
    search: '',
  })
  const [search, setSearch] = useState<string>('')

  const orderOption = [
    {
      value: 1,
      label: 'Dedicated Server',
    },
    {
      value: 2,
      label: 'VPS Auto',
    },
    {
      value: 3,
      label: 'VPS Server',
    },
    {
      value: 4,
      label: 'Co-location',
    },
    {
      value: 5,
      label: 'Hosting',
    },
    {
      value: 6,
      label: 'Domains',
    },
    {
      value: 7,
      label: 'License key',
    },
  ]

  // _Query
  const { data } = useQuery(['mock-order', queryParams], () => {
    return {
      items: mock,
      page: queryParams?.page,
      perPage: queryParams?.perPage,
      total: mock.length,
    }
  })

  // _Memo
  const orderReport = useMemo(
    () => [
      {
        title: i18n._(t`Dedicated Server`),
        count: 2,
        icon: 'backoffice-order-report-dedicated-server',
      },
      {
        title: i18n._(t`VPS Auto Server`),
        count: 2,
        icon: 'backoffice-order-report-vps-auto-server',
      },
      {
        title: i18n._(t`VPS Server`),
        count: 2,
        icon: 'backoffice-order-report-vps-auto-server',
      },
      {
        title: i18n._(t`Co-location`),
        count: 4,
        icon: 'backoffice-order-report-co-location',
      },
      {
        title: i18n._(t`Hosting`),
        count: 8,
        icon: 'backoffice-order-report-hosting',
      },
      {
        title: i18n._(t`Domains`),
        count: 6,
        icon: 'backoffice-order-report-hosting',
      },
      {
        title: i18n._(t`License key`),
        count: 4,
        icon: 'backoffice-order-report-license-key',
      },
    ],
    [i18n],
  )

  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'orderId',
        title: i18n._(t`Order ID`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => <div className={clsx(`text-header-5`)}>{val}</div>,
      },
      {
        dataIndex: 'username',
        title: i18n._(t`Username / COMPANYName`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'orderDetail',
        title: i18n._(t`Order`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => <div className={clsx(`text-primary-500`)}>{val}</div>,
      },
      {
        dataIndex: 'expiredAt',
        title: i18n._(t`Total`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => formatDate(new Date(val), 'dd/MM/yyyy'),
      },
      {
        dataIndex: 'total',
        title: i18n._(t`Expiration Date`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => (
          <span>
            {formatNumber({ number: val })} {i18n._(t`THB`)}
          </span>
        ),
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'right',
        className: clsx(`w-[100px] min-w-[120px]`),
        render: (_val, record) => (
          <div className={clsx(`flex items-center space-x-2`)}>
            <ViewButton as="a" href={`/app/order/${record.id}/view`} />
          </div>
        ),
      },
    ] as TableColumn<IOrder>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-order-icon" className={clsx(`square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`จัดการออเดอร์`)}</h1>
      </div>

      <div className={clsx(`mt-6 grid grid-cols-4 gap-4`, `2xl:grid-cols-2`, `md:grid-cols-1`)}>
        {orderReport.map((item, reportIdx) => (
          <Card className={clsx(`flex items-center space-x-6 p-6`)} key={reportIdx}>
            <SvgIcon name={item.icon} className={clsx(`!text-white-900 square-20`, `xl:square-16`)} />
            <div>
              <div className={clsx(`desc text-body-20 font-light`, `sm:text-body-16 sm:font-light`)}>{item.title}</div>
              <div>
                <span className={clsx(`text-header-2`, `xs:text-header-3`)}>
                  {formatNumber({ number: item.count })}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <form
        className={clsx(`mt-10 flex justify-between`, `sm:flex-col sm:space-y-2`)}
        onSubmit={(e) => {
          e.preventDefault()
          setQueryParams((state) => ({
            ...state,
            search,
          }))
        }}
      >
        <Input.Select id="taxRate" name="taxRate" placeholder={i18n._(t`เลือก`)} className={clsx(`w-1/4`, `sm:w-full`)}>
          {Object.values(orderOption).map((item, idx) => (
            <option key={idx} value={item.value}>
              {item.label}
            </option>
          ))}
        </Input.Select>

        <div className={clsx(`ml-auto flex items-center space-x-2`, `sm:ml-0 sm:w-full`)}>
          <Input
            name="search"
            prefix={<SvgIcon name="search" className={clsx(`square-6`)} />}
            placeholder={i18n._(t`ค้นหา`)}
            className={clsx(`w-[300px]`, `sm:flex-1`)}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="primary" type="submit" size="medium">
            {i18n._(t`ค้นหา`)}
          </Button>
        </div>
      </form>

      <Table
        rowKey={(_, index) => index}
        className={clsx(`mt-4`)}
        columns={columns}
        dataSource={data?.items ?? []}
        // loading={isLoading}
      />

      <Pagination
        className={clsx(`mt-6 w-full`)}
        current={queryParams.page}
        total={100}
        pageSize={queryParams.perPage}
        showLessItems
        showTotal={showRangeAndTotalPagination}
        onChange={(e) => {
          setQueryParams((state) => ({
            ...state,
            page: e,
          }))
        }}
      />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Order`,
}
