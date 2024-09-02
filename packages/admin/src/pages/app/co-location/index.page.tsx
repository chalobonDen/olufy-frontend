import { Fragment, useMemo, useState } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { ConfirmModal, Button, Input, SvgIcon, Pagination, Switch } from '@olufy-frontend/shared/UI'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { toast } from 'react-hot-toast'
import { range } from 'lodash-es'

import type { DocumentProps } from '@/renderer/types'
import { showRangeAndTotalPagination } from '@/utils'
import EditButton from '@/components/Buttons/EditButton'
import ViewButton from '@/components/Buttons/ViewButton'
import DeleteButton from '@/components/Buttons/DeleteButton'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'

import type { ICoLocationQueryParams, ISimpleCoLocation } from '@/types/modules/co-location'

export const Page = () => {
  const { i18n } = useLingui()
  const { scrollToTop } = useBackofficeLayout()

  // _State
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [statusId, setStatusId] = useState<number | null>(null)
  const [queryParams, setQueryParams] = useState<ICoLocationQueryParams>({
    page: 1,
    perPage: 10,
    search: '',
  })
  const [search, setSearch] = useState<string>('')

  const mock: ISimpleCoLocation[] = range(1, 11).map((n) => ({
    id: n,
    name: 'NAME',
    sizeRack: '1U Rack',
    dataCenter: 'NAME',
    os: 'Linux',
    networkShare: 1,
    price: 500,
    status: true,
  }))

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
        dataIndex: 'sizeRack',
        title: i18n._(t`Size Rack`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'dataCenter',
        title: i18n._(t`Data Center`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'os',
        title: i18n._(t`OS`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'networkShare',
        title: i18n._(t`Network Share`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => <div>{val} IP</div>,
      },
      {
        dataIndex: 'price',
        title: i18n._(t`ราคา`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
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
            <EditButton as="a" href={`/app/co-location/${record.id}`} />
            <DeleteButton onClick={() => setDeleteId(record.id)} />
            <ViewButton as="a" href={`/app/co-location/${record.id}/view`} />
          </div>
        ),
      },
    ] as TableColumn<ISimpleCoLocation>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-co-location-icon" className={clsx(`square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`จัดการ Co-location`)}</h1>
      </div>

      <div className={clsx(`mt-8 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button as="a" href="/app/co-location/create" variant="success" buttonType="icon-text" size="medium">
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
            placeholder={i18n._(t`ค้นหา Co-location`)}
            className={clsx(`w-[300px]`, `sm:flex-1`)}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

      {/* confirm modal */}
      <ConfirmModal
        visible={!!deleteId}
        title={i18n._(t`ยืนยันการลบ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ลบ`)}
        onConfirm={() => {
          // deleteCoLocation(deleteId)
          toast.success(i18n._(t`ทำรายการสำเร็จ`))
          setDeleteId(null)
        }}
        onCancel={() => {
          setDeleteId(null)
        }}
        closeModal={() => {
          setDeleteId(null)
        }}
        // isLoading={isDeleteCoLocationLoading}
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
  title: t`จัดการ Co-location`,
}
