import { Fragment, useMemo } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Button, Input, Pagination, SvgIcon } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useQuery } from '@tanstack/react-query'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { formatNumber } from '@olufy-frontend/shared/utils'
import { identity, pickBy } from 'lodash-es'
import { usePagination } from '@olufy-frontend/shared/hooks/usePagination'

import type { DocumentProps } from '@/renderer/types'
import { useUserStore } from '@/stores/user'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { showRangeAndTotalPagination } from '@/utils'
import ViewButton from '@/components/Buttons/ViewButton'
import { MemberService } from '@/services'
import { usePageContext } from '@/hooks/usePageContext'

import type { IMemberQueryParams, ISimpleMember } from '@/types/modules/member'
import type { IMembership } from '@/types/modules/membership'

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { scrollToTop } = useBackofficeLayout()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as IMemberQueryParams

  // _Pagination
  const { queryParams, search, onSearch, setSearch, onPageChange } = usePagination(searchParams)

  // _Query
  const { data, isLoading } = useQuery(
    ['get-member-list', queryParams],
    ({ signal }) => MemberService.list(pickBy(queryParams, identity) as IMemberQueryParams, { signal }),
    {
      enabled: !!profile,
      onSuccess: scrollToTop,
    },
  )

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'nameTh',
        title: i18n._(t`ชื่อ - นามสกุล`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (_, record) => {
          return (
            <div>
              <div className={clsx(`text-body-18`)}>{record.nameTh || '-'}</div>
              <div className={clsx(`font-light`)}>{record.nameEn || '-'}</div>
            </div>
          )
        },
      },
      {
        dataIndex: 'email',
        title: i18n._(t`อีเมล/เบอร์โทรศัพท์`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (_, record) => {
          return (
            <div>
              <div className={clsx(`text-body-18`)}>{record.email}</div>
              <div className={clsx(`font-light`)}>{record.tel}</div>
            </div>
          )
        },
      },
      {
        dataIndex: 'totalProductAmount',
        title: i18n._(t`Product`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => {
          return (
            <div>
              <div className={clsx(`text-body-20 font-semibold text-primary-500`)}>{formatNumber({ number: val })}</div>
              <div className={clsx(`font-light`)}>{i18n._(t`รายการ`)}</div>
            </div>
          )
        },
      },
      {
        dataIndex: 'totalDomainAmount',
        title: i18n._(t`Domain`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => {
          return (
            <div>
              <div className={clsx(`text-body-20 font-semibold text-primary-500`)}>{formatNumber({ number: val })}</div>
              <div className={clsx(`font-light`)}>{i18n._(t`รายการ`)}</div>
            </div>
          )
        },
      },
      {
        dataIndex: 'membership',
        title: i18n._(t`ระดับสมาชิก`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val: IMembership) => <div className={clsx(`text-body-18`)}>{val?.name}</div>,
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'right',
        className: clsx(`min-w-[80px]`),
        render: (_val, record) => <ViewButton as="a" href={`/app/member/${record.id}`} />,
      },
    ] as TableColumn<ISimpleMember>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-user-icon" className={clsx(`square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`จัดการผู้ใช้งาน`)}</h1>
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
  title: t`จัดการผู้ใช้งาน`,
}
