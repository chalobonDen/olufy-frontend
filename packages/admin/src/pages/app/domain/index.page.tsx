import { Fragment, useMemo, useState } from 'react'

import clsx from 'clsx'
import { Button, ConfirmModal, Input, Pagination, SvgIcon, Switch } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { formatNumber } from '@olufy-frontend/shared/utils'
import { range, sample } from 'lodash-es'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { DocumentProps } from '@/renderer/types'
import { showRangeAndTotalPagination } from '@/utils'
import EditButton from '@/components/Buttons/EditButton'
import DeleteButton from '@/components/Buttons/DeleteButton'
import ViewButton from '@/components/Buttons/ViewButton'

import type { IDomainQueryParams, IDomain, ISimpleDomain } from '@/types/modules/domain'

const mock: IDomain[] = range(1, 11).map((n) => ({
  id: n,
  name: sample(['.com', '.org']),
  domain: sample(['.com', '.org']),
  price: 3500,
  taxWithheld: 0,
  status: sample([true, false]),
}))

export const Page = () => {
  const { i18n } = useLingui()

  // _State
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [statusId, setStatusId] = useState<number | null>(null)
  const [queryParams, setQueryParams] = useState<IDomainQueryParams>({
    page: 1,
    perPage: 10,
    search: '',
  })
  const [search, setSearch] = useState<string>('')

  // _Query
  const { data } = useQuery(['mock-domain', queryParams], () => {
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
        dataIndex: 'domain',
        title: i18n._(t`Domain`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'price',
        title: i18n._(t`ราคา`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => (
          <span>
            {formatNumber({ number: val })} {i18n._(t`THB/Yearly`)}
          </span>
        ),
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
            <EditButton as="a" href={`/app/domain/${record.id}`} />
            <DeleteButton onClick={() => setDeleteId(record.id)} />
            <ViewButton as="a" href={`/app/domain/${record.id}/view`} />
          </div>
        ),
      },
    ] as TableColumn<ISimpleDomain>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-domain-icon" className={clsx(`square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`จัดการ Domain`)}</h1>
      </div>

      <div className={clsx(`mt-8 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button as="a" href="/app/domain/create" variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="plus-circle" />
          <span>{i18n._(t`เพิ่มโดเมน`)}</span>
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
  title: t`จัดการ Domain`,
}
