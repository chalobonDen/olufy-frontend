import { Fragment, useMemo } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Input, Pagination, SvgIcon } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { range } from 'lodash-es'
import { useQuery } from '@tanstack/react-query'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'

import type { DocumentProps } from '@/renderer/types'
import Button from '@/components/Button'
import { showRangeAndTotalPagination } from '@/utils'
import ViewButton from '@/components/Client/Buttons/ViewButton'

interface ITableData {
  id?: number
  licenseId: string
  application: string
  key: string
  domain: string
  ip: string
}

const MOCK_DATA: ITableData[] = range(1, 11).map((n) => ({
  id: n,
  licenseId: '#453431',
  application: 'APP Name',
  key: 'FFDF5456454r344534',
  domain: 'Demo domain',
  ip: '199.323.133.33',
}))

export const Page = () => {
  const { i18n } = useLingui()

  // _Query
  const { data, isLoading } = useQuery(['get-license-key-list'], () => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_DATA), 500)) as Promise<ITableData[]>
  })

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'licenseId',
        title: i18n._(t`ID`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'application',
        title: i18n._(t`Application`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'key',
        title: i18n._(t`Key`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'domain',
        title: i18n._(t`Domain`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'ip',
        title: i18n._(t`Server IP`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'center',
        className: clsx(`w-[100px] min-w-[120px]`),
        render: (_val, record) => <ViewButton as="a" href={`/app/license-key/${record.id}`} />,
      },
    ] as TableColumn<ITableData>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-license-key-icon" className={clsx(`square-8`)} />
        <h3 className={clsx(`text-header-3`)}>{i18n._(t`License key / Addons`)}</h3>
      </div>

      <div className={clsx(`mt-6 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button variant="success" buttonType="icon-text" as="a" href={`/app/license-key/packages`} size="medium">
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
  title: t`License Key`,
}
