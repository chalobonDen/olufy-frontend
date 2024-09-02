import { Fragment, useMemo, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { Card, Divider, SvgIcon, Tag } from '@olufy-frontend/shared/UI'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Client/Buttons/BackButton'
import Button from '@/components/Button'
import ManageProductManageYourServer from '@/components/Client/Sections/ManageProduct/ManageProductManageYourServer'
import ManageProductController from '@/components/Client/Sections/ManageProduct/ManageProductController'
import ManageProductAdditionalTool from '@/components/Client/Sections/ManageProduct/ManageProductAdditionalTool'

export const Page = () => {
  const { i18n } = useLingui()
  const [tab, setTab] = useState('info')

  const renderHeader = useMemo(() => {
    return (
      <div className={clsx(`flex space-x-6 p-6`, `sm:space-x-3`)}>
        <SvgIcon name="backoffice-dedicated-dedicated-server" className={clsx(`square-28`, `sm:square-20`)} />
        <div>
          <h4 className={clsx(`text-header-3`, `sm:text-header-4`)}>{i18n._(t`Demo.com`)}</h4>
          <p className={clsx(`text-body-16 font-light`)}>{i18n._(t`(Domain)`)}</p>
          <Tag variant="success" className={clsx(`mt-4 inline-flex px-8`)}>
            {i18n._(t`Active`)}
          </Tag>
        </div>
      </div>
    )
  }, [i18n])

  return (
    <Fragment>
      <BackButton as="a" href={`/app/hosting`} />
      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`Manage Product`)}</h3>

      <Card className={clsx(`mt-6 p-0`)}>
        <div className={clsx(`flex space-x-6 p-6`, `sm:space-x-3`)}>
          <SvgIcon name="backoffice-dedicated-dedicated-server" className={clsx(`square-28`, `sm:square-20`)} />
          <div>
            <h4 className={clsx(`text-header-3`, `sm:text-header-4`)}>{i18n._(t`Demo.com`)}</h4>
            <p className={clsx(`text-body-16 font-light`)}>{i18n._(t`(Domain)`)}</p>
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
            <span className={clsx(`text-body-20`, `sm:text-body-14`)}>{i18n._(t`Hosting Information`)}</span>
          </div>
          <div
            className={clsx(`cur flex cursor-pointer items-center space-x-3`, `hover:text-primary-500`, {
              'text-primary-500': tab === 'config',
              'text-white-800': tab !== 'config',
            })}
            onClick={() => setTab('config')}
          >
            <SvgIcon name="backoffice-dedicated-pause-setting" className={clsx(`square-8`, `sm:square-12`)} />
            <span className={clsx(`text-body-20`, `sm:text-body-14`)}>{i18n._(t`Additional race information`)}</span>
          </div>
        </div>
        <Divider />

        {tab === 'info' && (
          <div className={clsx(`p-6`)}>
            <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
              <div className={clsx(`text-center`)}>{i18n._(t`โดเมน`)}</div>
              <div className={clsx(`text-center`)}>Demo.com</div>
            </div>
            <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
              <div className={clsx(`text-center`)}>{i18n._(t`Username`)}</div>
              <div className={clsx(`text-center`)}>Demo</div>
            </div>
            <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
              <div className={clsx(`text-center`)}>{i18n._(t`Server Name`)}</div>
              <div className={clsx(`text-center`)}>ssd-sv53.Demo.com</div>
            </div>
            <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
              <div className={clsx(`text-center`)}>{i18n._(t`IP Address`)}</div>
              <div className={clsx(`text-center`)}>202.129.206.159</div>
            </div>
            <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
              <div className={clsx(`text-center`)}>{i18n._(t`Nameservers`)}</div>
              <div className={clsx(`text-center`)}>
                <div>ns53.demo.com (202.129.206.159)</div>
                <div className={clsx(`mt-4`)}>ns53.demo.com (202.129.206.159)</div>
              </div>
            </div>

            <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
              <div className={clsx(`text-center`)}>{i18n._(t`SSL Status`)}</div>
              <div className={clsx(`text-center`)}>Wednesday, July 20th, 2022</div>
            </div>
            <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
              <div className={clsx(`text-center`)}>{i18n._(t`SSL Start Date`)}</div>
              <div className={clsx(`text-center`)}>ssd-sv53.Demo.com</div>
            </div>
            <div className={clsx(`grid grid-cols-2 rounded-lg py-2`)}>
              <div className={clsx(`text-center`)}>{i18n._(t`SSL Expiry Date`)}</div>
              <div className={clsx(`text-center`)}>Tuesday, October 18th, 2022</div>
            </div>
            <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
              <div className={clsx(`text-center`)}>{i18n._(t`ssd-sv53.Demo.com`)}</div>
              <div className={clsx(`text-center`)}>R3</div>
            </div>

            <Divider className={clsx(`mt-6`)} />
            <div className={clsx(`mt-6 grid grid-cols-4 gap-4`, `lg:grid-cols-2`, `sm:grid-cols-1`)}>
              <Button variant="success" buttonType="icon-text" size="medium">
                <span>{i18n._(t`Visit Website`)}</span>
              </Button>
              <Button variant="success" buttonType="icon-text" size="medium">
                <span>{i18n._(t`จัดการตั้งค่าโดเมน`)}</span>
              </Button>
              <Button variant="success" buttonType="icon-text" size="medium">
                <span>{i18n._(t`WHOIS Info`)}</span>
              </Button>
            </div>
          </div>
        )}
        {tab === 'config' && (
          <div className={clsx(`p-6`)}>
            <div className={clsx(`grid grid-cols-2 rounded-lg bg-white-600 py-2 dark:bg-dark-200`)}>
              <div className={clsx(`text-center`)}>{i18n._(t`ขอรับใบเสร็จรับเงิน (ต้นฉบับ)`)}</div>
              <div className={clsx(`text-center`)}>None</div>
            </div>
          </div>
        )}
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Hosting`,
}
