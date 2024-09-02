import { Fragment } from 'react'

import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { SimpleTableCard, StatisticCard, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import { formatDate, formatNumber, formatPrice } from '@olufy-frontend/shared/utils'
import { range } from 'lodash-es'

import { useUserStore } from '@/stores/user'
import ViewButton from '@/components/Client/Buttons/ViewButton'
import type { DocumentProps } from '@/renderer/types'
import Link from '@/components/Link'

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()

  return (
    <Fragment>
      <div className={clsx(`bg-gradient-primary rounded-lg px-4 py-6 text-white-900`)}>
        <h1 className={clsx(`text-[40px]`, `sm:text-header-3`)}>{i18n._(t`ยินดีต้อนรับคุณ ${profile?.nameEn},`)}</h1>
        <p>{i18n._(t`คุณสามารถจัดการเซิร์ฟเวอร์ของคุณได้จากที่นี่`)}</p>
      </div>

      <div className={clsx(`mt-6 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
        <StatisticCard
          label={i18n._(t`ยอดเงินคงเหลือในเครดิต`)}
          count={`${formatPrice(profile?.credit)} THB`}
          iconName="backoffice-dashboard-wallet"
        />
        {false && (
          <StatisticCard
            label={i18n._(t`สินค้าและบริการ`)}
            count={formatNumber({ number: 16 })}
            iconName="backoffice-dashboard-products"
          />
        )}
      </div>

      {false && (
        <div className={clsx(`mt-4 grid grid-cols-3 gap-4`, `lg:grid-cols-2`, `sm:grid-cols-1`)}>
          <StatisticCard
            label={i18n._(t`โดเมน`)}
            count={formatNumber({ number: 16 })}
            iconName="backoffice-dashboard-domain"
          />
          <StatisticCard
            label={i18n._(t`รายการรอชำระเงิน`)}
            count={formatNumber({ number: 16 })}
            iconName="backoffice-dashboard-payment"
          />
          <StatisticCard
            label={i18n._(t`คำถามของคุณ`)}
            count={formatNumber({ number: 16 })}
            iconName="backoffice-dashboard-faq"
          />
        </div>
      )}

      {false && (
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
                        <div className={clsx(`font-light text-dark-200 dark:text-white-400`)}>{record.description}</div>
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
                    return <ViewButton />
                  },
                },
              ],
              dataSource: [
                ...range(4).map((e) => ({
                  name: 'Dedicated Game Server',
                  description: 'Domainname.com',
                  status: true,
                })),
                ...range(4).map((e) => ({
                  name: 'CO-LOCATION',
                  description: '10U',
                  status: false,
                })),
              ],
            }}
          />

          {/* รายการรอชำระเงิน */}
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
                      <Link
                        href="#"
                        className={clsx([`inline-flex items-center justify-center rounded-full bg-success square-10`])}
                      >
                        <SvgIcon name="cart" className={clsx(`text-white-900 square-5`)} />
                      </Link>
                    )
                  },
                },
              ],
              dataSource: [
                ...range(10).map(() => ({
                  amount: 10000,
                })),
              ],
            }}
          />

          {/* คำถามของคุณ */}
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
                        <div className={clsx(`font-light text-dark-200 dark:text-white-400`)}>{record.description}</div>
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
              dataSource: [
                {
                  title: 'ฝ่ายเทคนิค บริการหลังการขาย',
                  description: 'หัวข้อ Lorem ipsum dolor sit amet',
                  status: 'answered',
                },
                {
                  title: 'ฝ่ายเทคนิค บริการหลังการขาย',
                  description: 'หัวข้อ Lorem ipsum dolor sit amet',
                  status: 'customer_reply',
                },
                {
                  title: 'ฝ่ายเทคนิค บริการหลังการขาย',
                  description: 'หัวข้อ Lorem ipsum dolor sit amet',
                  status: 'done',
                },
              ],
            }}
          />

          {/* ข่าวสารจากทางเรา */}
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
                      <div>
                        <div className={clsx(`text-body-20`)}>{val}</div>
                        <div className={clsx(`font-light text-dark-200 dark:text-white-400`)}>
                          {formatDate(record.createAt, 'EEEE, MMMM do,yyyy')}
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
                    return <ViewButton />
                  },
                },
              ],
              dataSource: [
                ...range(4).map(() => ({
                  title: 'เงื่อนไขการใช้บริการ',
                  createAt: new Date(),
                })),
              ],
            }}
          />
        </div>
      )}
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Dashboard`,
}
