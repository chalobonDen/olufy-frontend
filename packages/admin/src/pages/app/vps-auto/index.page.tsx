import { Fragment, useMemo, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Button, ConfirmModal, Input, Pagination, SvgIcon, Switch } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { range, sample } from 'lodash-es'
import { useQuery } from '@tanstack/react-query'
import { formatNumber } from '@olufy-frontend/shared/utils'
import { toast } from 'react-hot-toast'

import { showRangeAndTotalPagination } from '@/utils'
import ViewButton from '@/components/Buttons/ViewButton'
import EditButton from '@/components/Buttons/EditButton'
import DeleteButton from '@/components/Buttons/DeleteButton'
import type { DocumentProps } from '@/renderer/types'

import type { ISimpleVpsAuto, IVpsAuto, IVpsAutoQueryParams } from '@/types/modules/vps-auto'

const mock: IVpsAuto[] = range(1, 11).map((n) => ({
  id: n,
  name: 'SSD Junior (SSD01)',
  os: 'Linux',
  cpu: '2',
  ram: '4',
  storage: 'SSD',
  disk: '1 TB',
  networkShare: '1 IP',
  bandwidth: 'Unlimited',
  price: 3500,
  status: sample([true, false]),
}))

export const Page = () => {
  const { i18n } = useLingui()

  // _State
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [statusId, setStatusId] = useState<number | null>(null)
  const [queryParams, setQueryParams] = useState<IVpsAutoQueryParams>({
    page: 1,
    perPage: 10,
    search: '',
  })
  const [search, setSearch] = useState<string>('')

  // _Query
  const { data } = useQuery(['mock-vps-auto', queryParams], () => {
    return {
      items: mock,
      page: queryParams?.page,
      perPage: queryParams?.perPage,
      total: mock.length,
    }
  })

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'name',
        title: i18n._(t`ชื่อแพ็กเกจ`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'os',
        title: i18n._(t`OS`),
        align: 'center',
        className: clsx(`min-w-[120px]`),
      },
      {
        dataIndex: 'cpu',
        title: i18n._(t`CPU`),
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
        title: i18n._(t`RAM`),
        align: 'center',
        className: clsx(`min-w-[120px]`),
        render: (val) => (
          <Fragment>
            <div>{val}</div>
            <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`GB`)}</div>
          </Fragment>
        ),
      },
      {
        dataIndex: 'storage',
        title: i18n._(t`STORAGE`),
        align: 'center',
        className: clsx(`min-w-[120px]`),
        render: (_val, record) => {
          return (
            <Fragment>
              <div>{record.storage}</div>
              <div className={clsx(`desc text-body-14 font-light`)}>{record.disk}</div>
            </Fragment>
          )
        },
      },
      {
        dataIndex: 'networkShare',
        title: i18n._(t`Network Share`),
        align: 'center',
        className: clsx(`min-w-[140px]`),
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
        render: (val) => <span>{formatNumber({ number: val })}</span>,
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
        render: (_val, record) => (
          <div className={clsx(`flex items-center space-x-2`)}>
            <ViewButton as="a" href={`/app/vps-auto/${record.id}/view`} />
            <EditButton as="a" href={`/app/vps-auto/${record.id}`} />
            <DeleteButton onClick={() => setDeleteId(record.id)} />
          </div>
        ),
      },
    ] as TableColumn<ISimpleVpsAuto>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-vps-auto-icon" className={clsx(`square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`จัดการ VPS Auto`)}</h1>
      </div>

      <div className={clsx(`mt-8 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button as="a" href="/app/vps-auto/create" variant="success" buttonType="icon-text" size="medium">
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

      <ConfirmModal
        visible={!!deleteId}
        title={i18n._(t`ยืนยันการลบ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ลบ`)}
        onConfirm={() => {
          // deleteVpsAuto(deleteId)
          toast.success(i18n._(t`ทำรายการสำเร็จ`))
          setDeleteId(null)
        }}
        onCancel={() => {
          setDeleteId(null)
        }}
        closeModal={() => {
          setDeleteId(null)
        }}
        // isLoading={isDeleteVpsAutoLoading}
      >
        <p>{i18n._(t`คุณต้องการลบรายการนี้ ?`)}</p>
      </ConfirmModal>

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
  title: t`จัดการ VPS Auto`,
}
