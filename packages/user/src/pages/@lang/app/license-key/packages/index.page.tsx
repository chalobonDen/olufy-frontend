import { Fragment, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { Card, SvgIcon } from '@olufy-frontend/shared/UI'
import { formatPrice } from '@olufy-frontend/shared/utils'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Client/Buttons/BackButton'
import Button from '@/components/Button'

interface ILicenseKey {
  id: number
  title: string
  price: number
}

interface IAddonHosting {
  id: number
  name: string
  description: string
}

const GET_LICENSE_KEY = () =>
  [
    {
      id: 1,
      title: 'Key Windows 11',
      price: 500,
    },
    {
      id: 2,
      title: 'Key Windows 11',
      price: 500,
    },
    {
      id: 3,
      title: 'Key Windows 11',
      price: 500,
    },
    {
      id: 4,
      title: 'Key Windows 11',
      price: 500,
    },
  ] as ILicenseKey[]

const GET_MOCK_ADDON = () =>
  [
    {
      id: 1,
      name: 'Firewall',
      description: t`Free! throughout the service life`,
    },
    {
      id: 2,
      name: 'Extra IP Address',
      description: t`80 THB/IP (over 20 IP, 50-70 THB/IP)`,
    },
    {
      id: 3,
      name: 'LAN UTP 1 Gbps (Share) : Domestic',
      description: t`Out of service/monthly (Guarantee 400~800 Mbps)`,
    },
    {
      id: 4,
      name: 'LAN UTP 1 Gbps (Dedicated) : Domestic',
      description: t`3,500 THB/monthly (Guarantee 1,000 Mbps)`,
    },
    {
      id: 5,
      name: 'Fiber 10 Gbps (Share) : Domestic',
      description: t`15,000 THB/monthly (Guarantee 1~5 Gbps)`,
    },
    {
      id: 6,
      name: 'Fiber 10 Gbps (Dedicated) : Domestic',
      description: t`2x,xxx THB/monthly (Guarantee 10 Gbps)`,
    },
    {
      id: 7,
      name: 'DirectAdmin License',
      description: t`Free 1 license when paying at least 3 months in advance`,
    },
    {
      id: 8,
      name: 'Instant Business Support',
      description: t`1,500 THB/monthly`,
    },
  ] as IAddonHosting[]

export const Page = () => {
  const { i18n } = useLingui()

  // _State
  const [idxAddon, setIdxAddon] = useState<number | null>(null)

  const handleSelectAddon = (e: number) => {
    if (e === idxAddon) return setIdxAddon(null)
    setIdxAddon(e)
  }

  return (
    <Fragment>
      <BackButton as="a" href="/app/license-key" />

      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`License key / Addons`)}</h3>
      <Card className={clsx(`mt-6 p-10`, `sm:mt-4 sm:p-6`)}>
        <div>
          <h1 className={clsx(`text-header-2`, `sm:text-header-3`)}>{i18n._(t`ORDER License key / Addons`)}</h1>
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

      <h2 className={clsx(`mt-6 text-header-3`)}>{i18n._(t`Addons`)}</h2>
      <div className={clsx(`mt-6 grid grid-cols-4 gap-4`, `xl:grid-cols-3`, `md:grid-cols-2`, `sm:grid-cols-1`)}>
        {GET_MOCK_ADDON().map((item, idx) => (
          <div key={idx} onClick={() => handleSelectAddon(idx)}>
            <Card
              className={clsx(`relative h-full cursor-pointer border border-transparent`, `hover:border-primary-500`, {
                '!border-primary-500': idxAddon === idx,
              })}
            >
              {idxAddon === idx ? (
                <SvgIcon name="backoffice-hosting-circle-check" className={clsx(`absolute right-2 top-2 square-6`)} />
              ) : (
                <SvgIcon name="backoffice-hosting-circle-outline" className={clsx(`absolute right-2 top-2 square-6`)} />
              )}
              <div className={clsx(`uppercase`)}>{item.name}</div>
              <div className={clsx(`text-body-14 font-light`)}>{item.description}</div>
            </Card>
          </div>
        ))}
      </div>

      <h2 className={clsx(`mt-6 text-header-3`)}>{i18n._(t`License key`)}</h2>
      <div className={clsx(`mt-6 grid grid-cols-3 gap-4`, `xl:grid-cols-3`, `md:grid-cols-2`, `sm:grid-cols-1`)}>
        {GET_LICENSE_KEY()?.map((item, idx) => (
          <Card key={idx} className={clsx(`flex flex-col items-center justify-center`)}>
            <h3 className={clsx(`text-header-3`, `sm:text-header-4`)}>{item.title}</h3>
            <h2 className={clsx(`text-gradient-primary mt-2 w-fit text-header-2 font-semibold`, `sm:text-header-3`)}>
              {formatPrice(item.price)}
            </h2>
            <p className={clsx(`desc font-light`)}>THB</p>
            <Button
              variant="success"
              buttonType="icon-text"
              as="a"
              href={`/app/license-key/packages/${item.id}`}
              size="medium"
              className={clsx(`mt-6 w-full`)}
            >
              <SvgIcon name="cart" className={clsx(`square-6`)} />
              <span>{i18n._(t`Buy`)}</span>
            </Button>
          </Card>
        ))}
      </div>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`License Key`,
}
