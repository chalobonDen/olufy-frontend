import { Fragment, useMemo } from 'react'

import clsx from 'clsx'
import { Card, Pagination, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { formatNumber } from '@olufy-frontend/shared/utils'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { range, sample } from 'lodash-es'

import BackButton from '@/components/Client/Buttons/BackButton'
import { showRangeAndTotalPagination } from '@/utils'
import type { DocumentProps } from '@/renderer/types'
import Button from '@/components/Button'
import { useSetting } from '@/hooks/stores/useSetting'

interface ITableData {
  id: number
  model: {
    cpu: string
    core: string
    cpuScore: string
  }
  ram: {
    memory: string
    speed: string
  }
  storage: {
    size: string
    read: string
    write: string
  }
  os: string
  price: number
  rent: Boolean
}

const mock: ITableData[] = range(1, 6).map((n) => ({
  id: n,
  model: {
    cpu: 'AMD Ryzen 5 3600X @ 3.80 GHz',
    core: 'Turbo 4.4 GHz] 6 Core / 12 Thread',
    cpuScore: 'CPU Score: 18310',
  },
  ram: {
    memory: 'DDR4 32 GB',
    speed: '(Speed 2666 MHz)',
  },
  storage: {
    size: 'M.2 NVMe 250 GB',
    read: 'Read 2,400 MB/s',
    write: 'Write 1,000 MB/s',
  },
  price: 3500,
  os: 'windows',
  rent: sample([true, false]),
}))

export const Page = () => {
  const { i18n } = useLingui()
  const { lang } = useSetting()

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'model',
        title: i18n._(t`CPU MODEL`),
        align: 'left',
        className: clsx(`min-w-[200px]`, `md:min-w-[260px]`),
        render: (val) => (
          <div className={clsx(`flex flex-col`)}>
            <span className={clsx(`text-body-16`)}>{val.cpu}</span>
            <span className={clsx(`text-body-14 font-light`)}>{val.core}</span>
            <span className={clsx(`text-body-14 font-light`)}>{val.cpuScore}</span>
          </div>
        ),
      },
      {
        dataIndex: 'ram',
        title: i18n._(t`RAM MEMORY`),
        align: 'left',
        className: clsx(`min-w-[180px]`),
        render: (val) => (
          <div className={clsx(`flex flex-col`)}>
            <span className={clsx(`text-body-16`)}>{val.memory}</span>
            <span className={clsx(`text-body-14 font-light`)}>{val.speed}</span>
          </div>
        ),
      },
      {
        dataIndex: 'storage',
        title: i18n._(t`Storage`),
        align: 'left',
        className: clsx(`min-w-[180px]`),
        render: (val) => (
          <div className={clsx(`flex flex-col`)}>
            <span className={clsx(`text-body-16`)}>{val.size}</span>
            <span className={clsx(`text-body-14 font-light`)}>{val.read}</span>
            <span className={clsx(`text-body-14 font-light`)}>{val.write}</span>
          </div>
        ),
      },
      {
        dataIndex: 'os',
        title: i18n._(t`OS`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => {
          if (val === 'windows') return <SvgIcon name="backoffice-dedicated-windows" className={clsx(`square-10`)} />
          return <SvgIcon name="backoffice-dedicated-linux" className={clsx(`square-10`)} />
        },
      },
      {
        dataIndex: 'price',
        title: i18n._(t`PRICE/M`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => (
          <div className={clsx(`flex flex-col`)}>
            <span className={clsx(`text-body-16`)}>{formatNumber({ number: val })}</span>
            <span className={clsx(`text-body-14 font-light`)}>THB/{i18n._(t`Monthly`)}</span>
          </div>
        ),
      },
      {
        dataIndex: 'rent',
        title: 'ORDER',
        align: 'center',
        className: clsx(`min-w-[140px]`),
        render: (val, record) => {
          if (val)
            return (
              <Button
                variant="success"
                buttonType="icon-text"
                as="a"
                href={`/app/dedicated-server/packages/${record.id}`}
                size="medium"
                className={clsx(`w-[180px]`)}
              >
                <SvgIcon name="cart" className={clsx(`square-6`)} />
                <span>{i18n._(t`Rent`)}</span>
              </Button>
            )

          return (
            <Button
              variant="error"
              buttonType="icon-text"
              isOutline
              size="medium"
              className={clsx(`w-[180px] cursor-not-allowed`)}
            >
              <SvgIcon name="close-square" className={clsx(`square-6`)} />
              <span>{i18n._(t`Not available`)}</span>
            </Button>
          )
        },
      },
    ] as TableColumn<ITableData>[]
  }, [i18n])

  return (
    <Fragment>
      <BackButton as="a" href="/app/dedicated-server" />

      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`Dedicated Server`)}</h3>
      <Card className={clsx(`mt-6 p-10`, `sm:mt-4 sm:p-6`)}>
        <div>
          <h1 className={clsx(`text-header-2`, `sm:text-header-3`)}>{i18n._(t`ORDER DEDICATED`)}</h1>
          <p className={clsx(`font-light`)}>
            {i18n._(t`Rent a server`)} ({i18n._(t`automatic system`)})
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

      <div className={clsx(`mt-4 inline-flex items-baseline space-x-2`, `sm:flex-col`)}>
        <h2 className={clsx(`text-[32px] font-medium`, `sm:text-header-3`)}>{i18n._(t`Dedicated Server`)}</h2>
        <p className={clsx(`text-body-20 font-light`)}>{i18n._(t`(Enterprise server)`)}</p>
      </div>

      <Table
        rowKey={(_, index) => index}
        className={clsx(`mt-4`)}
        bodyRowClassName={(record) => {
          if (!record.rent) return clsx(`bg-white-600 dark:bg-dark-500 shadow-none`)
        }}
        columns={columns}
        dataSource={mock}
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
  title: t`Dedicated Server`,
}
