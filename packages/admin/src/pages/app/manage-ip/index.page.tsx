import { Fragment, useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Button, ConfirmModal, Input, Pagination, SvgIcon } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import toast from 'react-hot-toast'
import { usePagination } from '@olufy-frontend/shared/hooks/usePagination'

import type { DocumentProps } from '@/renderer/types'
import EditButton from '@/components/Buttons/EditButton'
import DeleteButton from '@/components/Buttons/DeleteButton'
import { showRangeAndTotalPagination } from '@/utils'
import { IpService } from '@/services'
import { useUserStore } from '@/stores/user'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import DataCenterSelect from '@/components/Selects/DataCenterSelect'
import { handleAxiosErrorMsg } from '@/libs/axios'
import StatusIpSelect from '@/components/Selects/StatusIpSelect'
import StatusIpTag from '@/components/Tags/StatusIpTag'
import MemberShipSelect from '@/components/Selects/MemberShipSelect'
import { usePageContext } from '@/hooks/usePageContext'

import type { IInternetProtocolQueryParams, ISimpleInternetProtocol } from '@/types/modules/ip'
import type { StatusIp } from '@/enums/ip-status'
import type { IDataCenterRackItem } from '@/types/modules/data-center'

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { scrollToTop } = useBackofficeLayout()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as IInternetProtocolQueryParams

  // _Pagination
  const { queryParams, onPageChange, onSearch, search, setSearch, setQueryParams } = usePagination(searchParams, [
    'dataCenterId',
    'rackId',
    'rankId',
    'flag',
  ])

  // _State
  const [racks, setRacks] = useState<IDataCenterRackItem[]>([])
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // _Query
  const { data, isLoading, refetch } = useQuery(
    ['mock-manage-ip', queryParams],
    ({ signal }) => IpService.list(queryParams, { signal }),
    {
      enabled: !!profile,
      onSuccess: scrollToTop,
    },
  )

  // _Mutation
  const { mutate: deleteIp, isLoading: isDeleteIpLoading } = useMutation(
    (id: string | number) => IpService.delete(id),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: () => {
        toast.success(i18n._(t`ทำรายการสำเร็จ`))
        refetch()
        setDeleteId(null)
      },
    },
  )

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'ipv4',
        title: `IPV4`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'subnet',
        title: `Subnet`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'subnetMask',
        title: `Subnetmask`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'gateway',
        title: `Gateway`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'dns1',
        title: `DNS 1`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'dns2',
        title: `DNS 2`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'dataCenter',
        title: `Data Center`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => <div>{val.name}</div>,
      },
      {
        dataIndex: 'rack',
        title: `Rack`,
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => <div>{val.name}</div>,
      },
      {
        dataIndex: 'membership',
        title: i18n._(t`ระดับสมาชิก`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => <div className={clsx(`capitalize`)}>{val.name}</div>,
      },
      {
        dataIndex: 'flag',
        title: i18n._(t`สถานะการใช้`),
        align: 'center',
        className: clsx(`min-w-[120px]`),
        render: (val: StatusIp) => <StatusIpTag status={val} />,
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'right',
        className: clsx(`w-[100px] min-w-[120px]`),
        render: (_val, record) => (
          <div className={clsx(`flex items-center space-x-2`)}>
            <EditButton as="a" href={`/app/manage-ip/${record.id}`} />
            <DeleteButton onClick={() => setDeleteId(record.id)} />
          </div>
        ),
      },
    ] as TableColumn<ISimpleInternetProtocol>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-sidebar-manage-ip" className={clsx(`text-primary-500 square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`จัดการ IP`)}</h1>
      </div>

      <div className={clsx(`mt-8 flex items-start justify-between`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <div className={clsx(`flex space-x-4`)}>
          <Button as="a" href="/app/manage-ip/create" variant="success" buttonType="icon-text" size="medium">
            <SvgIcon name="plus-circle" />
            <span>{i18n._(t`เพิ่ม IP`)}</span>
          </Button>
          <Button as="a" href="/app/manage-ip/create-multiple" variant="success" buttonType="icon-text" size="medium">
            <SvgIcon name="plus-circle" />
            <span>{i18n._(t`เพิ่ม Multi IP`)}</span>
          </Button>
        </div>

        <form
          className={clsx(`sm:ml-0 sm:w-full`)}
          onSubmit={(e) => {
            e.preventDefault()
            onSearch()
          }}
        >
          <div className={clsx(`ml-auto flex items-center justify-end space-x-2`, `sm:ml-0 sm:w-full`)}>
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
          </div>
        </form>
      </div>

      <div className={clsx(`mt-4 flex justify-end space-x-4`, `sm:flex-col sm:space-x-0 sm:space-y-2`)}>
        <DataCenterSelect
          className={clsx(`min-w-[180px]`, `md:min-w-[150px]`, `md:min-w-[150px]`)}
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
          className={clsx(`min-w-[180px]`, `md:min-w-[150px]`)}
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

        <MemberShipSelect
          id="memberLevel"
          name="memberLevel"
          className={clsx(`min-w-[180px]`, `md:min-w-[150px]`)}
          value={queryParams.rankId}
          onChange={(e) => {
            setQueryParams((state) => ({
              ...state,
              rankId: e.target.value,
            }))
          }}
          disabledPlaceholder={false}
        />

        <StatusIpSelect
          id="status"
          name="status"
          placeholder={i18n._(t`สถานะการใช้`)}
          className={clsx(`min-w-[180px]`, `md:min-w-[150px]`)}
          value={queryParams.flag}
          onChange={(e) => {
            setQueryParams((state) => ({
              ...state,
              flag: e.target.value,
            }))
          }}
          disabledPlaceholder={false}
        />
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

      <ConfirmModal
        visible={!!deleteId}
        title={i18n._(t`ยืนยันการลบ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ลบ`)}
        onConfirm={() => {
          deleteIp(deleteId)
        }}
        onCancel={() => {
          setDeleteId(null)
        }}
        closeModal={() => {
          setDeleteId(null)
        }}
        isLoading={isDeleteIpLoading}
      >
        <p>{i18n._(t`คุณต้องการลบรายการนี้ ?`)}</p>
      </ConfirmModal>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการ IP`,
}
