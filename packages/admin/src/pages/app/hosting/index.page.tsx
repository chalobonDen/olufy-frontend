import { Fragment, useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { random, range, sample } from 'lodash-es'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { formatNumber } from '@olufy-frontend/shared/utils'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import { Button, ConfirmModal, Input, Pagination, SvgIcon, Switch } from '@olufy-frontend/shared/UI'
import Table from '@olufy-frontend/shared/UI/Table'
import { toast } from 'react-hot-toast'

import EditButton from '@/components/Buttons/EditButton'
import DeleteButton from '@/components/Buttons/DeleteButton'
import ViewButton from '@/components/Buttons/ViewButton'
import type { DocumentProps } from '@/renderer/types'
import { showRangeAndTotalPagination } from '@/utils'

import type { IHostingQueryParams, ISimpleHosting } from '@/types/modules/hosting'

const MOCK_HOSTING: ISimpleHosting[] = range(1, 11).map((n) => ({
  id: n,
  name: sample(['JUNIOR', 'SENIOR', 'TECHNICAL', 'SUPER']),
  domain: random(1, 5),
  storage: 10,
  bandwidth: 200,
  database: 5,
  fipAccount: 'Unlimited FTP',
  webControlPanel: 'DirectAdmin',
  price: 10000,
  taxWithheld: 0,
  status: sample([true, false]),
}))

export const Page = () => {
  const { i18n } = useLingui()

  // _State
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [statusId, setStatusId] = useState<number | null>(null)
  const [queryParams, setQueryParams] = useState<IHostingQueryParams>({
    page: 1,
    perPage: 10,
    search: '',
  })
  const [search, setSearch] = useState<string>('')

  // _Query
  const { data, isLoading } = useQuery(['mock-hosting', queryParams], () => {
    return {
      items: MOCK_HOSTING,
      page: queryParams?.page,
      perPage: queryParams?.perPage,
      total: MOCK_HOSTING.length,
    }
  })

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'name',
        title: i18n._(t`Name`),
        align: 'center',
        className: clsx(`min-w-[140px]`),
      },
      {
        dataIndex: 'domain',
        title: i18n._(t`Domain`),
        align: 'center',
        className: clsx(`min-w-[140px]`),
      },
      {
        dataIndex: 'storage',
        title: i18n._(t`Space`),
        align: 'center',
        className: clsx(`min-w-[140px]`),
        render: (val) => (
          <div>
            <div>{val}</div>
            <div className={clsx(`desc text-body-14`)}>GB</div>
          </div>
        ),
      },
      {
        dataIndex: 'bandwidth',
        title: i18n._(t`Transfer`),
        align: 'center',
        className: clsx(`min-w-[140px]`),
        render: (val) => (
          <div>
            <div>{val}</div>
            <div className={clsx(`desc text-body-14`)}>GB</div>
          </div>
        ),
      },
      {
        dataIndex: 'database',
        title: i18n._(t`Batabase`),
        align: 'center',
        className: clsx(`min-w-[140px]`),
        render: (val) => (
          <div>
            <div>{val}</div>
            <div className={clsx(`desc text-body-14`)}>Database</div>
          </div>
        ),
      },
      {
        dataIndex: 'fipAccount',
        title: i18n._(t`FTP Account`),
        align: 'center',
        className: clsx(`min-w-[140px]`),
      },
      {
        dataIndex: 'webControlPanel',
        title: i18n._(t`Web Control Panel`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: '',
        title: i18n._(t`Firewall`),
        align: 'center',
        className: clsx(`min-w-[140px]`),
        render: () => <span>{i18n._(t`Free`)}</span>,
      },
      {
        dataIndex: '',
        title: i18n._(t`SSL`),
        align: 'center',
        className: clsx(`min-w-[140px]`),
        render: () => <span>{i18n._(t`Free`)}</span>,
      },
      {
        dataIndex: 'price',
        title: i18n._(t`ราคา`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
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
            <EditButton as="a" href={`/app/hosting/${record.id}`} />
            <DeleteButton onClick={() => setDeleteId(record.id)} />
            <ViewButton as="a" href={`/app/hosting/${record.id}/view`} />
          </div>
        ),
      },
    ] as TableColumn<ISimpleHosting>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-hosting-icon" className={clsx(`square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`จัดการ Hosting`)}</h1>
      </div>

      <div className={clsx(`mt-8 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button as="a" href="/app/hosting/create" variant="success" buttonType="icon-text" size="medium">
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
        visible={!!deleteId}
        title={i18n._(t`ยืนยันการลบ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ลบ`)}
        onConfirm={() => {
          // deleteDomain(deleteId)
          toast.success(i18n._(t`ทำรายการสำเร็จ`))
          setDeleteId(null)
        }}
        onCancel={() => {
          setDeleteId(null)
        }}
        closeModal={() => {
          setDeleteId(null)
        }}
        // isLoading={isDeleteDomainLoading}
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
  title: t`Hosting`,
}
