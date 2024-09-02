import { Fragment, useState } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Card, Divider, SvgIcon } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { formatPrice } from '@olufy-frontend/shared/utils'

import BackButton from '@/components/Client/Buttons/BackButton'
import type { DocumentProps } from '@/renderer/types'
import Button from '@/components/Button'

interface IPackageHosting {
  id: number
  package: string
  price: number
}

interface IAddonHosting {
  id: number
  name: string
  description: string
}

const GET_MOCK_HOST = () =>
  [
    {
      id: 1,
      package: 'JUNIOR',
      price: 500,
    },
    {
      id: 2,
      package: 'SENIOR',
      price: 1000,
    },
    {
      id: 3,
      package: 'TECHNICAL',
      price: 1500,
    },
    {
      id: 4,
      package: 'SUPER',
      price: 2000,
    },
  ] as IPackageHosting[]

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
      <BackButton as="a" href="/app/hosting" />

      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`HOSTING`)}</h3>
      <Card className={clsx(`mt-6 p-10`, `sm:mt-4 sm:p-6`)}>
        <div>
          <h1 className={clsx(`text-header-2`, `sm:text-header-3`)}>{i18n._(t`ORDER HOSTING`)}</h1>
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

      <h2 className={clsx(`mt-6 text-header-3`)}>{i18n._(t`Package`)}</h2>
      <div className={clsx(`mt-6 grid grid-cols-4 gap-4`, `xl:grid-cols-3`, `md:grid-cols-2`, `sm:grid-cols-1`)}>
        {GET_MOCK_HOST()?.map((item, idx) => (
          <Card key={idx}>
            <h3 className={clsx(`text-header-3`, `sm:text-header-4`)}>{item.package}</h3>
            <h2 className={clsx(`text-gradient-primary mt-2 w-fit text-header-2 font-semibold`, `sm:text-header-3`)}>
              {formatPrice(item.price)}
            </h2>
            <p className={clsx(`desc font-light`)}>THB / {i18n._(t`Yearly`)}</p>
            <Divider className={clsx(`mt-4`)} />
            <div className={clsx(`mt-4 flex items-center space-x-2`)}>
              <SvgIcon name="backoffice-hosting-package-detail-drive" className={clsx(`square-6`)} />
              <div className={clsx(`desc text-body-12 font-light`)}>
                <span className={clsx(`text-body-16`)}>3</span> of Domains
              </div>
            </div>
            <div className={clsx(`mt-3 flex items-center space-x-2`)}>
              <SvgIcon name="backoffice-hosting-package-detail-web-check" className={clsx(`square-6`)} />
              <div className={clsx(`desc text-body-12 font-light`)}>
                <span className={clsx(`text-body-16`)}>10 GB</span> of Space
              </div>
            </div>
            <div className={clsx(`mt-3 flex items-center space-x-2`)}>
              <SvgIcon name="backoffice-hosting-package-detail-transfer" className={clsx(`square-6`)} />
              <div className={clsx(`desc text-body-12 font-light`)}>
                <span className={clsx(`text-body-16`)}>200 GB</span> Monthly transfer
              </div>
            </div>
            <div className={clsx(`mt-3 flex items-center space-x-2`)}>
              <SvgIcon name="backoffice-hosting-package-detail-database" className={clsx(`square-6`)} />
              <div className={clsx(`desc text-body-12 font-light`)}>
                <span className={clsx(`text-body-16`)}>5 Database</span> of MySQL
              </div>
            </div>
            <div className={clsx(`mt-3 flex items-center space-x-2`)}>
              <SvgIcon name="backoffice-hosting-package-detail-account-tree" className={clsx(`square-6`)} />
              <div className={clsx(`desc text-body-12 font-light`)}>
                <span className={clsx(`text-body-16`)}>Unlimited FTP</span> of accounts
              </div>
            </div>
            <div className={clsx(`mt-3 flex items-center space-x-2`)}>
              <SvgIcon name="backoffice-hosting-package-detail-mark-email" className={clsx(`square-6`)} />
              <div className={clsx(`desc text-body-12 font-light`)}>
                <span className={clsx(`text-body-16`)}>Unlimited Email</span> of accounts
              </div>
            </div>
            <div className={clsx(`mt-3 flex items-center space-x-2`)}>
              <SvgIcon name="backoffice-hosting-package-detail-network-admin" className={clsx(`square-6`)} />
              <div className={clsx(`desc text-body-12 font-light`)}>
                <span className={clsx(`text-body-16`)}>DirectAdmin</span> Web Control Panel
              </div>
            </div>
            <div className={clsx(`mt-3 flex items-center space-x-2`)}>
              <SvgIcon name="backoffice-hosting-package-detail-firewall" className={clsx(`square-6`)} />
              <div className={clsx(`desc text-body-12 font-light`)}>
                <span className={clsx(`text-body-16`)}>FREE</span> Firewall All Layer
              </div>
            </div>
            <div className={clsx(`mt-3 flex items-center space-x-2`)}>
              <SvgIcon name="backoffice-hosting-package-detail-webhook" className={clsx(`square-6`)} />
              <div className={clsx(`desc text-body-12 font-light`)}>
                <span className={clsx(`text-body-16`)}>FREE</span> SSL (HTTPS) by Let's Encrypt
              </div>
            </div>

            <Button
              variant="success"
              buttonType="icon-text"
              as="a"
              href={`/app/hosting/packages/${item.id}`}
              size="medium"
              className={clsx(`mt-6 w-full`)}
            >
              <SvgIcon name="cart" className={clsx(`square-6`)} />
              <span>{i18n._(t`Rent`)}</span>
            </Button>
          </Card>
        ))}
      </div>

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
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Hosting`,
}
