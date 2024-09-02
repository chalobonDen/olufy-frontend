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
import { formatDate, showRangeAndTotalPagination } from '@/utils'
import ViewButton from '@/components/Client/Buttons/ViewButton'
import Button from '@/components/Button'
import { VpsServerService } from '@/services'
import { useUserStore } from '@/stores/user'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { usePageContext } from '@/hooks/usePageContext'

import type { IOrderVpsServerQueryParams, ISimpleOrderVpsServer } from '@/types/modules/vps-server'

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { scrollToTop } = useBackofficeLayout()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as IOrderVpsServerQueryParams

  // _Pagination
  const { queryParams, onPageChange, onSearch, search, setSearch } = usePagination(searchParams)

  // _Query
  const { data, isLoading } = useQuery(
    ['get-client-vps-server-list', queryParams],
    ({ signal }) => VpsServerService.orderList(queryParams, { signal }),
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
        title: 'Name',
        align: 'left',
        className: clsx(`min-w-[200px]`),
        render: (val) => (
          <div className={clsx(`flex flex-col`)}>
            <span className={clsx(`text-body-20`)}>{val}</span>
          </div>
        ),
      },
      {
        dataIndex: 'ip',
        title: `VPS IP`,
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'createdAt',
        title: `Registration date`,
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => formatDate(new Date(val), 'dd/MM/yyyy'),
      },
      {
        dataIndex: 'flag',
        title: `Status`,
        align: 'center',
        className: clsx(`min-w-[80px]`),
        render: (val: 'active' | 'inactive') => {
          if (val === 'active')
            return (
              <Tag variant="success" className={clsx(`w-[120px]`)}>
                {i18n._(t`Active`)}
              </Tag>
            )
          if (val === 'inactive')
            return (
              <Tag variant="error" className={clsx(`w-[120px]`)}>
                {i18n._(t`Inactive`)}
              </Tag>
            )
        },
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'center',
        className: clsx(`w-[100px] min-w-[120px]`),
        render: (_val, record) => <ViewButton as="a" href={`/app/vps-server/${record.id}`} />,
      },
    ] as TableColumn<ISimpleOrderVpsServer>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-vps-server-icon" className={clsx(`square-8`)} />
        <h3 className={clsx(`text-header-3`)}>{i18n._(t`VPS Server`)}</h3>
      </div>

      <div className={clsx(`mt-6 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button variant="success" buttonType="icon-text" as="a" href={`/app/vps-server/packages`} size="medium">
          <SvgIcon name="cart" className={clsx(`square-6`)} />
          <span>{i18n._(t`Order more`)}</span>
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
  title: `VPS Server`,
}
