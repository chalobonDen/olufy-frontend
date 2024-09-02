import { Fragment, useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { range, sample } from 'lodash-es'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { formatNumber, formatPrice } from '@olufy-frontend/shared/utils'
import { Button, ConfirmModal, Input, Pagination, SvgIcon, Switch } from '@olufy-frontend/shared/UI'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import { toast } from 'react-hot-toast'
import Table from '@olufy-frontend/shared/UI/Table'

import type { DocumentProps } from '@/renderer/types'
import { showRangeAndTotalPagination } from '@/utils'
import DedicatedTableAction from '@/components/Actions/DedicatedTableAction'

import type { IDedicatedQueryParams, ISimpleDedicated } from '@/types/modules/dedicated'

const MOCK: ISimpleDedicated[] = range(1, 11).map((n) => ({
  id: n,
  name: 'AMD RYZEN™ 9 5950X 3.4 GHZ 16C | 32T',
  storageType: 'SSD',
  storageCapacity: 512,
  cpu: 'AMD RYZEN™ 9 5950X 3.4 GHZ 16C | 32T',
  ram: 128,
  os: 'Linux / Windows',
  networkShare: 1000,
  bandwidth: 'Unlimited',
  price: 10000,
  taxWithheld: 0,
  status: sample([true, false]),
}))

export const Page = () => {
  const { i18n } = useLingui()

  // _State
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [statusId, setStatusId] = useState<number | null>(null)
  const [queryParams, setQueryParams] = useState<IDedicatedQueryParams>({
    page: 1,
    perPage: 10,
    search: '',
  })
  const [search, setSearch] = useState<string>('')

  // _Query
  const { data, isLoading, refetch } = useQuery(['mock-dedicated', queryParams], () => {
    return {
      items: MOCK,
      page: queryParams?.page,
      perPage: queryParams?.perPage,
      total: MOCK.length,
    }
  })

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'name',
        title: i18n._(t`ชื่อแพ็กเกจ`),
        align: 'center',
        className: clsx(`min-w-[200px]`),
      },
      {
        dataIndex: 'os',
        title: i18n._(t`OS`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'cpu',
        title: i18n._(t`CPU`),
        align: 'center',
        className: clsx(`min-w-[200px]`),
      },
      {
        dataIndex: 'ram',
        title: i18n._(t`Ram`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => <span>DDR4 {val} GB</span>,
      },
      {
        dataIndex: 'storageType',
        title: i18n._(t`Ram`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val, record) => (
          <div className={clsx(`flex flex-col`)}>
            <span>{val}</span>
            <span>{record.storageCapacity}</span>
          </div>
        ),
      },
      {
        dataIndex: 'networkShare',
        title: i18n._(t`Network Share`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => <span>{formatNumber({ number: val })} Mbps</span>,
      },
      {
        dataIndex: 'bandwidth',
        title: i18n._(t`Data Transfer`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'price',
        title: i18n._(t`ราคา`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => <span>{formatPrice(val)}</span>,
      },
      {
        dataIndex: 'status',
        title: i18n._(t`สถานะการขาย`),
        align: 'center',
        className: clsx(`min-w-[120px]`),
        render: (val, record) => (
          <Switch
            variant="success"
            checked={val}
            onChange={() => {
              //
              setStatusId(record.id)
            }}
          />
        ),
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'right',
        className: clsx(`w-[100px] min-w-[120px]`),
        render: (_val, record) => <DedicatedTableAction data={record} onRefetch={refetch} />,
      },
    ] as TableColumn<ISimpleDedicated>[]
  }, [i18n, refetch])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-dedicated-icon" className={clsx(`square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`จัดการ Dedicated Server`)}</h1>
      </div>

      <div className={clsx(`mt-8 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button as="a" href="/app/dedicated/create" variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="plus-circle" />
          <span>{i18n._(t`เพิ่มแพ็กเกจ`)}</span>
        </Button>

        <form
          className={clsx(`ml-auto flex items-center space-x-2`, `sm:ml-0 sm:w-full`)}
          onSubmit={(e) => {
            e.preventDefault()
            setQueryParams((state) => ({
              ...state,
              search,
            }))
          }}
        >
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
        </form>
      </div>

      <Table
        rowKey={(_, index) => index}
        className={clsx(`mt-6`)}
        columns={columns}
        dataSource={data?.items ?? []}
        loading={isLoading}
      />

      <Pagination
        className={clsx(`mt-6 w-full`)}
        current={queryParams.page}
        total={data?.total}
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

      <ConfirmModal
        visible={!!statusId}
        title={i18n._(t`ยืนยันการปิด/เปิด สถานะ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ยืนยัน`)}
        onConfirm={() => {
          toast.success(i18n._(t`ทำรายการสำเร็จ`))
          setStatusId(null)
        }}
        onCancel={() => {
          setStatusId(null)
        }}
        closeModal={() => {
          setStatusId(null)
        }}
      >
        <p>{i18n._(t`คุณต้องการเปลี่ยนสถานะรายการนี้ ?`)}</p>
      </ConfirmModal>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการ Dedicated Server`,
}
