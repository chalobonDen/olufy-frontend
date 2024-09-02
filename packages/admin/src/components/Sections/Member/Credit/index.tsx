import type { FC } from 'react'
import { Fragment, useEffect, useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { formatDate, formatPrice, getErrorWithTouched } from '@olufy-frontend/shared/utils'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import { Button, Card, ConfirmModal, Input, Modal, Pagination, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import Table from '@olufy-frontend/shared/UI/Table'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-hot-toast'

import { useUserStore } from '@/stores/user'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { showRangeAndTotalPagination } from '@/utils'
import { MemberService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { IDeposit, IDepositQueryParams } from '@/types/modules/deposit'
import { DepositStatus } from '@/enums'
import type { IMember } from '@/types/modules/member'

interface IMemberCreditSectionProps {
  member: IMember
  onUpdated?: (payload?: IMember) => void
}

const MIN_AMOUNT = 100
const MAX_AMOUNT = 100000

const MemberCreditSection: FC<IMemberCreditSectionProps> = ({ member, onUpdated }) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { scrollToTop } = useBackofficeLayout()

  // _State
  const [queryParams, setQueryParams] = useState<IDepositQueryParams>({
    page: 1,
    perPage: 10,
    search: '',
  })
  const [search, setSearch] = useState<string>('')
  const [visibleAddCreditModal, setVisibleAddCreditModal] = useState<boolean>(false)
  const [confirmAmount, setConfirmAmount] = useState<number>(0)

  // _Query
  const { data, isLoading, refetch } = useQuery(
    ['get-deposit-list', queryParams, member.id],
    ({ signal }) => MemberService.creditList(member.id, queryParams, { signal }),
    {
      enabled: !!profile,
      onSuccess: scrollToTop,
    },
  )

  // _Mutation
  const { mutate: addCredit, isLoading: isAddCreditLoading } = useMutation(
    (amount: number) => MemberService.addCredit(member.id, { amount }),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: (res) => {
        setVisibleAddCreditModal(false)
        setConfirmAmount(0)
        toast.success(`เติมเครดิตสำเร็จ`)

        onUpdated?.({
          ...member,
          credit: res.credit,
        })
        refetch()
      },
    },
  )

  // _Form
  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    validationSchema: yup.object().shape({
      amount: yup
        .number()
        .min(MIN_AMOUNT, t`กรุณากรอกจำนวนขั้นต่ำ 100`)
        .max(MAX_AMOUNT, t`กรุณากรอกจำนวนสูงสุดไม่เกิน 100,000`)
        .required(t`กรุณากรอกจำนวน`),
    }),
    onSubmit: (values) => {
      setConfirmAmount(Number(values.amount))
    },
  })

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'id',
        title: `Order ID`,
        align: 'center',
        className: clsx(`min-w-[140px]`),
        render: (val) => `#${val}`,
      },
      {
        dataIndex: 'credit',
        title: `Amount`,
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => `${formatPrice(val)} THB`,
      },
      {
        dataIndex: 'detail',
        title: `Details`,
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
        dataIndex: 'status',
        title: `Status`,
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
        dataIndex: 'createdBy',
        title: `Created by`,
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
    ] as TableColumn<IDeposit>[]
  }, [])

  // _Effect
  useEffect(() => {
    if (!visibleAddCreditModal && formik.dirty) formik.resetForm()
  }, [visibleAddCreditModal, formik])

  return (
    <Fragment>
      <Card
        className={clsx(
          `flex max-w-[40%] items-center justify-between`,
          `sm:max-w-none`,
          `md:max-w-md`,
          `xl:max-w-[50%]`,
        )}
      >
        <div>
          <p className={clsx(`text-body-20`, `sm:text-body-18`)}>{i18n._(t`ยอดเงินคงเหลือในเครดิต`)}</p>
          <div className={clsx(`text-[40px] font-medium text-primary-500`, `sm:text-[36px]`)}>
            {formatPrice(member.credit)} THB
          </div>
        </div>
        <SvgIcon name="backoffice-add-funds-icon" className={clsx(`square-16`, `sm:square-14`)} />
      </Card>

      <div className={clsx(`mt-6 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <Button variant="success" buttonType="icon-text" size="medium" onClick={() => setVisibleAddCreditModal(true)}>
          <SvgIcon name="backoffice-sidebar-add-funds" className={clsx(`square-6`)} />
          <span>{i18n._(t`เติมเครดิต`)}</span>
        </Button>

        <form
          className={clsx(`ml-auto flex items-center space-x-2`, `sm:ml-0 sm:w-full`)}
          onSubmit={(e) => {
            e.preventDefault()
            setQueryParams((state) => ({
              ...state,
              search,
            }))
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
        onChange={(e) => {
          setQueryParams((state) => ({
            ...state,
            page: e,
          }))
        }}
      />

      {/* Modals */}
      <Modal visible={visibleAddCreditModal} closeModal={() => setVisibleAddCreditModal(false)} size="small">
        <form className={clsx(`flex flex-col items-center pt-4`)} onSubmit={formik.handleSubmit}>
          <SvgIcon name="backoffice-add-funds-icon" className={clsx(`square-[120px]`)} />
          <div className={clsx(`mt-4 text-header-3`)}>{i18n._(t`เติมเงินเข้าระบบเครดิต`)}</div>

          <div className={clsx(`mt-4 w-full`)}>
            <Input.Numeric
              className={clsx(`w-full`)}
              placeholder={i18n._(t`00.00 THB`)}
              name="amount"
              value={String(formik.values.amount)}
              onChange={(e) => formik.setFieldValue('amount', e)}
              error={getErrorWithTouched(formik, 'amount')}
            />

            <div className={clsx(`mt-2 text-center text-body-12 font-light`)}>
              {i18n._(t`ขั้นต่ำ 100 THB สูงสุด 100,000 THB`)}
            </div>
          </div>

          <Button type="submit" variant="primary" className={clsx(`mt-6 w-full`)}>
            <span className={clsx(`text-body-20`)}>{i18n._(t`เติมเงิน`)}</span>
          </Button>
        </form>
      </Modal>

      <ConfirmModal
        visible={confirmAmount > 0}
        onCancel={() => setConfirmAmount(0)}
        closeModal={() => setConfirmAmount(0)}
        onConfirm={() => {
          confirmAmount > 0 ? addCredit(confirmAmount) : null
        }}
        title={i18n._(t`ยืนยันการเติมเงิน`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ใช่`)}
        isLoading={isAddCreditLoading}
      >
        <div>{i18n._(t`คุณต้องการเติมเงินเข้าระบบเครดิต ใช่หรือไม่?`)}</div>
      </ConfirmModal>
    </Fragment>
  )
}

export default MemberCreditSection
