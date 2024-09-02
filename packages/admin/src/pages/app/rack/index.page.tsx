import { Fragment, useMemo } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import { Button, Input, Pagination, SvgIcon } from '@olufy-frontend/shared/UI'
import Table from '@olufy-frontend/shared/UI/Table'
import { usePagination } from '@olufy-frontend/shared/hooks/usePagination'

import type { DocumentProps } from '@/renderer/types'
import { showRangeAndTotalPagination } from '@/utils'
import RackTableAction from '@/components/Actions/RackTableAction'
import { RackService } from '@/services'
import { useUserStore } from '@/stores/user'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { usePageContext } from '@/hooks/usePageContext'

import type { IRackQueryParams, ISimpleRack } from '@/types/modules/rack'

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { scrollToTop } = useBackofficeLayout()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as IRackQueryParams

  // _Pagination
  const { queryParams, onPageChange, onSearch, search, setSearch, setQueryParams } = usePagination(searchParams, [
    'dataCenterId',
  ])

  // _Query
  const { data, isLoading, refetch } = useQuery(
    ['rack-list', queryParams],
    ({ signal }) => RackService.list(queryParams, { signal }),
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
        dataIndex: 'maxSlot',
        title: i18n._(t`Max Solt`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'detail',
        title: i18n._(t`รายละเอียด`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'dataCenter',
        title: i18n._(t`Data Center`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'right',
        className: clsx(`min-w-[80px]`),
        render: (_val, record) => <RackTableAction data={record} onRefetch={refetch} />,
      },
    ] as TableColumn<ISimpleRack>[]
  }, [i18n, refetch])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-rack-icon" className={clsx(`square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`จัดการ Rack`)}</h1>
      </div>

      <div className={clsx(`mt-8 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button as="a" href="/app/rack/create" variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="plus-circle" />
          <span>{i18n._(t`เพิ่ม Rack`)}</span>
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

      <div className={clsx(`mt-4 flex justify-end space-x-4`, `sm:flex-col sm:space-x-0`)}>
        <Input.Select
          className={clsx(`min-w-[180px]`)}
          onChange={(e) => {
            setQueryParams((state) => ({
              ...state,
              dataCenterId: e.target.value,
            }))
          }}
          value={queryParams.dataCenterId}
        >
          <option value="">{i18n._(t`เลือกชื่อสถานที่`)}</option>
          {data?.dataCenters.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Input.Select>
      </div>

      <Table
        rowKey={(_, index) => index}
        className={clsx(`mt-4`)}
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
  title: t`จัดการ Rack`,
}
