import { Fragment, useMemo, useState } from 'react'

import clsx from 'clsx'
import { Input, Pagination, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { formatDate, formatNumber } from '@olufy-frontend/shared/utils'
import { range } from 'lodash-es'

import ViewButton from '@/components/Client/Buttons/ViewButton'
import { showRangeAndTotalPagination } from '@/utils'
import type { DocumentProps } from '@/renderer/types'
import Button from '@/components/Button'

interface ITableData {
  id: number
  product: {
    name: string
    price: number
  }
  hostName: string
  ip: string
  createdAt: Date
  status: 'inActive' | 'active'
}

const mock: ITableData[] = range(1, 11).map((n) => ({
  id: n,
  product: {
    name: 'Dedicated Game Server',
    price: 3500,
  },
  hostName: 'Domainname.com',
  ip: '199.323.133.33',
  createdAt: new Date(),
  status: 'active',
}))

export const Page = () => {
  const { i18n } = useLingui()

  // _State
  const [search, setSearch] = useState<string>('')

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'product',
        title: i18n._(t`Product / Service`),
        align: 'left',
        className: clsx(`min-w-[260px]`),
        render: (val) => (
          <div className={clsx(`flex flex-col`)}>
            <span className={clsx(`text-body-20`)}>{val.name}</span>
            <span className={clsx(`font-light`)}>
              {i18n._(t`Period Monthly`)} : {formatNumber({ number: val.price })} THB
            </span>
          </div>
        ),
      },
      {
        dataIndex: 'hostName',
        title: i18n._(t`Hostname`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'ip',
        title: i18n._(t`Public IP`),
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
        dataIndex: 'status',
        title: i18n._(t`Status`),
        align: 'center',
        className: clsx(`min-w-[100px]`),
        render: (val) => {
          if (val === 'active')
            return (
              <Tag variant="success" className={clsx(`w-[120px]`)}>
                {i18n._(t`Active`)}
              </Tag>
            )
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
        render: (_val, record) => <ViewButton as="a" href={`/app/dedicated-server/${record.id}`} />,
      },
    ] as TableColumn<ITableData>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-dedicated-icon" className={clsx(`square-8`)} />
        <h3 className={clsx(`text-header-3`)}>{i18n._(t`Dedicated Server`)}</h3>
      </div>
      <div className={clsx(`mt-6 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button variant="success" buttonType="icon-text" as="a" href="/app/dedicated-server/packages" size="medium">
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
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
          <Button variant="primary" type="submit" size="medium">
            {i18n._(t`ค้นหา`)}
          </Button>
        </form>
      </div>

      <Table rowKey={(_, index) => index} className={clsx(`mt-4`)} columns={columns} dataSource={mock} />

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
  title: t`Dedicated Server`,
}
