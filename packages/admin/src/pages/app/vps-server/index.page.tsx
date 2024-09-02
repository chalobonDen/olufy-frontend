import { Fragment, useMemo, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Button, ConfirmModal, Input, Pagination, SvgIcon, Switch } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { useMutation, useQuery } from '@tanstack/react-query'
import { formatNoRound, formatPrice } from '@olufy-frontend/shared/utils'
import { toast } from 'react-hot-toast'
import { usePagination } from '@olufy-frontend/shared/hooks/usePagination'

import { showRangeAndTotalPagination } from '@/utils'
import type { DocumentProps } from '@/renderer/types'
import { VpsServerService } from '@/services'
import VpsServerTableAction from '@/components/Actions/VpsServerTableAction'
import { useUserStore } from '@/stores/user'
import { handleAxiosErrorMsg } from '@/libs/axios'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { usePageContext } from '@/hooks/usePageContext'

import type { ISimpleVpsServer, IVpsServerQueryParams } from '@/types/modules/vps-server'

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { scrollToTop } = useBackofficeLayout()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as IVpsServerQueryParams

  // _State
  const [statusId, setStatusId] = useState<number | null>(null)

  // _Pagination
  const { queryParams, onPageChange, onSearch, search, setSearch } = usePagination(searchParams)

  // _Query
  const { data, isLoading, refetch } = useQuery(
    ['get-vps-server-list', queryParams],
    ({ signal }) => VpsServerService.list(queryParams, { signal }),
    {
      enabled: !!profile,
      onSuccess: scrollToTop,
    },
  )

  // _Mutation
  const { mutate: changeStatus } = useMutation((id: number) => VpsServerService.changeStatus(id), {
    onError: (err) => {
      const msg = handleAxiosErrorMsg(err)
      toast.error(msg)
    },
    onSuccess: () => {
      toast.success(i18n._(t`ทำรายการสำเร็จ`))
      setStatusId(null)
      refetch()
    },
  })

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'name',
        title: i18n._(t`ชื่อแพ็กเกจ`),
        align: 'left',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'cpu',
        title: `CPU`,
        align: 'center',
        className: clsx(`min-w-[120px]`),
        render: (val) => (
          <Fragment>
            <div>{val}</div>
            <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`core`)}</div>
          </Fragment>
        ),
      },
      {
        dataIndex: 'ram',
        title: `RAM`,
        align: 'center',
        className: clsx(`min-w-[120px]`),
        render: (val: { amount: number; unit: string }) => (
          <Fragment>
            <div>{formatNoRound(val.amount)}</div>
            <div className={clsx(`desc text-body-14 font-light`)}>{val.unit}</div>
          </Fragment>
        ),
      },
      {
        dataIndex: 'diskCapacity',
        title: `Storage`,
        align: 'center',
        className: clsx(`min-w-[120px]`),
        render: (val: { amount: number; unit: string }) => (
          <Fragment>
            <div>{formatNoRound(val.amount)}</div>
            <div className={clsx(`desc text-body-14 font-light`)}>{val.unit}</div>
          </Fragment>
        ),
      },
      {
        dataIndex: 'networkType',
        title: i18n._(t`Network Share`),
        align: 'center',
        className: clsx(`min-w-[140px]`),
        render: (val) => <span className={clsx(`capitalize`)}>{val}</span>,
      },
      {
        dataIndex: 'bandwidth',
        title: i18n._(t`Data Transfer`),
        align: 'center',
        className: clsx(`min-w-[120px]`),
      },
      {
        dataIndex: 'price',
        title: i18n._(t`ราคา`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => `${formatPrice(val)} THB`,
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
        render: (_val, record) => <VpsServerTableAction data={record} onRefetch={refetch} />,
      },
    ] as TableColumn<ISimpleVpsServer>[]
  }, [i18n, refetch])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-vps-server-icon" className={clsx(`square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`จัดการ VPS Server`)}</h1>
      </div>

      <div className={clsx(`mt-8 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button as="a" href="/app/vps-server/create" variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="plus-circle" />
          <span>{i18n._(t`เพิ่มแพ็กเกจ`)}</span>
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
        emptyMsg={i18n._(t`ไม่มีรายการ`)}
        loading={isLoading}
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

      {/* Modals */}
      <ConfirmModal
        visible={!!statusId}
        title={i18n._(t`ยืนยันการปิด/เปิด สถานะ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ยืนยัน`)}
        onConfirm={() => {
          changeStatus(statusId)
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
  title: t`จัดการ VPS Server`,
}
