import { Fragment, useState, useMemo } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Button, ConfirmModal, Input, Pagination, SvgIcon } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { usePagination } from '@olufy-frontend/shared/hooks/usePagination'

import type { DocumentProps } from '@/renderer/types'
import { showRangeAndTotalPagination } from '@/utils'
import EditButton from '@/components/Buttons/EditButton'
import DeleteButton from '@/components/Buttons/DeleteButton'
import { useUserStore } from '@/stores/user'
import { TemplateService } from '@/services'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { handleAxiosErrorMsg } from '@/libs/axios'
import { usePageContext } from '@/hooks/usePageContext'

import type { ITemplate, ITemplateQueryParams } from '@/types/modules/template'

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { scrollToTop } = useBackofficeLayout()
  const { urlParsed } = usePageContext()
  const searchParams = urlParsed.search as unknown as ITemplateQueryParams

  // _Pagination
  const { queryParams, onPageChange, onSearch, search, setSearch } = usePagination(searchParams)

  // _State
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // _Query
  const { data, isLoading, refetch } = useQuery(
    ['template-list', queryParams],
    ({ signal }) => TemplateService.list(queryParams, { signal }),
    {
      enabled: !!profile,
      onSuccess: scrollToTop,
    },
  )

  // _Mutation
  const { mutate: deleteTemplate, isLoading: isDeleteTemplateLoading } = useMutation(
    (id: string | number) => TemplateService.delete(id),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: () => {
        toast.success(i18n._(t`ทำรายการสำเร็จ`))
        refetch()
        setDeleteId(null)
      },
    },
  )

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'name',
        title: i18n._(t`ชื่อเทมเพลต`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'vmid',
        title: i18n._(t`Vmid`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'type',
        title: i18n._(t`ประเภทเทมเพลต`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'right',
        className: clsx(`min-w-[80px]`),
        render: (_val, record) => (
          <div className={clsx(`flex items-center space-x-2`)}>
            <EditButton as="a" href={`/app/template/${record.id}`} />
            <DeleteButton onClick={() => setDeleteId(record.id)} />
          </div>
        ),
      },
    ] as TableColumn<ITemplate>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-template-icon" className={clsx(`square-8`)} />
        <h1 className={clsx(`text-header-3`)}>{i18n._(t`จัดการเทมเพลต`)}</h1>
      </div>

      <div className={clsx(`mt-8 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button as="a" href="/app/template/create" variant="success" buttonType="icon-text" size="medium">
          <SvgIcon name="plus-circle" />
          <span>{i18n._(t`เพิ่มเทมเพลต`)}</span>
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

      <ConfirmModal
        visible={!!deleteId}
        title={i18n._(t`ยืนยันการลบ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ลบ`)}
        onConfirm={() => {
          deleteTemplate(deleteId)
        }}
        onCancel={() => {
          setDeleteId(null)
        }}
        closeModal={() => {
          setDeleteId(null)
        }}
        isLoading={isDeleteTemplateLoading}
      >
        <p>{i18n._(t`คุณต้องการลบรายการนี้ ?`)}</p>
      </ConfirmModal>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการเทมเพลต`,
}
