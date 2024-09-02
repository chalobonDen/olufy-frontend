import { Fragment, useState } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Loader } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { random, sample } from 'lodash-es'
import { formatNumber } from '@olufy-frontend/shared/utils'

import UserDomainCoverSection from '@/components/User/Sections/Domain/CoverSection'
import type { DocumentProps } from '@/renderer/types'
import UserContainer from '@/components/UI/User/Container'
import DomainSearchForm from '@/components/User/Forms/Domain/SearchForm'
import type { IDomainData } from '@/components/User/Tables/Domain/PriceListTable'
import UserTitle from '@/components/UI/User/Title'
import DomainPriceListTable from '@/components/User/Tables/Domain/PriceListTable'
import Button from '@/components/Button'

interface IDomainDataRecommend {
  name: string
  price: number
  domain: string
}

interface IDomainChecked {
  status: 'ready' | 'notReady'
  items: IDomainDataRecommend[]
}

const MOCK_TABLE_DATA_PRICE: IDomainData[] = [
  {
    name: '.COM',
    registerPrice: 350,
    continuePrice: 350,
    transferPrice: 350,
  },
  {
    name: '.NET',
    registerPrice: 450,
    continuePrice: 450,
    transferPrice: 450,
  },
  {
    name: '.US',
    registerPrice: 550,
    continuePrice: 550,
    transferPrice: 550,
  },
  {
    name: '.ORG',
    registerPrice: 650,
    continuePrice: 650,
    transferPrice: 650,
  },
]

export const Page = () => {
  const { i18n } = useLingui()

  // _State
  const [searchQuery, setSearchQuery] = useState<string>(null)

  // _Query
  const { data: priceList, isLoading: isPriceLoading } = useQuery(
    ['domain-price-list'],
    () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_TABLE_DATA_PRICE), 500)
      }) as Promise<IDomainData[]>
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
            items: ['COM', 'NET', 'US', 'ORG'].map(
              (e) =>
                ({
                  domain: `.${e}`,
                  name: `${payload.name}.${e}`,
                  price: random(999, 9999),
                } as IDomainDataRecommend),
            ),
          } as IDomainChecked),
        1000,
      )
    }) as Promise<IDomainChecked>
  })

  return (
    <Fragment>
      <UserDomainCoverSection />

      <section className={clsx(`pb-20 pt-8`)}>
        <UserContainer>
          <UserTitle className={clsx(`text-center`)}>{i18n._(t`Search & Register Domain For Your Website.`)}</UserTitle>
          <p className={clsx(`desc mb-8 mt-4 text-center text-body-16`)}>
            {i18n._(
              t`Focus on your business and avoid all the web hosting hassles. Our managed with 24/7 support that acts as your extended team,`,
            )}
          </p>
        </UserContainer>
        <UserContainer>
          <DomainSearchForm
            onSubmit={(value) => {
              searchDomains(value)
              setSearchQuery(`${value.name}.${value.domain}`)
            }}
          />

          <div className={clsx(`mt-10`)}>
            {isPriceLoading && (
              <div className={clsx(`flex items-center justify-center py-8`)}>
                <Loader size={40} />
              </div>
            )}

            {priceList && !isPriceLoading && !domains && !isDomainsLoading && <DomainPriceListTable data={priceList} />}

            <div className={clsx(`mt-10`)}>
              {isDomainsLoading && (
                <div className={clsx(`mb-6 flex items-center justify-center space-x-2`)}>
                  <Loader size={40} />
                  <span className={clsx(`text-body-24 text-primary-500`)}>{i18n._(t`กำลังค้นหา...`)}</span>
                </div>
              )}
              {!isDomainsLoading && domains && (
                <div
                  className={clsx(`py-6 text-center text-body-24`, {
                    'text-success': domains?.status === 'ready',
                    'text-error': domains?.status === 'notReady',
                  })}
                >
                  {domains?.status === 'ready'
                    ? i18n._(t`ยินดีด้วย! ${searchQuery} สามารถใช้ได้!`)
                    : i18n._(t`เสียใจด้วย! ${searchQuery} ไม่พร้อมใช้งาน`)}
                </div>
              )}

              {(isDomainsLoading || domains) && (
                <h3 className={clsx(`mb-4 border-b border-primary-500 pb-2 text-body-24`)}>
                  {i18n._(t`โดเมนที่แนะนำ`)}
                </h3>
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
                        `relative inline-flex min-w-full items-center space-x-3 rounded-lg even:bg-primary-100 dark:even:bg-dark-400`,
                      )}
                    >
                      <div className={clsx(`min-w-[170px] flex-1 px-3 py-4`)}>{domain.name}</div>
                      <div className={clsx(`min-w-[170px] px-3 py-4`, `sm:min-w-[90px]`)}>
                        {formatNumber({ number: domain.price, decimals: 2 })}฿
                      </div>
                      <div className={clsx(`w-[147px] min-w-[190px] px-3 py-4`)}>
                        <Button variant="success" className={clsx(`min-h-[40px] w-full !px-0`)}>
                          {i18n._(t`จดทะเบียน ${domain.domain}`)}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </UserContainer>
      </section>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: 'Domain',
}
