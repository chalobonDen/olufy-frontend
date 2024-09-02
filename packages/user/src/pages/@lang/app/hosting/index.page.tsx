import { Fragment, useMemo } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { range, sample } from 'lodash-es'
import clsx from 'clsx'
import { Input, Pagination, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { useQuery } from '@tanstack/react-query'

import type { DocumentProps } from '@/renderer/types'
import Button from '@/components/Button'
import ViewButton from '@/components/Client/Buttons/ViewButton'
import { formatDate, showRangeAndTotalPagination } from '@/utils'

import { UserProductStatus } from '@/enums/package'

interface ITableData {
  id?: number
  package: string
  name: string
  ip: string
  createdAt: Date
  status?: string
}

const MOCK_DATA: ITableData[] = range(1, 6).map((n) => ({
  id: n,
  package: 'JUNIOR',
  name: 'Demo.com',
  ip: '199.323.133.33',
  createdAt: new Date(),
  status: sample(['active', 'inActive']),
}))

export const Page = () => {
  const { i18n } = useLingui()

  // _Query
  const { data, isLoading } = useQuery(['get-domain-list'], () => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_DATA), 500)) as Promise<ITableData[]>
  })

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'name',
        title: i18n._(t`Name`),
        align: 'left',
        className: clsx(`min-w-[160px]`),
        render: (val, record) => (
          <div className={clsx(`flex flex-col`)}>
            <span className={clsx(`text-body-20`)}>{record.package}</span>
            <span className={clsx(`font-light`)}>{val}</span>
          </div>
        ),
      },
      {
        dataIndex: 'ip',
        title: i18n._(t`IP`),
        align: 'center',
        className: clsx(`min-w-[120px]`),
        render: (val) => <span className={clsx(`font-light`)}>{val}</span>,
      },
      {
        dataIndex: 'createdAt',
        title: i18n._(t`Registration date`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => formatDate(val, 'dd/MM/yyyy'),
      },
      {
        dataIndex: 'status',
        title: i18n._(t`Status`),
        align: 'center',
        className: clsx(`min-w-[40px]`),
        render: (val: UserProductStatus) => {
          if (val === UserProductStatus.ACTIVE)
            return (
              <Tag variant="success" className={clsx(`w-[120px]`)}>
                {i18n._(t`Active`)}
              </Tag>
            )
          if (val === UserProductStatus.IN_ACTIVE)
            return (
              <Tag variant="error" className={clsx(`w-[120px]`)}>
                {i18n._(t`In active`)}
              </Tag>
            )
        },
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'center',
        className: clsx(`w-[100px] min-w-[120px]`),
        render: (_val, record) => <ViewButton as="a" href={`/app/hosting/${record.id}`} />,
      },
    ] as TableColumn<ITableData>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-hosting-icon" className={clsx(`square-8`)} />
        <h3 className={clsx(`text-header-3`)}>{i18n._(t`Hosting`)}</h3>
      </div>

      <div className={clsx(`mt-6 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button variant="success" buttonType="icon-text" as="a" href={`/app/hosting/packages`} size="medium">
          <SvgIcon name="cart" className={clsx(`square-6`)} />
          <span>{i18n._(t`Order more`)}</span>
        </Button>

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
        columns={columns}
        dataSource={data ? data : []}
        loading={isLoading}
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
  title: t`Hosting`,
}
