import { Fragment, useMemo } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { range } from 'lodash-es'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import { Button, Input, Pagination, SvgIcon } from '@olufy-frontend/shared/UI'
import Table from '@olufy-frontend/shared/UI/Table'
import { usePagination } from '@olufy-frontend/shared/hooks/usePagination'

import type { DocumentProps } from '@/renderer/types'
import { showRangeAndTotalPagination } from '@/utils'
import DataCenterTableAction from '@/components/Actions/DataCenterTableAction'
import { DataCenterService } from '@/services'
import { useUserStore } from '@/stores/user'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { usePageContext } from '@/hooks/usePageContext'

import type { IDataCenter, IDataCenterQueryParams } from '@/types/modules/data-center'

const MOCK: IDataCenter[] = range(1, 6).map((n) => ({
  id: n,
  name: 'CSLoxinfo',
  tel: '088-234-1234',
  email: 'demo@mail.com',
  address: '123/123 อำเภอสันกำแพง ตำบลสันกำแพง เชียงใหม่ 50130',
  detail: '130 Rack, bla bla',
}))

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { scrollToTop } = useBackofficeLayout()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as IDataCenterQueryParams

  // _Pagination
  const { queryParams, onPageChange, onSearch, search, setSearch } = usePagination(searchParams)

  // _Query
  const { data, isLoading, refetch } = useQuery(
    ['data-center-list', queryParams],
    ({ signal }) => DataCenterService.list(queryParams, { signal }),
    {
      enabled: !!profile,
      onSuccess: scrollToTop,
    },
  )

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'name',
        title: i18n._(t`ชื่อ`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'tel',
        title: i18n._(t`เบอร์โทรศัพท์มือถือ`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'email',
        title: i18n._(t`อีเมล`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'address',
        title: i18n._(t`ที่อยู่`),
        align: 'center',
        className: clsx(`min-w-[15rem] w-[12.5rem]`),
      },
      {
        dataIndex: 'detail',
        title: i18n._(t`รายละเอียด`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'right',
        className: clsx(`min-w-[80px]`),
        render: (_val, record) => <DataCenterTableAction data={record} onRefetch={refetch} />,
      },
    ] as TableColumn<IDataCenter>[]
  }, [i18n, refetch])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-data-center-icon" className={clsx(`square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`จัดการ Data Center`)}</h1>
      </div>

      <div className={clsx(`mt-8 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button as="a" href="/app/data-center/create" variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="plus-circle" />
          <span>{i18n._(t`เพิ่ม Data Center`)}</span>
        </Button>

        <form
          className={clsx(`ml-auto flex items-center space-x-2`, `sm:ml-0 sm:w-full`)}
          onSubmit={(e) => {
            e.preventDefault()
            onSearch()
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

      <Table
        rowKey={(_, index) => index}
        className={clsx(`mt-6`)}
        columns={columns}
        dataSource={data?.items ?? []}
        loading={isLoading}
        emptyMsg={i18n._(t`ไม่มีรายการ`)}
      />

      <Pagination
        className={clsx(`mt-6 w-full`)}
        current={queryParams.page}
        total={data?.total}
        pageSize={queryParams.perPage}
        showLessItems
        showTotal={showRangeAndTotalPagination}
        onChange={onPageChange}
      />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการ Data Center`,
}
