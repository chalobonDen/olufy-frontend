import type { FC } from 'react'
import { Fragment } from 'react'

import { useLingui } from '@lingui/react'
import { SimpleTableCard, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import { formatNumber } from '@olufy-frontend/shared/utils'
import clsx from 'clsx'
import { t } from '@lingui/macro'

import ViewButton from '@/components/Buttons/ViewButton'

import { UserContactStatus } from '@/enums'
import type { IContact } from '@/types/modules/contact'

interface IDashboardContactSectionProps {
  data: Pick<IContact, 'id' | 'title' | 'name' | 'status'>[]
  count: number
}

const DashboardContactSection: FC<IDashboardContactSectionProps> = ({ data, count }) => {
  const { i18n } = useLingui()

  return (
    <Fragment>
      <SimpleTableCard
        header={
          <div
            className={clsx(
              `flex w-full items-center space-x-4 rounded-lg border border-white-300 p-4`,
              `dark:border-dark-300`,
            )}
          >
            <SvgIcon name="backoffice-dashboard-inbox" className={clsx(`square-20`)} />
            <div>
              <p className={clsx(`text-body-16 font-light`)}>{i18n._(t`ข้อความใหม่จากเว็บไซต์`)}</p>
              <h4 className={clsx(`mt-1 text-header-2`)}>{formatNumber({ number: count })}</h4>
              <a href="/app/contact" className={clsx(`flex items-center space-x-2 text-primary-400 underline`)}>
                <span className={clsx(`text-body-14 font-light`)}>{i18n._(t`ข้อความจากเว็บไซต์`)}</span>
                <SvgIcon name="backoffice-dashboard-arrow-forward" className={clsx(`square-4`)} />
              </a>
            </div>
          </div>
        }
        table={{
          className: clsx(`max-h-[480px]`),
          columns: [
            {
              dataIndex: 'name',
              title: 'แผนก/หัวข้อ',
              align: 'left',
              className: clsx(`min-w-[300px]`),
              render: (_val, record) => {
                return (
                  <div>
                    <div className={clsx(`text-body-20`)}>{record.name}</div>
                    <div className={clsx(`font-light text-dark-200 dark:text-white-400`)}>{record.title}</div>
                  </div>
                )
              },
            },
            {
              dataIndex: 'status',
              title: 'สถานะ',
              className: clsx(`w-[138px] min-w-[138px]`),
              align: 'center',
              render: (val) => {
                if (val === UserContactStatus.SUCCESS) return <Tag variant="success">{i18n._(t`ตรวจสอบแล้ว`)}</Tag>
                return <Tag variant="error">{i18n._(t`รอตรวจสอบ`)}</Tag>
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
          dataSource: data,
        }}
      />
    </Fragment>
  )
}

export default DashboardContactSection
