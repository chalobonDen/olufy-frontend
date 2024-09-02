import { Fragment, useMemo } from 'react'

import clsx from 'clsx'
import { Input, Pagination, SvgIcon } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { usePagination } from '@olufy-frontend/shared/hooks/usePagination'
import { useQuery } from '@tanstack/react-query'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { formatPrice } from '@olufy-frontend/shared/utils'
import { padStart } from 'lodash-es'

import Button from '@/components/Button'
import { useUserStore } from '@/stores/user'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { usePageContext } from '@/hooks/usePageContext'
import ViewButton from '@/components/Client/Buttons/ViewButton'
import { formatDate, showRangeAndTotalPagination } from '@/utils'
import type { DocumentProps } from '@/renderer/types'
import { ReceiptService } from '@/services'

import type { IReceiptsQueryParams, ISampleReceipts } from '@/types/modules/receipt'

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { scrollToTop } = useBackofficeLayout()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as IReceiptsQueryParams

  // _Pagination
  const { queryParams, onPageChange, onSearch, search, setSearch } = usePagination(searchParams)

  // _Query
  const { data, isLoading } = useQuery(
    ['get-client-billing-receipt-list', queryParams],
    ({ signal }) => ReceiptService.list(queryParams, { signal }),
    {
      enabled: !!profile,
      onSuccess: scrollToTop,
    },
  )

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'documentNo',
        title: i18n._(t`เลขที่เอกสาร`),
        align: 'left',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'orderId',
        title: `Order ID`,
        align: 'left',
        className: clsx(`min-w-[120px]`),
        render: (val) => `#${padStart(val, 5, '0')}`,
      },
      {
        dataIndex: 'name',
        title: `Order Name`,
        align: 'center',
        className: clsx(`min-w-[200px]`),
      },
      {
        dataIndex: 'createdAt',
        title: i18n._(t`Created At`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => formatDate(new Date(val), 'dd/MM/yyyy'),
      },
      {
        dataIndex: 'total',
        title: i18n._(t`Total`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => <span>{formatPrice(val)} THB</span>,
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'center',
        className: clsx(`w-[100px] min-w-[120px]`),
        render: (_val, record) => <ViewButton as="a" href={`/app/billing/receipt/${record.documentId}`} />,
      },
    ] as TableColumn<ISampleReceipts>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-invoice-icon" className={clsx(`square-8`)} />
        <h3 className={clsx(`text-header-3`)}>Receipt / Tax Invoice</h3>
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
  title: `Receipt / Tax Invoice`,
}
