import { Fragment, useMemo, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import { Button, Input, Pagination, SvgIcon } from '@olufy-frontend/shared/UI'
import Table from '@olufy-frontend/shared/UI/Table'
import { range } from 'lodash-es'
import { useQuery } from '@tanstack/react-query'
import { usePagination } from '@olufy-frontend/shared/hooks/usePagination'

import type { DocumentProps } from '@/renderer/types'
import { showRangeAndTotalPagination } from '@/utils'
import ServerTableAction from '@/components/Actions/ServerTableAction'
import { useUserStore } from '@/stores/user'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { ServerService } from '@/services'
import DataCenterSelect from '@/components/Selects/DataCenterSelect'
import { usePageContext } from '@/hooks/usePageContext'

import type { IServerQueryParams, ISimpleServer } from '@/types/modules/server'
import type { IDataCenterRackItem } from '@/types/modules/data-center'

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { scrollToTop } = useBackofficeLayout()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as IServerQueryParams

  // _Pagination
  const { queryParams, onPageChange, onSearch, search, setSearch, setQueryParams } = usePagination(searchParams, [
    'dataCenterId',
    'rackId',
  ])

  // _State
  const [racks, setRacks] = useState<IDataCenterRackItem[]>([])

  // _Query
  const { data, isLoading, refetch } = useQuery(
    ['server-list', queryParams],
    ({ signal }) => ServerService.list(queryParams, { signal }),
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
        dataIndex: 'cpu',
        title: i18n._(t`CPU`),
        align: 'center',
        className: clsx(`min-w-[220px]`),
      },
      {
        dataIndex: 'ram',
        title: i18n._(t`RAM`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'disk',
        title: i18n._(t`Disk`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'dataCenter',
        title: i18n._(t`Data Center`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'rack',
        title: i18n._(t`Rack`),
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
        dataIndex: 'actions',
        title: '',
        align: 'right',
        className: clsx(`min-w-[80px]`),
        render: (_val, record) => <ServerTableAction data={record} onRefetch={refetch} />,
      },
    ] as TableColumn<ISimpleServer>[]
  }, [i18n, refetch])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-server-icon" className={clsx(`square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`จัดการ Server List`)}</h1>
      </div>

      <div className={clsx(`mt-8 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button as="a" href="/app/server/create" variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="plus-circle" />
          <span>{i18n._(t`จัดการ Server`)}</span>
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

      <div className={clsx(`mt-4 flex justify-end space-x-4`, `sm:flex-col sm:space-x-0 sm:space-y-2`)}>
        <DataCenterSelect
          className={clsx(`min-w-[180px]`)}
          onChange={(e) => {
            setQueryParams((state) => ({
              ...state,
              dataCenterId: e.target.value,
              rackId: '',
            }))
          }}
          value={queryParams.dataCenterId}
          onGetRacks={(data) => {
            setRacks(data)

            if (data.length === 0)
              setQueryParams((state) => ({
                ...state,
                rackId: '',
              }))
          }}
          disabledPlaceholder={false}
        />
        <Input.Select
          className={clsx(`min-w-[180px]`)}
          onChange={(e) => {
            setQueryParams((state) => ({
              ...state,
              rackId: e.target.value,
            }))
          }}
          value={queryParams.rackId}
          disabled={racks.length === 0}
        >
          <option value="">{i18n._(t`เลือก Rack`)}</option>
          {racks?.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
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
  title: t`จัดการ Server List`,
}
