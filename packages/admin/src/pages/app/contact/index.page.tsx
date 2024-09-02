import { Fragment, useMemo } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Button, Input, SvgIcon, Tag, Pagination } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { useQuery } from '@tanstack/react-query'
import { usePagination } from '@olufy-frontend/shared/hooks/usePagination'
import { omit } from 'lodash-es'

import type { DocumentProps } from '@/renderer/types'
import ViewButton from '@/components/Buttons/ViewButton'
import { showRangeAndTotalPagination } from '@/utils'
import { ContactService } from '@/services'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { useUserStore } from '@/stores/user'
import { usePageContext } from '@/hooks/usePageContext'

import type { IContactQueryParams, ISimpleContact } from '@/types/modules/contact'
import { UserContactStatus } from '@/enums'

export const Page = () => {
  const { i18n } = useLingui()
  const { scrollToTop } = useBackofficeLayout()
  const { profile } = useUserStore()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as IContactQueryParams

  // _Pagination
  const { queryParams, onPageChange, onSearch, search, setSearch, setQueryParams } = usePagination(searchParams, [
    'status',
  ])

  //_ Query
  const { data, isLoading } = useQuery(
    ['get-contact-list', queryParams],
    ({ signal }) => {
      return ContactService.list(queryParams, {
        signal,
      })
    },
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
        title: i18n._(t`ชื่อ - นามสกุล`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'email',
        title: i18n._(t`อีเมล`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'tel',
        title: i18n._(t`เบอร์โทรศัพท์`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'title',
        title: i18n._(t`หัวเรื่อง`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'status',
        title: i18n._(t`สถานะ`),
        align: 'center',
        className: clsx(`w-[120px] min-w-[140px]`),
        filter: [
          {
            text: i18n._(t`ตรวจสอบแล้ว`),
            value: UserContactStatus.SUCCESS,
          },
          {
            text: i18n._(t`ยังไม่ได้ตรวจสอบ`),
            value: UserContactStatus.PENDING,
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
        defaultSortOrder: queryParams?.sort === 'status' ? queryParams?.order : null,
        onSort: (val) => {
          if (val)
            setQueryParams((state) => ({
              ...state,
              sort: 'status',
              order: val,
            }))
          else setQueryParams((state) => omit(state, ['sort', 'order']))
        },
        render: (val: UserContactStatus) => {
          if (val === UserContactStatus.PENDING)
            return (
              <Tag variant="danger" isSolid>
                {i18n._(t`ยังไม่ได้ตรวจสอบ`)}
              </Tag>
            )
          if (val === UserContactStatus.SUCCESS)
            return (
              <Tag variant="success" isSolid>
                {i18n._(t`ตรวจสอบแล้ว`)}
              </Tag>
            )
        },
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'right',
        className: clsx(`min-w-[80px]`),
        render: (_val, record) => <ViewButton as="a" href={`/app/contact/${record.id}`} />,
      },
    ] as TableColumn<ISimpleContact>[]
  }, [i18n, queryParams?.status, queryParams?.sort, queryParams?.order, setQueryParams])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-contact-icon" className={clsx(`square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`ข้อความจากเว็บไซต์`)}</h1>
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
  title: t`ข้อความจากเว็บไซต์`,
}
