import { Fragment, useMemo, useState } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Input, Pagination, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { range } from 'lodash-es'

import type { DocumentProps } from '@/renderer/types'
import { formatDate, showRangeAndTotalPagination } from '@/utils'
import ViewButton from '@/components/Client/Buttons/ViewButton'
import { useSetting } from '@/hooks/stores/useSetting'
import Button from '@/components/Button'

import { UserProductStatus } from '@/enums/package'

interface ITableData {
  id: number
  product: {
    name: string
    package: string
  }
  ip: string
  createdAt: Date
  status: string
}

const mock: ITableData[] = range(1, 11).map((n) => ({
  id: n,
  product: {
    name: 'VPU Auto SSD #',
    package: 'Windows Package',
  },
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
        title: i18n._(t`Name`),
        align: 'left',
        className: clsx(`min-w-[200px]`),
        render: (val) => (
          <div className={clsx(`flex flex-col`)}>
            <span className={clsx(`text-body-20`)}>{val.name}</span>
            <span className={clsx(`font-light`)}>{val.package}</span>
          </div>
        ),
      },
      {
        dataIndex: 'ip',
        title: i18n._(t`VPS IP`),
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
        className: clsx(`min-w-[80px]`),
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
        render: (_val, record) => <ViewButton as="a" href={`/app/vps-auto/${record.id}`} />,
      },
    ] as TableColumn<ITableData>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-vps-auto-icon" className={clsx(`square-8`)} />
        <h3 className={clsx(`text-header-3`)}>{i18n._(t`VPS Auto`)}</h3>
      </div>

      <div className={clsx(`mt-6 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button variant="success" buttonType="icon-text" as="a" href={`/app/vps-auto/packages`} size="medium">
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
  title: t`VPS Auto`,
}
