import { Fragment, useMemo } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Button, Input, Pagination, SvgIcon } from '@olufy-frontend/shared/UI'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { useQuery } from '@tanstack/react-query'
import { formatNoRound, formatPrice } from '@olufy-frontend/shared/utils'
import { usePagination } from '@olufy-frontend/shared/hooks/usePagination'

import type { DocumentProps } from '@/renderer/types'
import { useUserStore } from '@/stores/user'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { showRangeAndTotalPagination } from '@/utils'
import MembershipTableAction from '@/components/Actions/MembershipTableAction'
import MembershipService from '@/services/modules/membership'
import { usePageContext } from '@/hooks/usePageContext'

import type { IMembershipQueryParams, ISimpleMembership } from '@/types/modules/membership'

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { scrollToTop } = useBackofficeLayout()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as IMembershipQueryParams

  // _Pagination
  const { queryParams, onPageChange, onSearch, search, setSearch } = usePagination(searchParams)

  // _Query
  const { data, isLoading, refetch } = useQuery(
    ['get-membership-list', queryParams],
    ({ signal }) => MembershipService.list(queryParams, { signal }),
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
        title: 'ชื่อระดับสมาชิก',
        align: 'center',
        className: clsx(`min-w-[200px]`),
      },
      {
        dataIndex: 'minPrice',
        title: 'ยอดซื้อขั้นต่ำ',
        align: 'center',
        className: clsx(`min-w-[200px]`),
        render: (val) => `${formatPrice(val)} THB`,
      },
      {
        dataIndex: 'minOrder',
        title: 'สั่งซื้อขั้นต่ำ (ครั้ง)',
        align: 'center',
        className: clsx(`min-w-[200px]`),
        render: (val) => formatNoRound(val),
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'right',
        className: clsx(`min-w-[80px]`),
        render: (_val, record) => <MembershipTableAction data={record} onRefetch={refetch} />,
      },
    ] as TableColumn<ISimpleMembership>[]
  }, [refetch])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-membership-icon" className={clsx(`square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`จัดการระดับสมาชิก`)}</h1>
      </div>

      <div className={clsx(`mt-8 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button as="a" href="/app/membership/create" variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="plus-circle" />
          <span>{i18n._(t`เพิ่มระดับสมาชิก`)}</span>
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
  title: t`จัดการระดับสมาชิก`,
}
