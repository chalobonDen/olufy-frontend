import { Fragment, useMemo } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Card, Input, Pagination, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { formatPrice } from '@olufy-frontend/shared/utils'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { useQuery } from '@tanstack/react-query'
import { usePagination } from '@olufy-frontend/shared/hooks/usePagination'

import type { DocumentProps } from '@/renderer/types'
import { formatDate, showRangeAndTotalPagination } from '@/utils'
import Button from '@/components/Button'
import { useUserStore } from '@/stores/user'
import { DepositService } from '@/services'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { usePageContext } from '@/hooks/usePageContext'

import type { IDepositQueryParams, ISimpleDeposit } from '@/types/modules/deposit'
import { DepositStatus } from '@/enums'

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { scrollToTop } = useBackofficeLayout()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as IDepositQueryParams

  // _Pagination
  const { queryParams, onPageChange, onSearch, search, setSearch } = usePagination(searchParams)

  // _Query
  const { data, isLoading } = useQuery(
    ['get-deposit-list', queryParams],
    ({ signal }) => DepositService.list(queryParams, { signal }),
    {
      enabled: !!profile,
      onSuccess: scrollToTop,
    },
  )

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'id',
        title: i18n._(t`Order ID`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => `#${val}`,
      },
      {
        dataIndex: 'amount',
        title: i18n._(t`Amount`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => `${formatPrice(val)} THB`,
      },
      {
        dataIndex: 'detail',
        title: i18n._(t`Details`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'registrationDate',
        title: i18n._(t`Registration date`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => formatDate(new Date(val), 'dd/MM/yyyy'),
      },
      {
        dataIndex: 'status',
        title: i18n._(t`Status`),
        align: 'center',
        className: clsx(`min-w-[80px]`),
        render: (val: DepositStatus) => {
          switch (val) {
            case DepositStatus.CANCELLED:
              return (
                <Tag variant="danger" className={clsx(`w-[120px]`)}>
                  Cancelled
                </Tag>
              )

            case DepositStatus.PENDING:
              return (
                <Tag variant="warning" className={clsx(`w-[120px]`)}>
                  Pending
                </Tag>
              )

            case DepositStatus.SUCCESS:
              return (
                <Tag variant="success" className={clsx(`w-[120px]`)}>
                  Success
                </Tag>
              )
          }
        },
      },
      {
        dataIndex: 'actions',
        align: 'center',
        render: (_val, record) => {
          if (record.status === DepositStatus.PENDING)
            return (
              <Button
                as="a"
                href={record.link}
                isExternal
                variant="primary"
                size="small"
                className={clsx(`min-w-[120px]`)}
              >
                <span>{i18n._(t`ชำระเงินอีกครั้ง`)}</span>
              </Button>
            )
        },
      },
    ] as TableColumn<ISimpleDeposit>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-sidebar-add-funds" className={clsx(`text-primary-500 square-8`)} />
        <h3 className={clsx(`text-header-3`)}>{i18n._(t`เติมเครดิต`)}</h3>
      </div>

      <Card
        className={clsx(
          `mt-6 flex max-w-[40%] items-center justify-between`,
          `sm:max-w-none`,
          `md:max-w-md`,
          `xl:max-w-[50%]`,
        )}
      >
        <div>
          <p className={clsx(`text-body-20`)}>{i18n._(t`ยอดเงินคงเหลือในเครดิต`)}</p>
          <div className={clsx(`text-[40px] font-medium text-primary-500`)}>{formatPrice(profile?.credit)} THB</div>
        </div>
        <SvgIcon name="backoffice-add-funds-icon" className={clsx(`square-16`)} />
      </Card>

      <div className={clsx(`mt-6 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button variant="success" buttonType="icon-text" as="a" href={`/app/add-funds/create`} size="medium">
          <SvgIcon name="backoffice-sidebar-add-funds" className={clsx(`square-6`)} />
          <span>{i18n._(t`เติมเครดิต`)}</span>
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
        showLessItems
        showTotal={showRangeAndTotalPagination}
        onChange={onPageChange}
      />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Add Funds `,
}
