import { Fragment, memo, useState } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { Card, Divider, SvgIcon, Tag } from '@olufy-frontend/shared/UI'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Client/Buttons/BackButton'
import { usePageContext } from '@/hooks/usePageContext'
import DomainInformation from '@/components/Client/Sections/Domain/DomainInformation'
import DomainDetail from '@/components/Client/Sections/Domain/DomainDetail'
import DomainNameServer from '@/components/Client/Sections/Domain/DomainNameServer'
import DomainStatus from '@/components/Client/Sections/Domain/DomainStatus'
import DomainEmailForwarding from '@/components/Client/Sections/Domain/DomainEmailForwarding'

enum Tabs {
  DETAIL = 'detail',
  SERVER = 'server',
  LOCK = 'lock',
  ADDON = 'addon',
  MAIL = 'mail',
  CODE = 'code',
}

const MENU = [
  {
    name: t`รายละเอียด`,
    icon: 'detail',
    key: 'detail',
  },
  {
    name: t`Nameservers`,
    icon: 'name-server',
    key: 'server',
  },
  {
    name: t`Register Lock`,
    icon: 'lock',
    key: 'lock',
  },
  {
    name: t`บริการเสริม`,
    icon: 'cart',
    key: 'addon',
  },
  {
    name: t`ย้ายอีเมล`,
    icon: 'mail-read',
    key: 'mail',
  },
  {
    name: t`Get EPP Code`,
    icon: 'code',
    key: 'code',
  },
]

const RenderHeader = memo(() => {
  const { i18n } = useLingui()

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
})

export const Page = () => {
  const { i18n } = useLingui()

  // _State
  const [tab, setTab] = useState<string>(Tabs.DETAIL)

  return (
    <Fragment>
      <BackButton as="a" href={`/app/domain`} />
      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`Manage Product`)}</h3>

      <Card className={clsx(`mt-6 flex items-center justify-between overflow-x-auto`)}>
        {MENU.map((item, idx) => (
          <div
            key={idx}
            className={clsx(`desc flex cursor-pointer items-center space-x-4 px-4 py-2`, `hover:text-primary-500`, {
              '!text-primary-500': tab === item.key,
            })}
            onClick={() => setTab(item.key)}
          >
            <SvgIcon name={`backoffice-domain-manage-${item.icon}`} className={clsx(`square-6`)} />
            <span className={clsx(`whitespace-nowrap`)}>{item.name}</span>
          </div>
        ))}
      </Card>

      <Card className={clsx(`mt-4 p-0`)}>
        <RenderHeader />
        <Divider />

        {tab === Tabs.DETAIL && <DomainDetail />}
        {tab === Tabs.SERVER && <DomainNameServer />}
        {tab === Tabs.LOCK && <DomainStatus />}
        {tab === Tabs.MAIL && <DomainEmailForwarding />}
      </Card>

      {tab === Tabs.DETAIL && <DomainInformation />}
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Domain`,
}
