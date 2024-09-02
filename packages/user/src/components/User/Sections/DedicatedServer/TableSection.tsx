import { useMemo } from 'react'

import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { formatNumber } from '@olufy-frontend/shared/utils'
import { SvgIcon } from '@olufy-frontend/shared/UI'

import UserContainer from '@/components/UI/User/Container'
import UserTitle from '@/components/UI/User/Title'
import Button from '@/components/Button'

interface ITableData {
  cpu: string
  core: string
  memory: string
  storage: string
  price: number
  rent: boolean
}

const UserDedicatedServerTableSection = () => {
  const { i18n } = useLingui()

  // _Memo
  const columns = useMemo(
    () =>
      [
        {
          title: 'CPU',
          dataIndex: 'cpu',
          align: 'center',
          className: clsx(`min-w-[190px]`),
        },
        {
          title: 'Core',
          dataIndex: 'core',
          align: 'center',
          className: clsx(`min-w-[190px]`),
        },
        {
          title: 'Memory',
          dataIndex: 'memory',
          align: 'center',
          className: clsx(`min-w-[140px]`),
        },
        {
          title: 'Storage',
          dataIndex: 'storage',
          align: 'center',
          className: clsx(`min-w-[200px]`),
        },
        {
          title: 'Price',
          dataIndex: 'price',
          align: 'center',
          className: clsx(`min-w-[120px]`),
          render: (val) => {
            return `${formatNumber({ number: val })}฿`
          },
        },
        {
          title: 'Rent',
          dataIndex: 'rent',
          align: 'center',
          className: clsx(`w-[176px] min-w-[176px]`),
          render: (val) => {
            return val ? (
              <Button variant={'success'} buttonType="icon-text" className={clsx(`!min-h-[40px] w-full !px-3`)}>
                <SvgIcon name="cart" />
                <span>{i18n._(t`เช่า`)}</span>
              </Button>
            ) : (
              <Button
                variant={'error'}
                buttonType="icon-text"
                isOutline
                className={clsx(`!min-h-[40px] w-full !px-3`)}
                disabled
              >
                <SvgIcon name="close-square" />
                <span>{i18n._(t`ไม่พร้อมให้เช่า`)}</span>
              </Button>
            )
          },
        },
      ] as TableColumn<ITableData>[],
    [i18n],
  )

  return (
    <section className={clsx(`pb-8 pt-12`)}>
      <UserContainer>
        <UserTitle className={clsx(`text-center`)}>{i18n._(t`Dedicated Game Server`)}</UserTitle>

        <Table
          rowKey={(_, index) => index}
          className={clsx(`mt-10`)}
          columns={columns}
          dataSource={[
            {
              cpu: 'AMD Ryzen 5 3600X @ 3.80 GHz',
              core: '[Turbo 4.4 GHz] 6 Core / 12 Thread',
              memory: 'DDR4 32 GB',
              price: 3500,
              storage: 'M.2 NVMe 250 GB',
              rent: true,
            },
            {
              cpu: 'AMD Ryzen 5 3600X @ 3.80 GHz',
              core: '[Turbo 4.4 GHz] 6 Core / 12 Thread',
              memory: 'DDR4 64 GB',
              price: 4000,
              storage: 'M.2 NVMe 250 GB',
              rent: false,
            },
          ]}
        />
      </UserContainer>
    </section>
  )
}

export default UserDedicatedServerTableSection
