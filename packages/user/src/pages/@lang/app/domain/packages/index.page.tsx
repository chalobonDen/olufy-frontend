import { Fragment, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { Card, Divider, Loader, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import { formatPrice } from '@olufy-frontend/shared/utils'
import { random, range, sample } from 'lodash-es'
import { useMutation, useQuery } from '@tanstack/react-query'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Client/Buttons/BackButton'
import DomainClientSearchForm from '@/components/Client/Forms/Domain/SearchForm'
import Button from '@/components/Button'
import DomainPrices from '@/components/Client/Sections/Domain/DomainPrices'

interface IDomainDataRecommend {
  id: number
  name: string
  price: number
  domain: string
}

interface IDomainPrice {
  id: number
  name: string
  price: number
}

interface IDomainChecked {
  status: 'ready' | 'notReady'
  items: IDomainDataRecommend[]
}

const MOCK_DOMAINS = range(1, 11).map((n) => ({
  id: n,
  name: sample(['.COM', '.NET', '.IN', '.US', '.ORG', '.INFO', '.CLOUD']),
  price: random(300, 1000),
}))

export const Page = () => {
  const { i18n } = useLingui()

  // _State
  const [searchQuery, setSearchQuery] = useState<string>(null)

  // _Query
  const { data } = useQuery(
    ['domain-price-list'],
    () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_DOMAINS), 500)
      }) as Promise<IDomainPrice[]>
    },
    // {
    //   enabled: !!search,
    // },
  )

  // _Mutation
  const {
    data: domains,
    mutate: searchDomains,
    isLoading: isDomainsLoading,
  } = useMutation((payload: { name: string; domain: string }) => {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            status: sample(['ready', 'notReady']),
            items: ['COM', 'NET', 'IN', 'US', 'ORG', 'INFO', 'CLOUD'].map(
              (e, idx) =>
                ({
                  id: idx + 1,
                  domain: `.${e}`,
                  name: `${payload.name}.${e}`,
                  price: random(100, 1000),
                } as IDomainDataRecommend),
            ),
          } as IDomainChecked),
        1000,
      )
    }) as Promise<IDomainChecked>
  })

  return (
    <Fragment>
      <BackButton as="a" href="/app/doamin" />

      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`Domain`)}</h3>
      <Card className={clsx(`mt-6 p-10`, `sm:mt-4 sm:p-6`)}>
        <div>
          <h1 className={clsx(`text-header-2`, `sm:text-header-3`)}>{i18n._(t`ORDER DOMAIN`)}</h1>
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

      <Card className={clsx(`mt-4 px-6 py-4`)}>
        <DomainClientSearchForm
          onSubmit={(value) => {
            searchDomains(value)
            setSearchQuery(`${value.name}.${value.domain}`)
          }}
        />

        <div>
          {isDomainsLoading && (
            <div className={clsx(`mt-6 flex items-center justify-center space-x-2`)}>
              <Loader size={40} />
              <span className={clsx(`text-body-24 text-primary-500`)}>{i18n._(t`กำลังค้นหา...`)}</span>
            </div>
          )}

          {!isDomainsLoading && domains && (
            <div
              className={clsx(
                `mt-4 flex items-center justify-between rounded-lg border border-success px-4 py-2`,
                `sm:flex-col sm:space-y-2`,
                {
                  'border-success bg-success/10 text-success': domains?.status === 'ready',
                  'border-error bg-error/10 text-error': domains?.status === 'notReady',
                },
              )}
            >
              <div className={clsx(`flex items-center space-x-2`, `sm:items-start`)}>
                <SvgIcon name="check" className={clsx(`min-h-[24px] min-w-[24px] square-6`)} />
                <span className={clsx(`text-body-20 font-light`, `lg:text-body-16`)}>
                  {domains?.status === 'ready'
                    ? i18n._(t`${searchQuery} สามารถจดทะเบียนได้ Continue to register this domain for 350.00 บาท`)
                    : i18n._(t`เสียใจด้วย! ${searchQuery} ไม่สามารถจดทะเบียนได้`)}
                </span>
              </div>
              {domains.status === 'ready' && (
                <Button variant="success" size="medium" className={clsx(`w-[166px] !px-4`)}>
                  {i18n._(t`จดทะเบียน`)}
                </Button>
              )}
            </div>
          )}

          {(isDomainsLoading || domains) && (
            <div>
              <h3 className={clsx(`mt-4 pb-2 text-body-20`)}>{i18n._(t`SUGGESTED DOMAINS`)}</h3>
              <Divider />
            </div>
          )}
          {isDomainsLoading && (
            <div className={clsx(`flex flex-col items-center justify-center py-8`)}>
              <div className={clsx(`flex items-center justify-center space-x-2`)}>
                <Loader size={40} />
                <span className={clsx(`text-body-24 text-primary-500`)}>{i18n._(t`กำลังสร้างข้อเสนอของคุณ`)}</span>
              </div>
              <div className={clsx(`mt-4 text-center text-body-16 font-light`)}>
                {i18n._(
                  t`Domain name suggestions may not always be available. Availability is checked in real-time at the point of adding to the cart.`,
                )}
              </div>
            </div>
          )}
          {!isDomainsLoading && (
            <div className={clsx(`overflow-y-hidden`)}>
              {domains?.items?.map((domain, domainIdx) => (
                <div
                  key={`domain-${domainIdx}`}
                  className={clsx(
                    `relative inline-flex min-w-full items-center space-x-3 rounded-lg even:bg-primary-100 dark:even:bg-dark-300`,
                  )}
                >
                  <div className={clsx(`min-w-[170px] flex-1 px-3 py-4`)}>{domain.name}</div>
                  <div className={clsx(`min-w-[170px] px-3 py-4`, `sm:min-w-[90px]`)}>{formatPrice(domain.price)}฿</div>
                  <div className={clsx(`w-[147px] min-w-[190px] px-3 py-4`)}>
                    <Button
                      variant="success"
                      className={clsx(`min-h-[40px] w-full !px-0`)}
                      as="a"
                      href={`/app/domain/packages/${domain.id}`}
                    >
                      {i18n._(t`จดทะเบียน ${domain.domain}`)}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <DomainPrices />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Domain`,
}
