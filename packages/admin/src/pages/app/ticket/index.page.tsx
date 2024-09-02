import { Fragment, useMemo } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Button, Input, Pagination, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import { useQuery } from '@tanstack/react-query'
import { formatDate } from '@olufy-frontend/shared/utils'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { usePagination } from '@olufy-frontend/shared/hooks/usePagination'

import type { DocumentProps } from '@/renderer/types'
import ViewButton from '@/components/Buttons/ViewButton'
import { showRangeAndTotalPagination } from '@/utils'
import { TicketService } from '@/services'
import { useUserStore } from '@/stores/user'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { usePageContext } from '@/hooks/usePageContext'

import type { ISimpleTicket, ITicketQueryParams } from '@/types/modules/ticket'
import { TicketStatus } from '@/enums'

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { scrollToTop } = useBackofficeLayout()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as ITicketQueryParams

  // _Pagination
  const { queryParams, search, onSearch, setSearch, onPageChange, setQueryParams } = usePagination(searchParams, [
    'status',
  ])

  // _Query
  const { data, isLoading } = useQuery(
    ['get-ticket-list', queryParams],
    ({ signal }) => TicketService.list(queryParams, { signal }),
    {
      enabled: !!profile,
      onSuccess: scrollToTop,
    },
  )

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'title',
        title: i18n._(t`หัวข้อ`),
        align: 'left',
        className: clsx(`min-w-[230px]`),
      },
      {
        dataIndex: 'nameEn',
        title: i18n._(t`ชื่อ - นามสกุล`),
        align: 'center',
        className: clsx(`min-w-[230px]`),
      },
      {
        dataIndex: 'permission',
        title: i18n._(t`แผนกที่ต้องการติดต่อ`),
        align: 'center',
        className: clsx(`min-w-[300px]`),
      },
      {
        dataIndex: 'createdAt',
        title: i18n._(t`วันที่และเวลา`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => formatDate(new Date(val), 'dd/MM/yyyy HH:mm'),
      },
      {
        dataIndex: 'status',
        title: i18n._(t`สถานะ`),
        align: 'center',
        className: clsx(`min-w-[40px]`),
        filter: [
          {
            text: i18n._(t`รอตรวจสอบ`),
            value: TicketStatus.PENDING,
          },
          {
            text: i18n._(t`ตอบกลับแล้ว`),
            value: TicketStatus.ADMIN_REPLY,
          },
          {
            text: i18n._(t`ลูกค้าตอบกลับ`),
            value: TicketStatus.CUSTOMER_REPLY,
          },
          {
            text: i18n._(t`สิ้นสุด`),
            value: TicketStatus.CLOSED,
          },
        ],
        defaultFilter: queryParams?.status,
        filterOptions: {
          resetText: i18n._(t`รีเซ็ต`),
          submitText: i18n._(t`ยืนยัน`),
        },
        onFilter: (values) => {
          setQueryParams((state) => ({
            ...state,
            status: values,
          }))
        },
        render: (val: TicketStatus) => {
          switch (val) {
            case TicketStatus.PENDING:
              return (
                <Tag variant="warning" className={clsx(`w-[120px]`)}>
                  {i18n._(t`รอตรวจสอบ`)}
                </Tag>
              )

            case TicketStatus.ADMIN_REPLY:
              return (
                <Tag variant="info" className={clsx(`w-[120px]`)}>
                  {i18n._(t`ตอบกลับแล้ว`)}
                </Tag>
              )

            case TicketStatus.CUSTOMER_REPLY:
              return (
                <Tag variant="danger" className={clsx(`w-[120px]`)}>
                  {i18n._(t`ลูกค้าตอบกลับ`)}
                </Tag>
              )

            default:
              return (
                <Tag variant="success" className={clsx(`w-[120px]`)}>
                  {i18n._(t`สิ้นสุด`)}
                </Tag>
              )
          }
        },
      },
      {
        dataIndex: 'actions',
        title: i18n._(t`การจัดการ`),
        align: 'center',
        className: clsx(`w-[100px] min-w-[120px]`),
        render: (_val, record) => <ViewButton as="a" href={`/app/ticket/${record.id}`} />,
      },
    ] as TableColumn<ISimpleTicket>[]
  }, [i18n, queryParams?.status, setQueryParams])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-ticket-icon" className={clsx(`square-8`)} />
        <h3 className={clsx(`text-header-3`)}>{i18n._(t`ข้อความจากผู้ใช้งาน`)}</h3>
      </div>

      <div className={clsx(`mt-6 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
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
            value={search}
            placeholder={i18n._(t`ค้นหา`)}
            className={clsx(`w-[300px]`, `sm:flex-1`)}
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
  title: t`ข้อความจากผู้ใช้งาน`,
}
