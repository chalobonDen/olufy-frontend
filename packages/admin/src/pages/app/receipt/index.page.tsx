import { Fragment, useMemo } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Button, Input, Pagination, SvgIcon } from '@olufy-frontend/shared/UI'
import { formatDate, formatPrice } from '@olufy-frontend/shared/utils'
import { useQuery } from '@tanstack/react-query'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { usePagination } from '@olufy-frontend/shared/hooks/usePagination'

import type { DocumentProps } from '@/renderer/types'
import { showRangeAndTotalPagination } from '@/utils'
import ProductsSelect from '@/components/Selects/ProductsSelect'
import { usePageContext } from '@/hooks/usePageContext'
import ViewButton from '@/components/Buttons/ViewButton'
import { useUserStore } from '@/stores/user'
import { ReceiptService } from '@/services'

import type { IReceiptQueryParams, ISimpleReceipt } from '@/types/modules/receipt'

export const Page = () => {
  const { profile } = useUserStore()
  const { i18n } = useLingui()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as IReceiptQueryParams

  // _Pagination
  const { queryParams, onPageChange, onSearch, search, setSearch, setQueryParams } = usePagination(searchParams, [
    'productId',
  ])

  // _Query
  const { data, isLoading } = useQuery(
    ['get-quotation-list', queryParams],
    ({ signal }) => ReceiptService.list(queryParams, { signal }),
    {
      enabled: !!profile,
    },
  )

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'documentNo',
        title: i18n._(t`เลขที่เอกสาร`),
        align: 'left',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'username',
        title: i18n._(t`Username / Company`),
        align: 'center',
        className: clsx(`min-w-[220px]`),
        render: (val, record) => (
          <div className={clsx(`flex flex-col`)}>
            <span>{val}</span>
            {record.company && <span className={clsx(`desc text-body-14 font-light`)}>{record.company}</span>}
          </div>
        ),
      },
      {
        dataIndex: 'name',
        title: i18n._(t`ชื่อรายการที่ชำระ`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'product',
        title: i18n._(t`สินค้า`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'total',
        title: i18n._(t`จำนวนเงินที่ชำระ`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => (
          <div className={clsx(`flex flex-col`)}>
            <span>{formatPrice(val)}</span>
            <span className={clsx(`desc text-body-14 font-light`)}>THB</span>
          </div>
        ),
      },
      {
        dataIndex: 'createdAt',
        title: i18n._(t`วันที่ชำระเงิน`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => (
          <div className={clsx(`flex flex-col`)}>
            <span>{formatDate(new Date(val), 'dd-MM-y')}</span>
            <span className={clsx(`desc text-body-14 font-light`)}>{formatDate(new Date(val), 'HH:mm')}</span>
          </div>
        ),
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'right',
        className: clsx(`min-w-[80px]`),
        render: (_val, record) => <ViewButton as="a" href={`/app/receipt/${record.documentId}`} />,
      },
    ] as TableColumn<ISimpleReceipt>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-quotation-icon" className={clsx(`text-primary-500 square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`การชำระเงิน`)}</h1>
      </div>

      <div className={clsx(`mt-8 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
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
      <div className={clsx(`mt-4 flex justify-end space-x-4`, `sm:flex-col sm:space-x-0`)}>
        <ProductsSelect
          id="productId"
          name="productId"
          placeholder={i18n._(t`รายการสินค้า`)}
          onChange={(e) => {
            setQueryParams((state) => ({
              ...state,
              productId: e.target.value,
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
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`การชำระเงิน`,
}
