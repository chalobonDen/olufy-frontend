import { Fragment } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Card, SvgIcon } from '@olufy-frontend/shared/UI'
import { range } from 'lodash-es'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Client/Buttons/BackButton'
import VpsAutoRentCard from '@/components/Client/Cards/VpsAuto/VpsAutoRentCard'

const mockLinux = range(0, 4).map((_item, idx) => ({
  id: idx,
  name: 'VPS Auto SSD #',
  price: 600,
  cpu: `2 vCPU`,
  memory: `RAM 4 GB`,
  storage: `SSD 30 GB`,
}))

const mockWindows = range(0, 4).map((_item, idx) => ({
  id: idx,
  name: 'VPS Auto SSD #',
  price: 600,
  cpu: `2 vCPU`,
  memory: `RAM 4 GB`,
  storage: `SSD 30 GB`,
}))

export const Page = () => {
  const { i18n } = useLingui()

  return (
    <Fragment>
      <BackButton as="a" href="/app/dedicated-server" />

      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`VPS Auto`)}</h3>
      <Card className={clsx(`mt-6 p-10`, `sm:mt-4 sm:p-6`)}>
        <div>
          <h1 className={clsx(`text-header-2`, `sm:text-header-3`)}>{i18n._(t`ORDER VPS AUTO`)}</h1>
          <p className={clsx(`font-light`)}>
            {i18n._(t`Rent a server`)} ({i18n._(t`Rent a server (automatic system)`)})
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

      <div className={clsx(`mt-6 flex items-center space-x-6`)}>
        <SvgIcon name="backoffice-vps-auto-windows" className={clsx(`square-12`)} />
        <div className={clsx(`inline-flex items-baseline space-x-2`, `sm:flex-col`)}>
          <h2 className={clsx(`text-[32px] font-medium`, `sm:text-header-3`)}>{i18n._(t`VPS Auto`)}</h2>
          <p className={clsx(`text-body-20 font-light`)}>{i18n._(t`(Windows Package)`)}</p>
        </div>
      </div>

      <div
        className={clsx(
          `mt-6 grid grid-cols-4 gap-6`,
          `2xl:gap-4`,
          `xl:grid-cols-3`,
          `lg:grid-cols-2`,
          `sm:grid-cols-1`,
        )}
      >
        {mockWindows.map((item, itemIdx) => (
          <VpsAutoRentCard key={`windows-${itemIdx}`} data={item} cardType="windows" />
        ))}
      </div>

      <div className={clsx(`mt-6 flex items-center space-x-6`)}>
        <SvgIcon name="backoffice-vps-auto-linux" className={clsx(`square-12`)} />
        <div className={clsx(`inline-flex items-baseline space-x-2`, `sm:flex-col`)}>
          <h2 className={clsx(`text-[32px] font-medium`, `sm:text-header-3`)}>{i18n._(t`VPS Auto`)}</h2>
          <p className={clsx(`text-body-20 font-light`)}>{i18n._(t`(Linux Package)`)}</p>
        </div>
      </div>

      <div
        className={clsx(
          `mt-6 grid grid-cols-4 gap-6`,
          `2xl:gap-4`,
          `xl:grid-cols-3`,
          `lg:grid-cols-2`,
          `sm:grid-cols-1`,
        )}
      >
        {mockLinux.map((item, itemIdx) => (
          <VpsAutoRentCard key={`linux-${itemIdx}`} data={item} cardType="linux" />
        ))}
      </div>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`VPS Auto`,
}
