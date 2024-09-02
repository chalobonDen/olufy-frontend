import { Fragment, useMemo } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Input, Pagination, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { useQuery } from '@tanstack/react-query'
import { usePagination } from '@olufy-frontend/shared/hooks/usePagination'

import type { DocumentProps } from '@/renderer/types'
import Button from '@/components/Button'
import { formatDate, showRangeAndTotalPagination } from '@/utils'
import ViewButton from '@/components/Client/Buttons/ViewButton'
import { TicketService } from '@/services'
import { useUserStore } from '@/stores/user'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { usePageContext } from '@/hooks/usePageContext'

import { TicketStatus } from '@/enums/ticket'
import type { ISimpleTicket } from '@/types/modules/ticket'

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { scrollToTop } = useBackofficeLayout()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as any

  // _Pagination
  const { queryParams, onPageChange, onSearch, search, setSearch } = usePagination(searchParams)

  // _Query
  const { data, isLoading } = useQuery(
    ['get-contact-admin-list', queryParams],
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
        dataIndex: 'permission',
        title: i18n._(t`แผนก`),
        align: 'left',
        className: clsx(`min-w-[120px]`),
        render: (val) => <span className={clsx(`text-body-20`)}>{val}</span>,
      },
      {
        dataIndex: 'title',
        title: i18n._(t`หัวข้อ`),
        align: 'center',
        className: clsx(`min-w-[230px]`),
        render: (val, record) => (
          <div>
            <div className={clsx(`text-body-20`)}>#{record.id}</div>
            <div className={clsx(`font-light`)}>{val}</div>
          </div>
        ),
      },
      {
        dataIndex: 'createdAt',
        title: i18n._(t`วันที่และเวลา`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => formatDate(new Date(val), 'dd/MM/yyyy HH:mm'),
      },
      {
        dataIndex: 'status',
        title: i18n._(t`สถานะ`),
        align: 'center',
        className: clsx(`min-w-[40px]`),
        render: (val: TicketStatus) => {
          switch (val) {
            case TicketStatus.ADMIN_REPLY:
              return (
                <Tag variant="danger" className={clsx(`w-[120px]`)}>
                  {i18n._(t`แอดมินตอบกลับ`)}
                </Tag>
              )

            case TicketStatus.CLOSED:
              return (
                <Tag variant="success" className={clsx(`w-[120px]`)}>
                  {i18n._(t`สิ้นสุด`)}
                </Tag>
              )

            default:
              return (
                <Tag variant="warning" className={clsx(`w-[120px]`)}>
                  {i18n._(t`ส่งแล้ว`)}
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
        render: (_val, record) => <ViewButton as="a" href={`/app/contact-admin/${record.id}`} />,
      },
    ] as TableColumn<ISimpleTicket>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-contact-admin-icon" className={clsx(`square-8`)} />
        <h3 className={clsx(`text-header-3`)}>{i18n._(t`Contact Admin`)}</h3>
      </div>

      <div className={clsx(`mt-6 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button variant="success" buttonType="icon-text" as="a" href={`/app/contact-admin/create`} size="medium">
          <SvgIcon name="chat" className={clsx(`square-6`)} />
          <span>{i18n._(t`ติดต่อเจ้าหน้าที่`)}</span>
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

      <Table
        rowKey={(_, index) => index}
        className={clsx(`mt-4`)}
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
        showTotal={showRangeAndTotalPagination}
        showLessItems
        onChange={onPageChange}
      />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Contact Admin`,
}
