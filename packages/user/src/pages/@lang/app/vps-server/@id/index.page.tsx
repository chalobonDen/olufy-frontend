import { Fragment, useMemo, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import { Button, Card, Divider, Input, Modal, Pagination, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import Table from '@olufy-frontend/shared/UI/Table'
import { formatNumber } from '@olufy-frontend/shared/utils'
import { useQuery } from '@tanstack/react-query'

import type { DocumentProps } from '@/renderer/types'
import { formatDate, showRangeAndTotalPagination } from '@/utils'
import ManageProductAdditionalTool from '@/components/Client/Sections/ManageProduct/ManageProductAdditionalTool'
import ManageProductController from '@/components/Client/Sections/ManageProduct/ManageProductController'
import BackButton from '@/components/Client/Buttons/BackButton'
import { VpsServerService } from '@/services'

import type { IOrderLogsVpsServer, IOrderLogsVpsServerQueryParams, IOrderVpsServer } from '@/types/modules/vps-server'

interface IPageProps {
  data: IOrderVpsServer
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()
  const [tab, setTab] = useState<'info' | 'config'>('info')

  // _State
  const [logsQueryParams, setLogsQueryParams] = useState<IOrderLogsVpsServerQueryParams>({
    page: 1,
    perPage: 10,
  })
  const [visiblePasswordModal, setVisiblePasswordModal] = useState<boolean>(false)

  // _Query
  const { data: logs, isLoading: isLogsLoading } = useQuery(
    [`vps-server-activity-log`, data.id, logsQueryParams],
    ({ signal }) => VpsServerService.orderLogs(String(data.id), logsQueryParams, { signal }),
  )

  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'date',
        title: `Date`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
        render: (val) => <span>{formatDate(new Date(val), 'yyyy-MM-dd HH:mm:ss')}</span>,
      },
      {
        dataIndex: 'action',
        title: `Action`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'status',
        title: `Status`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
    ] as TableColumn<IOrderLogsVpsServer>[]
  }, [])

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />
      <h3 className={clsx(`mt-4 text-header-3`)}>Manage Product</h3>

      <Card className={clsx(`mt-6 p-0`)}>
        <div className={clsx(`flex space-x-6 p-6`, `sm:space-x-3`)}>
          <SvgIcon name="backoffice-dedicated-dedicated-server" className={clsx(`square-28`, `sm:square-20`)} />
          <div>
            <h4 className={clsx(`text-header-3`, `sm:text-header-4`)}>{data.name}</h4>
            {/* <p className={clsx(`text-body-16 font-light`)}>{i18n._(t`(SSD01)`)}</p> */}
            <Tag
              variant={data.flag === 'active' ? 'success' : 'danger'}
              className={clsx(`mt-4 inline-flex px-8 capitalize`)}
            >
              {data.flag}
            </Tag>
          </div>
        </div>
        <Divider />
        <div className={clsx(`grid grid-cols-5`, `lg:grid-cols-3`, `sm:grid-cols-2`)}>
          <div className={clsx(`flex items-center`)}>
            <div className={clsx(`flex-1 px-6 py-4`)}>
              <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`วันที่เริ่มใช้งาน`)}</div>
              <div className={clsx(`mt-2`)}>{formatDate(new Date(data.startDate), 'dd/MM/yyyy')}</div>
            </div>
            <Divider type="vertical" className={clsx('h-[53px]')} />
          </div>
          <div className={clsx(`flex items-center`)}>
            <div className={clsx(`flex-1 px-6 py-4`)}>
              <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`งวดถัดไป`)}</div>
              <div className={clsx(`mt-2`)}>{formatDate(new Date(data.endDate), 'dd/MM/yyyy')}</div>
            </div>
            <Divider type="vertical" className={clsx('h-[53px]', `sm:hidden`)} />
          </div>
          <div className={clsx(`flex items-center`)}>
            <div className={clsx(`flex-1 px-6 py-4`)}>
              <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`รอบการเรียกเก็บเงิน`)}</div>
              <div className={clsx(`mt-2 capitalize`)}>{data?.nextPay?.period || '-'}</div>
            </div>
            <Divider type="vertical" className={clsx('h-[53px]')} />
          </div>
          <div className={clsx(`flex items-center`)}>
            <div className={clsx(`flex-1 px-6 py-4`)}>
              <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`ชำระครั้งแรก`)}</div>
              <div className={clsx(`mt-2 capitalize`)}>
                {formatNumber({ number: data.firstPay.price, decimals: 2 })} THB/{data.firstPay.period}
              </div>
            </div>
            <Divider type="vertical" className={clsx('h-[53px]', `sm:hidden`)} />
          </div>
          <div className={clsx(`flex items-center`)}>
            <div className={clsx(`flex-1 px-6 py-4`)}>
              <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`ชำระครั้งถัดไป`)}</div>
              <div className={clsx(`mt-2 capitalize`)}>
                {formatNumber({ number: data.nextPay.price, decimals: 2 })} THB/{data.nextPay.period}
              </div>
            </div>
            {/* <Divider type="vertical" className={clsx('h-[53px]')} /> */}
          </div>
          {/* <div className={clsx(`flex-1 px-6 py-4`)}>
            <div className={clsx(`desc text-body-14 font-light`)}>{i18n._(t`รูปแบบการชำระเงิน`)}</div>
            <div className={clsx(`mt-2`)}>Tue Money Wallet</div>
          </div> */}
        </div>
        <Divider />
        <div className={clsx(`grid grid-cols-4 gap-4 p-6`, `lg:grid-cols-2`, `sm:grid-cols-1`)}>
          <Button variant="success" buttonType="icon-text" size="medium">
            <SvgIcon name="backoffice-dedicated-cluster-management" className={clsx(`square-6`)} />
            <span>Management</span>
          </Button>
          <Button variant="success" buttonType="icon-text" size="medium">
            <SvgIcon name="backoffice-dedicated-package-upgrade" className={clsx(`square-6`)} />
            <span>Upgrade/Dowgrade</span>
          </Button>
          <Button variant="success" buttonType="icon-text" size="medium">
            <SvgIcon name="backoffice-dedicated-menu" />
            <span>Upgrade/Dowgrade Options</span>
          </Button>
          <Button variant="success" buttonType="icon-text" size="medium">
            <SvgIcon name="backoffice-dedicated-delete-shield" className={clsx(`square-6`)} />
            <span>Request Cancellation</span>
          </Button>
        </div>
      </Card>

      <Card className={clsx(`mt-6 p-0`)}>
        <div className={clsx(`flex items-center space-x-10 p-6`)}>
          <div
            className={clsx(`flex cursor-pointer items-center space-x-3`, `hover:text-primary-500`, {
              'text-primary-500': tab === 'info',
              'text-white-800': tab !== 'info',
            })}
            onClick={() => setTab('info')}
          >
            <SvgIcon name="backoffice-dedicated-server" className={clsx(`square-8`, `sm:square-12`)} />
            <span className={clsx(`text-body-20`, `sm:text-body-14`)}>Server Information</span>
          </div>
          <div
            className={clsx(`flex cursor-pointer items-center space-x-3`, `hover:text-primary-500`, {
              'text-primary-500': tab === 'config',
              'text-white-800': tab !== 'config',
            })}
            onClick={() => setTab('config')}
          >
            <SvgIcon name="backoffice-dedicated-pause-setting" className={clsx(`square-8`, `sm:square-12`)} />
            <span className={clsx(`text-body-20`, `sm:text-body-14`)}>Configurable Options</span>
          </div>
        </div>
        <Divider />

        {tab === 'info' && (
          <Fragment>
            <div className={clsx(`grid grid-cols-5`, `lg:grid-cols-3`, `sm:grid-cols-2`)}>
              <div className={clsx(`flex items-center`)}>
                <div className={clsx(`flex-1 px-6 py-4`)}>
                  <div className={clsx(`desc text-body-14 font-light`)}>Hostname</div>
                  <div className={clsx(`mt-2`)}>{data.hostname}</div>
                </div>
                <Divider type="vertical" className={clsx('h-[53px]')} />
              </div>
              <div className={clsx(`flex items-center`)}>
                <div className={clsx(`flex-1 px-6 py-4`)}>
                  <div className={clsx(`desc text-body-14 font-light`)}>Primary IP</div>
                  <div className={clsx(`mt-2`)}>{data.server.ip[0]}</div>
                </div>
                <Divider type="vertical" className={clsx('h-[53px]', `sm:hidden`)} />
              </div>
              <div className={clsx(`px-6 py-4`)}>
                <div className={clsx(`desc text-body-14 font-light`)}>Name Servers</div>
                <div className={clsx(`mt-2`)}>
                  {[data.nameserver1, data.nameserver2, data.nameserver3, data.nameserver4]
                    .filter((e) => !!e)
                    .join(',') || '-'}
                </div>
              </div>
            </div>

            <Divider />

            {/* Manage Your Server */}
            <div className={clsx(`p-6`)}>
              <h3 className={clsx(`text-header-3`)}>Manage Your Server</h3>

              <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
                <div className={clsx(`text-center`)}>Booted</div>
                <div className={clsx(`text-center capitalize`)}>{data.server.booted}</div>
              </div>
              <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
                <div className={clsx(`text-center`)}>Built</div>
                <div className={clsx(`text-center capitalize`)}>{data.server.built}</div>
              </div>
              <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
                <div className={clsx(`text-center`)}>Recovery Mode</div>
                <div className={clsx(`text-center capitalize`)}>{data.server.recoveryMode}</div>
              </div>
              <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
                <div className={clsx(`text-center`)}>Password</div>
                <div
                  className={clsx(
                    `flex items-center justify-center space-x-2`,
                    `sm:flex-col sm:space-x-0 sm:space-y-2`,
                  )}
                >
                  <Button
                    variant="success"
                    size="small"
                    className={clsx(`min-w-[100px]`)}
                    onClick={() => setVisiblePasswordModal(true)}
                  >
                    <span>Show</span>
                  </Button>
                  <Button variant="success" size="small" className={clsx(`min-w-[100px]`)}>
                    <span>Change</span>
                  </Button>
                </div>
              </div>
              <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
                <div className={clsx(`text-center`)}>CPU(s)</div>
                <div className={clsx(`text-center`)}>{data.server.cpu} Core</div>
              </div>
              <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
                <div className={clsx(`text-center`)}>Memory Size</div>
                <div className={clsx(`text-center`)}>
                  {data.server.memory.amount} {data.server.memory.unit}
                </div>
              </div>
              <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
                <div className={clsx(`text-center`)}>Disk Size</div>
                <div className={clsx(`text-center`)}>
                  {data.server.disk.amount} {data.server.disk.unit}
                </div>
              </div>
              <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
                <div className={clsx(`text-center`)}>Monthly Bandwidth Allocation</div>
                <div className={clsx(`text-center`)}>{data.server.bandwidth}</div>
              </div>
              <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
                <div className={clsx(`text-center`)}>Monthly Banwidth Used</div>
                <div className={clsx(`text-center`)}>{data.server.bandwidthUse}</div>
              </div>
              <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
                <div className={clsx(`text-center`)}>IP Address</div>
                <div className={clsx(`text-center`)}>{data.server.ip.join(',')}</div>
              </div>
              <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
                <div className={clsx(`text-center`)}>Template</div>
                <div className={clsx(`text-center`)}>{data.server.template}</div>
              </div>
              <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
                <div className={clsx(`text-center`)}>Created At</div>
                <div className={clsx(`text-center`)}>
                  {formatDate(new Date(data.server.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                </div>
              </div>
              <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
                <div className={clsx(`text-center`)}>Last Update</div>
                <div className={clsx(`text-center`)}>
                  {formatDate(new Date(data.server.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
                </div>
              </div>
              <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
                <div className={clsx(`text-center`)}>Domain</div>
                <div className={clsx(`text-center`)}>{data.server.domain}</div>
              </div>
            </div>

            <Divider />

            {/* Manage */}
            <ManageProductController />

            <Divider />

            {/* Additional Tools */}
            <ManageProductAdditionalTool />

            <Divider />

            <div className={clsx(`p-6`)}>
              <h3 className={clsx(`text-header-3`)}>Activity Logs</h3>
              <Table
                rowKey={(_, index) => index}
                className={clsx(`mt-6`)}
                columns={columns}
                dataSource={logs?.items ?? []}
                emptyMsg={i18n._(t`ไม่มีรายการ`)}
                loading={isLogsLoading}
              />

              <Pagination
                className={clsx(`mt-4 w-full`)}
                current={logsQueryParams.page}
                total={logs?.total}
                pageSize={logsQueryParams.perPage}
                showTotal={showRangeAndTotalPagination}
                showLessItems
                onChange={(e) => {
                  setLogsQueryParams((state) => ({
                    ...state,
                    page: e,
                  }))
                }}
              />
            </div>
          </Fragment>
        )}

        {tab === 'config' && (
          <div className={clsx(`grid grid-cols-5`, `lg:grid-cols-3`, `sm:grid-cols-2`)}>
            <div className={clsx(`flex items-center`)}>
              <div className={clsx(`flex-1 px-6 py-4`)}>
                <div className={clsx(`desc text-body-14 font-light`)}>Operating System</div>
                <div className={clsx(`mt-2`)}>{data.server.template}</div>
              </div>
              <Divider type="vertical" className={clsx('h-[53px]')} />
            </div>
            <div className={clsx(`flex items-center`)}>
              <div className={clsx(`flex-1 px-6 py-4`)}>
                <div className={clsx(`desc text-body-14 font-light`)}>LiteSpeed Web Server</div>
                <div className={clsx(`mt-2`)}>No</div>
              </div>
              <Divider type="vertical" className={clsx('h-[53px]', `sm:hidden`)} />
            </div>
            <div className={clsx(`px-6 py-4`)}>
              <div className={clsx(`desc text-body-14 font-light`)}>CPanel License</div>
              <div className={clsx(`mt-2`)}>None</div>
            </div>
          </div>
        )}
      </Card>

      {/* Modals */}
      <Modal title="Password" visible={visiblePasswordModal} closeModal={() => setVisiblePasswordModal(false)}>
        <Input value={data.server.password} disabled />
      </Modal>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: `VPS Server`,
}
