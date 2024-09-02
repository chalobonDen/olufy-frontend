import { Fragment, useMemo } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Button, Input, SvgIcon, Tag, Pagination } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { useQuery } from '@tanstack/react-query'
import { usePagination } from '@olufy-frontend/shared/hooks/usePagination'

import type { DocumentProps } from '@/renderer/types'
import { showRangeAndTotalPagination } from '@/utils'
import AdminTableAction from '@/components/Actions/AdminTableAction'
import { UserService } from '@/services'
import { useUserStore } from '@/stores/user'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { usePageContext } from '@/hooks/usePageContext'

import type { ISimpleUser, IUserQueryParams } from '@/types/modules/user'
import { UserFlag } from '@/enums'

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { scrollToTop } = useBackofficeLayout()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as IUserQueryParams

  // _Pagination
  const { queryParams, search, onSearch, setSearch, onPageChange } = usePagination(searchParams)

  // _Query
  const { data, isLoading, refetch } = useQuery(
    ['get-admin-list', queryParams],
    ({ signal }) => UserService.list(queryParams, { signal }),
    {
      enabled: !!profile,
      onSuccess: scrollToTop,
    },
  )

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'nameEn',
        title: i18n._(t`ชื่อแอดมิน`),
        align: 'left',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'email',
        title: i18n._(t`อีเมล`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'role',
        title: i18n._(t`ตำแหน่ง`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'flag',
        title: i18n._(t`สถานะ`),
        align: 'center',
        className: clsx(`w-[120px] min-w-[140px]`),
        render: (val: UserFlag) => {
          switch (val) {
            case UserFlag.SUSPENDED:
              return (
                <Tag variant="danger" isSolid>
                  {i18n._(t`ถูกระงับ`)}
                </Tag>
              )

            default:
              return (
                <Tag variant="success" isSolid>
                  {i18n._(t`ปกติ`)}
                </Tag>
              )
          }
        },
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'right',
        className: clsx(`min-w-[80px]`),
        render: (_val, record) => <AdminTableAction data={record} onRefetch={refetch} />,
      },
    ] as TableColumn<ISimpleUser>[]
  }, [i18n, refetch])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-admin-icon" className={clsx(`square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`จัดการแอดมิน`)}</h1>
      </div>

      <div className={clsx(`mt-8 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button as="a" href="/app/admin/create" variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="plus-circle" />
          <span>{i18n._(t`เพิ่มแอดมิน`)}</span>
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
  title: t`จัดการแอดมิน`,
}
