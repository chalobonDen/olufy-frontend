import { Fragment, useMemo, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { Card, Divider, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Client/Buttons/BackButton'
import { formatDate } from '@/utils'
import ManageProductController from '@/components/Client/Sections/ManageProduct/ManageProductController'
import ManageProductAdditionalTool from '@/components/Client/Sections/ManageProduct/ManageProductAdditionalTool'
import ManageProductManageYourServer from '@/components/Client/Sections/ManageProduct/ManageProductManageYourServer'
import Button from '@/components/Button'

interface ITableData {
  id: number
  createdAt: Date
  action: string
  status: string
}

export const Page = () => {
  const { i18n } = useLingui()
  const [tab, setTab] = useState('info')

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'createdAt',
        title: i18n._(t`Date`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => <span>{formatDate(new Date(val), 'y-MM-dd HH:mm')}</span>,
      },
      {
        dataIndex: 'action',
        title: i18n._(t`Action`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'status',
        title: i18n._(t`Status`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
    ] as TableColumn<ITableData>[]
  }, [i18n])

  return (
    <Fragment>
      <BackButton as="a" href={`/app/co-location`} />
      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`Manage Product`)}</h3>

      <Card className={clsx(`mt-6 p-0`)}>
        <div className={clsx(`flex space-x-6 p-6`, `sm:space-x-3`)}>
          <SvgIcon name="backoffice-dedicated-dedicated-server" className={clsx(`square-28`, `sm:square-20`)} />
          <div>
            <h4 className={clsx(`text-header-3`, `sm:text-header-4`)}>{i18n._(t`Rack 1U Server`)}</h4>
            <p className={clsx(`text-body-16 font-light`)}>{i18n._(t`(Co-location - Rack 1U Server Port 1 Gbps)`)}</p>
            <Tag variant="success" className={clsx(`mt-4 inline-flex px-8`)}>
              {i18n._(t`Active`)}
            </Tag>
          </div>
        </div>
        <Divider />
        <div className={clsx(`grid grid-cols-6`, `lg:grid-cols-3`, `sm:grid-cols-2`)}>
          <div className={clsx(`flex items-center`)}>
            <div className={clsx(`flex-1 px-6 py-4`)}>
              <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`วันที่เริ่มใช้งาน`)}</div>
              <div className={clsx(`mt-2`)}>11/03/2023</div>
            </div>
            <Divider type="vertical" className={clsx('h-[53px]')} />
          </div>
          <div className={clsx(`flex items-center`)}>
            <div className={clsx(`flex-1 px-6 py-4`)}>
              <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`งวดถัดไป`)}</div>
              <div className={clsx(`mt-2`)}>11/03/2025</div>
            </div>
            <Divider type="vertical" className={clsx('h-[53px]', `sm:hidden`)} />
          </div>
          <div className={clsx(`flex items-center`)}>
            <div className={clsx(`flex-1 px-6 py-4`)}>
              <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`รอบการเรียกเก็บเงิน`)}</div>
              <div className={clsx(`mt-2`)}>Annually</div>
            </div>
            <Divider type="vertical" className={clsx('h-[53px]')} />
          </div>
          <div className={clsx(`flex items-center`)}>
            <div className={clsx(`flex-1 px-6 py-4`)}>
              <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`ชำระครั้งแรก`)}</div>
              <div className={clsx(`mt-2`)}>3,500 THB/{i18n._(t`Monthly`)}</div>
            </div>
            <Divider type="vertical" className={clsx('h-[53px]', `sm:hidden`)} />
          </div>
          <div className={clsx(`flex items-center`)}>
            <div className={clsx(`flex-1 px-6 py-4`)}>
              <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`ชำระครั้งถัดไป`)}</div>
              <div className={clsx(`mt-2`)}>3,500 THB/{i18n._(t`Monthly`)}</div>
            </div>
            <Divider type="vertical" className={clsx('h-[53px]')} />
          </div>
          <div className={clsx(`flex-1 px-6 py-4`)}>
            <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`รูปแบบการชำระเงิน`)}</div>
            <div className={clsx(`mt-2`)}>Tue Money Wallet</div>
          </div>
        </div>
        <Divider />
        <div className={clsx(`grid grid-cols-4 gap-4 p-6`, `lg:grid-cols-2`, `sm:grid-cols-1`)}>
          <Button variant="success" buttonType="icon-text" size="medium">
            <SvgIcon name="backoffice-dedicated-cluster-management" className={clsx(`square-6`)} />
            <span>{i18n._(t`Management`)}</span>
          </Button>
          <Button variant="success" buttonType="icon-text" size="medium">
            <SvgIcon name="backoffice-dedicated-package-upgrade" className={clsx(`square-6`)} />
            <span>{i18n._(t`Upgrade/Dowgrade`)}</span>
          </Button>
          <Button variant="success" buttonType="icon-text" size="medium">
            <SvgIcon name="backoffice-dedicated-menu" />
            <span>{i18n._(t`Upgrade/Dowgrade Options`)}</span>
          </Button>
          <Button variant="success" buttonType="icon-text" size="medium">
            <SvgIcon name="backoffice-dedicated-delete-shield" className={clsx(`square-6`)} />
            <span>{i18n._(t`Request Cancellation`)}</span>
          </Button>
        </div>
      </Card>

      <Card className={clsx(`mt-6 p-0`)}>
        <div className={clsx(`flex items-center space-x-10 p-6`)}>
          <div
            className={clsx(`cur flex cursor-pointer items-center space-x-3`, `hover:text-primary-500`, {
              'text-primary-500': tab === 'info',
              'text-white-800': tab !== 'info',
            })}
            onClick={() => setTab('info')}
          >
            <SvgIcon name="backoffice-dedicated-server" className={clsx(`square-8`, `sm:square-12`)} />
            <span className={clsx(`text-body-20`, `sm:text-body-14`)}>{i18n._(t`Server Information`)}</span>
          </div>
          <div
            className={clsx(`cur flex cursor-pointer items-center space-x-3`, `hover:text-primary-500`, {
              'text-primary-500': tab === 'config',
              'text-white-800': tab !== 'config',
            })}
            onClick={() => setTab('config')}
          >
            <SvgIcon name="backoffice-dedicated-pause-setting" className={clsx(`square-8`, `sm:square-12`)} />
            <span className={clsx(`text-body-20`, `sm:text-body-14`)}>{i18n._(t`Configurable Options`)}</span>
          </div>
        </div>
        <Divider />

        {tab === 'info' && (
          <Fragment>
            <div className={clsx(`grid grid-cols-6`, `lg:grid-cols-3`, `sm:grid-cols-2`)}>
              <div className={clsx(`flex items-center`)}>
                <div className={clsx(`flex-1 px-6 py-4`)}>
                  <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`Hostname`)}</div>
                  <div className={clsx(`mt-2`)}>Domainname.com</div>
                </div>
                <Divider type="vertical" className={clsx('h-[53px]')} />
              </div>
              <div className={clsx(`flex items-center`)}>
                <div className={clsx(`flex-1 px-6 py-4`)}>
                  <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`Primary IP`)}</div>
                  <div className={clsx(`mt-2`)}>199.323.133.33</div>
                </div>
                <Divider type="vertical" className={clsx('h-[53px]', `sm:hidden`)} />
              </div>
              <div className={clsx(`px-6 py-4`)}>
                <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`Name Servers`)}</div>
                <div className={clsx(`mt-2`)}>NS1,NS2</div>
              </div>
            </div>
            <Divider />
            {/* Manage Your Server */}
            <ManageProductManageYourServer />
            <Divider />
            {/* Manage */}
            <ManageProductController />
            <Divider />
            {/* Additional Tools */}
            <ManageProductAdditionalTool />
            <Divider />
            <div className={clsx(`p-6`)}>
              <h3 className={clsx(`text-header-3`)}>{i18n._(t`Activity Logs`)}</h3>
              <Table
                rowKey={(_, index) => index}
                className={clsx(`mt-6`)}
                columns={columns}
                dataSource={[
                  {
                    id: 1,
                    createdAt: new Date(),
                    action: 'HotMigerate',
                    status: 'Complete',
                  },
                  {
                    id: 2,
                    createdAt: new Date(),
                    action: 'HotMigerate',
                    status: 'Complete',
                  },
                ]}
              />
            </div>
          </Fragment>
        )}
        {tab === 'config' && (
          <div className={clsx(`grid grid-cols-6`, `lg:grid-cols-3`, `sm:grid-cols-2`)}>
            <div className={clsx(`flex items-center`)}>
              <div className={clsx(`flex-1 px-6 py-4`)}>
                <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`Operating System`)}</div>
                <div className={clsx(`mt-2`)}>Ubuntu 18.04 x64</div>
              </div>
              <Divider type="vertical" className={clsx('h-[53px]')} />
            </div>
            <div className={clsx(`flex items-center`)}>
              <div className={clsx(`flex-1 px-6 py-4`)}>
                <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`LiteSpeed Web Server`)}</div>
                <div className={clsx(`mt-2`)}>No</div>
              </div>
              <Divider type="vertical" className={clsx('h-[53px]', `sm:hidden`)} />
            </div>
            <div className={clsx(`px-6 py-4`)}>
              <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`CPanel License`)}</div>
              <div className={clsx(`mt-2`)}>None</div>
            </div>
          </div>
        )}
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Co-Location`,
}
