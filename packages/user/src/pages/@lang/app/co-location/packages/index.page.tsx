import { Fragment, useMemo } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { Card, SvgIcon } from '@olufy-frontend/shared/UI'
import { range, sample } from 'lodash-es'
import { useQuery } from '@tanstack/react-query'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import { formatNumber } from '@olufy-frontend/shared/utils'
import Table from '@olufy-frontend/shared/UI/Table'

import Button from '@/components/Button'
import { useSetting } from '@/hooks/stores/useSetting'
import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Client/Buttons/BackButton'

interface ITableData {
  id: number
  sizeRack: string
  dataCenter: {
    title: string
    detail: string
  }
  network: {
    portSpeed: number
    speed: number
  }
  bandwidth: {
    title: string
    detail: string
  }
  ipAmount: number
  firewall: boolean
  price: number
}

const mock: ITableData[] = range(1, 9).map((n) => ({
  id: n,
  sizeRack: '1U Rack',
  dataCenter: {
    title: 'CSLoxinfo @ The Cloud',
    detail: 'หากไฟเกิน 0.5 A +500 THB',
  },
  network: {
    portSpeed: 1,
    speed: 200,
  },
  bandwidth: {
    title: 'Unlimited transfer',
    detail: 'Inter 10/10 Mbps',
  },
  ipAmount: 1,
  firewall: true,
  price: 2000,
  rent: sample([true, false]),
}))

export const Page = () => {
  const { i18n } = useLingui()
  const { lang } = useSetting()

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'sizeRack',
        title: i18n._(t`Size Rack`),
        align: 'center',
        className: clsx(`min-w-[200px]`, `md:min-w-[260px]`),
        render: (val) => <div className={clsx(`text-primary-500`)}>{val}</div>,
      },
      {
        dataIndex: 'dataCenter',
        title: i18n._(t`DATA CENTER`),
        align: 'left',
        className: clsx(`min-w-[180px]`),
        render: (val) => (
          <div className={clsx(`flex flex-col`)}>
            <span className={clsx(`text-body-16`)}>{val.title}</span>
            <span className={clsx(`text-body-14 font-light`)}>{val.detail}</span>
          </div>
        ),
      },
      {
        dataIndex: 'network',
        title: i18n._(t`NETWORK`),
        align: 'left',
        className: clsx(`min-w-[180px]`),
        render: (val) => (
          <div className={clsx(`flex flex-col`)}>
            <span className={clsx(`text-body-16`)}>{i18n._(t`Port ${val.portSpeed} Gbps`)}</span>
            <span className={clsx(`text-body-14 font-light`)}>{i18n._(t`Guarantee`)}</span>
            <span className={clsx(`text-body-14 font-light`)}>{val.speed} Mbps</span>
          </div>
        ),
      },
      {
        dataIndex: 'bandwidth',
        title: i18n._(t`DATA TRANSFER`),
        align: 'left',
        className: clsx(`min-w-[180px]`),
        render: (val) => (
          <div className={clsx(`flex flex-col`)}>
            <span className={clsx(`text-body-16`)}>{val.title}</span>
            <span className={clsx(`text-body-14 font-light`)}>{val.detail}</span>
            <span className={clsx(`text-body-14 font-light`)}>{i18n._(t`per IP`)}</span>
          </div>
        ),
      },
      {
        dataIndex: 'ipAmount',
        title: i18n._(t`IP ADDRESS`),
        align: 'left',
        className: clsx(`min-w-[180px]`),
        render: (val) => (
          <div className={clsx(`flex flex-col`)}>
            <span className={clsx(`text-body-16`)}>{val} IP</span>
            <span className={clsx(`text-body-14 font-light`)}>{i18n._(t`(Public)`)}</span>
          </div>
        ),
      },
      {
        dataIndex: 'firewall',
        title: i18n._(t`FIREWALL`),
        align: 'left',
        className: clsx(`min-w-[180px]`),
        render: (val) => (
          <div className={clsx(`flex flex-col`)}>
            <span className={clsx(`text-body-16`)}>{i18n._(t`FREE : Firewall`)}</span>
            <span className={clsx(`text-body-14 font-light`)}>{i18n._(t`ป้องกันยิง ทุกรูปแบบ`)}</span>
            <span className={clsx(`text-body-14 font-light`)}>{i18n._(t`โดนยิงแล้วดับคืนเงิน`)}</span>
          </div>
        ),
      },
      {
        dataIndex: 'price',
        title: i18n._(t`PRICE/M`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => (
          <div className={clsx(`flex flex-col`)}>
            <span className={clsx(`text-body-16`)}>{formatNumber({ number: val })}</span>
            <span className={clsx(`text-body-14 font-light`)}>THB</span>
          </div>
        ),
      },
      {
        dataIndex: 'rent',
        title: 'ORDER',
        align: 'center',
        className: clsx(`min-w-[140px]`),
        render: (val, record) => (
          <Button
            variant="success"
            buttonType="icon-text"
            as="a"
            href={`/app/co-location/packages/${record.id}`}
            size="medium"
            className={clsx(`w-[180px]`)}
          >
            <SvgIcon name="cart" className={clsx(`square-6`)} />
            <span>{i18n._(t`Contact`)}</span>
          </Button>
        ),
      },
    ] as TableColumn<ITableData>[]
  }, [i18n])

  return (
    <Fragment>
      <BackButton as="a" href="/app/co-location" />

      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`CO-LOCATION`)}</h3>
      <Card className={clsx(`mt-6 p-10`, `sm:mt-4 sm:p-6`)}>
        <div>
          <h1 className={clsx(`text-header-2`, `sm:text-header-3`)}>{i18n._(t`ORDER CO-LOCATION`)}</h1>
          <p className={clsx(`font-light`)}>
            {i18n._(t`Rent a server`)} {i18n._(t`(automatic system)`)}
          </p>
        </div>
        <div className={clsx(`mt-6`)}>
          <h3 className={clsx(`text-header-3`, `sm:text-header-4`)}>{i18n._(t`INSTANT FAST DEPLOY`)}</h3>
          <p className={clsx(`font-light`)}>
            {i18n._(t`The system is installed with automatic system, receive the machine within 5 minutes immediately`)}
          </p>
          <p className={clsx(`font-light`)}>
            {i18n._(
              t`(When the order is successful, the system will take time to install and send the usage information to you immediately)`,
            )}
          </p>
        </div>
        <div className={clsx(`mt-6`)}>
          <h3 className={clsx(`text-header-3`, `sm:text-header-4`)}>{i18n._(t`CONTROL YOUR SELF`)}</h3>
          <p className={clsx(`font-light`)}>
            {i18n._(
              t`You can control everything by yourself, order on-off, order to install a new OS by yourself at any time.`,
            )}
          </p>
          <p className={clsx(`font-light`)}>
            {i18n._(t`(Control your own private server via website including installing a new OS by yourself)`)}
          </p>
        </div>
        <div className={clsx(`mt-6`)}>
          <h3 className={clsx(`text-header-3`, `sm:text-header-4`)}>{i18n._(t`FIREWALL PROTECTION`)}</h3>
          <p className={clsx(`font-light`)}>{i18n._(t`More powerful Firewall protection`)}</p>
          <p className={clsx(`font-light`)}>
            {i18n._(t`(Can choose special protection for Game Firewall such as FiveM, TS3, SAMP, Minecraft)`)}
          </p>
        </div>
      </Card>

      <Table rowKey={(_, index) => index} className={clsx(`mt-4`)} columns={columns} dataSource={mock} />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Co-Location`,
}
