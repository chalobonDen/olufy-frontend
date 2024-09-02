import type { FC } from 'react'
import { Fragment } from 'react'

import { SimpleTableCard, StatisticCard, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { formatNumber } from '@olufy-frontend/shared/utils'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useQuery } from '@tanstack/react-query'

import ViewButton from '@/components/Buttons/ViewButton'
import { MemberService } from '@/services'

import type { IMember } from '@/types/modules/member'

interface IMemberActivitySection {
  member: IMember
}

const MemberActivitySection: FC<IMemberActivitySection> = ({ member }) => {
  const { i18n } = useLingui()

  // _Query
  const { data } = useQuery(['get-member-activity'], ({ signal }) => MemberService.activity(member.id, { signal }))

  return (
    <Fragment>
      <div className={clsx(`grid grid-cols-4 gap-4`, `2xl:grid-cols-2`, `sm:grid-cols-1`)}>
        <StatisticCard
          label={i18n._(t`สินค้าและบริการ`)}
          count={formatNumber({ number: data?.countProduct })}
          iconName="backoffice-dashboard-products"
        />
        <StatisticCard
          label={i18n._(t`โดเมน`)}
          count={formatNumber({ number: data?.countDomain })}
          iconName="backoffice-dashboard-domain"
        />
        <StatisticCard
          label={i18n._(t`รายการรอชำระเงิน`)}
          count={formatNumber({ number: data?.countPendingPayment })}
          iconName="backoffice-dashboard-payment"
        />
        <StatisticCard
          label={i18n._(t`คำถามของคุณ`)}
          count={formatNumber({ number: data?.countTicket })}
          iconName="backoffice-dashboard-faq"
        />
      </div>

      <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `lg:grid-cols-1`)}>
        {/* ผลิตภัณฑ์และบริการของคุณใช้งานอยู่ */}
        <SimpleTableCard
          iconName="backoffice-dashboard-table-product"
          label={i18n._(t`ผลิตภัณฑ์และบริการของคุณใช้งานอยู่`)}
          table={{
            className: clsx(`max-h-[480px]`),
            columns: [
              {
                dataIndex: 'name',
                title: 'Product/Service',
                align: 'left',
                className: clsx(`min-w-[300px]`),
                render: (_val, record) => {
                  return (
                    <div>
                      <div className={clsx(`text-body-20`)}>{record.name}</div>
                      {/* <div className={clsx(`font-light text-dark-200 dark:text-white-400`)}>{record.detail}</div> */}
                    </div>
                  )
                },
              },
              {
                dataIndex: 'status',
                title: 'Status',
                className: clsx(`w-[138px] min-w-[138px]`),
                align: 'center',
                render: (val) => {
                  if (val) return <Tag variant="success">Active</Tag>
                  return <Tag variant="error">Deactive</Tag>
                },
              },
              {
                dataIndex: 'actions',
                title: '',
                className: clsx(`w-[80px]`),
                align: 'center',
                render: () => {
                  // TODO: ต้องมี type ของสินค้าแต่ละประเภท
                  return <ViewButton />
                },
              },
            ],
            dataSource: data?.products ?? [],
            emptyMsg: i18n._(t`ไม่มีรายการ`),
          }}
        />

        {/* รายการรอชำระเงิน */}
        {/* TODO: ต้องปรับ UI การแสดงผล */}
        <SimpleTableCard
          iconName="backoffice-dashboard-table-payment"
          label={i18n._(t`รายการรอชำระเงิน`)}
          table={{
            className: clsx(`max-h-[480px]`),
            columns: [
              {
                dataIndex: 'amount',
                title: 'Product/Service',
                align: 'left',
                className: clsx(`min-w-[300px]`),
                render: (val) => {
                  return (
                    <div>
                      <div className={clsx(`text-body-20`)}>{i18n._(t`รายการเติมเงิน`)}</div>
                      <div className={clsx(`font-light text-dark-200 dark:text-white-400`)}>
                        {formatNumber({ number: val, price: true, iconSymbol: '' })} THB
                      </div>
                    </div>
                  )
                },
              },
              {
                dataIndex: 'status',
                title: 'Status',
                className: clsx(`w-[138px] min-w-[138px]`),
                align: 'center',
                render: () => {
                  return <Tag variant="info">{i18n._(t`รอชำระ`)}</Tag>
                },
              },
              {
                dataIndex: 'actions',
                title: '',
                className: clsx(`w-[80px]`),
                align: 'center',
                render: () => {
                  return (
                    <a
                      href="#"
                      className={clsx([`inline-flex items-center justify-center rounded-full bg-success square-10`])}
                    >
                      <SvgIcon name="cart" className={clsx(`text-white-900 square-5`)} />
                    </a>
                  )
                },
              },
            ],
            dataSource: data?.pendingPayment ?? [],
            emptyMsg: i18n._(t`ไม่มีรายการ`),
          }}
        />

        {/* คำถามของคุณ */}
        {/* TODO: คิดว่าต้องปรับ */}
        <SimpleTableCard
          iconName="backoffice-dashboard-faq"
          label={i18n._(t`คำถามของคุณ`)}
          table={{
            className: clsx(`max-h-[480px]`),
            columns: [
              {
                dataIndex: 'title',
                title: i18n._(t`แผนก/หัวข้อ`),
                align: 'left',
                className: clsx(`min-w-[300px]`),
                render: (val, record) => {
                  return (
                    <div>
                      <div className={clsx(`text-body-20`)}>{val}</div>
                      {/* <div className={clsx(`font-light text-dark-200 dark:text-white-400`)}>{record.description}</div> */}
                    </div>
                  )
                },
              },
              {
                dataIndex: 'status',
                title: 'Status',
                className: clsx(`w-[138px] min-w-[138px]`),
                align: 'center',
                render: (val) => {
                  switch (val) {
                    case 'answered':
                      return <Tag variant="warning">{i18n._(t`ตอบแล้ว`)}</Tag>

                    case 'customer_reply':
                      return <Tag variant="error">{i18n._(t`ลูกค้าตอบกลับ`)}</Tag>

                    default:
                      return <Tag variant="success">{i18n._(t`สิ้นสุด`)}</Tag>
                  }
                },
              },
              {
                dataIndex: 'actions',
                title: '',
                className: clsx(`w-[80px]`),
                align: 'center',
                render: () => {
                  return <ViewButton />
                },
              },
            ],
            dataSource: data?.tickets ?? [],
            emptyMsg: i18n._(t`ไม่มีรายการ`),
          }}
        />

        {/* ข่าวสารจากทางเรา */}
        {/* TODO: หลังบ้านต้องแยกภาษามาด้วย */}
        <SimpleTableCard
          iconName="backoffice-dashboard-table-new"
          label={i18n._(t`ข่าวสารจากทางเรา`)}
          table={{
            className: clsx(`max-h-[480px]`),
            columns: [
              {
                dataIndex: 'title',
                title: 'Product/Service',
                align: 'left',
                className: clsx(`min-w-[300px]`),
                render: (val, record) => {
                  return (
                    <div className={clsx(`max-w-[500px]`, `3xl:max-w-[320px]`)}>
                      <div className={clsx(`truncate`)}>{val}</div>
                      <div className={clsx(`truncate text-body-14 font-light text-dark-200 dark:text-white-400`)}>
                        {/* {formatDate(record.createAt, 'EEEE, MMMM do,yyyy')} */}
                        {record?.description}
                      </div>
                    </div>
                  )
                },
              },
              {
                dataIndex: 'actions',
                title: '',
                className: clsx(`w-[80px]`),
                align: 'center',
                render: () => {
                  // TODO: ต้องมีหน้ารองรับ
                  return <ViewButton />
                },
              },
            ],
            dataSource: data?.news ?? [],
          }}
        />
      </div>
    </Fragment>
  )
}

export default MemberActivitySection
