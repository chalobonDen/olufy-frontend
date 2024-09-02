import type { FC } from 'react'
import { useMemo, Fragment } from 'react'

import clsx from 'clsx'
import { Card, Input, Pagination, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { useQuery } from '@tanstack/react-query'
import { range, sample } from 'lodash-es'

import type { DocumentProps } from '@/renderer/types'
import Button from '@/components/Button'
import { showRangeAndTotalPagination } from '@/utils'

type FirewallStatus = 'none' | 'work' | 'done'

type Status = 'active' | 'inactive'

interface ITableData {
  id?: number
  type: string
  ip: string
  status: Status
  firewallStatus: FirewallStatus
}

const getInfo = () =>
  [
    {
      status: 'none',
      description: t`ความหมายคือยังไม่เคยถูกโจมตี`,
    },
    {
      status: 'work',
      description: t`ความหมายคือ Firewall กำลังป้องกันการโจมตีในขณะนี้`,
    },
    {
      status: 'done',
      description: t`ความหมายคือการโจมตีสิ้นสุดลงแล้ว`,
    },
  ] as { status: FirewallStatus; description: string }[]

const MOCK_DATA: ITableData[] = range(1, 11).map((n) => ({
  id: n,
  name: 'FIREWALL',
  type: 'HOST',
  ip: '199.323.133.33',
  status: sample(['active', 'inactive']),
  firewallStatus: sample(['none', 'work', 'done']),
}))

const FirewallStatusTag: FC<{ status: FirewallStatus }> = ({ status }) => {
  return useMemo(() => {
    switch (status) {
      case 'done':
        return (
          <Tag variant="warning" className={clsx(`inline-flex w-[100px] px-2 font-medium uppercase`)}>
            Finished
          </Tag>
        )

      case 'work':
        return (
          <Tag variant="danger" className={clsx(`inline-flex w-[100px] px-2 font-medium uppercase`)}>
            Working
          </Tag>
        )

      case 'none':
        return (
          <Tag variant="info" className={clsx(`inline-flex w-[100px] px-2 font-medium uppercase`)}>
            No attack
          </Tag>
        )
    }
  }, [status])
}

export const Page = () => {
  const { i18n } = useLingui()

  // _Query
  const { data, isLoading } = useQuery(['get-payment-list'], () => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_DATA), 500)) as Promise<ITableData[]>
  })

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'id',
        title: '#',
        align: 'left',
        className: clsx(`min-w-[80px]`),
      },
      {
        dataIndex: 'type',
        title: i18n._(t`Type`),
        align: 'center',
        className: clsx(`min-w-[120px]`),
      },
      {
        dataIndex: 'ip',
        title: i18n._(t`IP`),
        align: 'center',
        className: clsx(`min-w-[120px]`),
      },
      {
        dataIndex: 'status',
        title: i18n._(t`Status IP`),
        align: 'center',
        className: clsx(`min-w-[120px]`),
        render: (val: Status) => {
          switch (val) {
            case 'active':
              return (
                <Tag variant="success" className={clsx(`inline-flex w-[100px] px-2 font-medium uppercase`)}>
                  Active
                </Tag>
              )

            default:
              return (
                <Tag variant="danger" className={clsx(`inline-flex w-[100px] px-2 font-medium uppercase`)}>
                  Inactive
                </Tag>
              )
          }
        },
      },
      {
        dataIndex: 'firewallStatus',
        title: i18n._(t`Status Firewall`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val: FirewallStatus) => <FirewallStatusTag status={val} />,
      },
      {
        dataIndex: 'name',
        title: i18n._(t`Firewall`),
        align: 'center',
        className: clsx(`min-w-[120px]`),
      },
    ] as TableColumn<ITableData>[]
  }, [i18n])

  return (
    <Fragment>
      <div className={clsx(`flex items-center space-x-4`)}>
        <SvgIcon name="backoffice-ips-firewall-icon" className={clsx(`square-8`)} />
        <h3 className={clsx(`text-header-3`)}>{i18n._(t`IPS-Firewall`)}</h3>
      </div>

      <div className={clsx(`mt-6 grid grid-cols-3 gap-6`, `lg:grid-cols-2 lg:gap-4`, `sm:grid-cols-1`)}>
        {getInfo().map((item, itemIdx) => (
          <Card key={`info-${itemIdx}`} className={clsx(`flex flex-col items-center space-y-3 text-center`)}>
            <FirewallStatusTag status={item.status} />
            <div>{item.description}</div>
          </Card>
        ))}
      </div>

      <div className={clsx(`mt-8 flex items-center`, `sm:flex-col sm:items-start sm:space-y-6`)}>
        <form
          className={clsx(`ml-auto flex items-center space-x-2`, `sm:ml-0 sm:w-full`)}
          onSubmit={(e) => {
            e.preventDefault()
            //
          }}
        >
          <Input
            name="search"
            prefix={<SvgIcon name="search" className={clsx(`square-6`)} />}
            placeholder={i18n._(t`ค้นหา`)}
            className={clsx(`w-[300px]`, `sm:flex-1`)}
            onChange={() => {
              //
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
        loading={isLoading}
        columns={columns}
        dataSource={data ? data : []}
        emptyMsg={i18n._(t`ไม่มีรายการ`)}
      />

      <Pagination
        className={clsx(`mt-6 w-full`)}
        current={1}
        total={100}
        pageSize={10}
        showTotal={showRangeAndTotalPagination}
        showLessItems
        onChange={() => {
          //
        }}
      />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`IPS-Firewall`,
}
