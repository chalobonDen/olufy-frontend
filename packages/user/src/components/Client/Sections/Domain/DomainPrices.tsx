import { Fragment } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Card } from '@olufy-frontend/shared/UI'
import { formatPrice } from '@olufy-frontend/shared/utils'
import clsx from 'clsx'
import { random, range, sample } from 'lodash-es'
import { useQuery } from '@tanstack/react-query'

interface IDomainPrice {
  id: number
  name: string
  price: number
}

const GET_MOCK_DOMAINS = () =>
  range(1, 11).map((n) => ({
    id: n,
    name: sample(['.COM', '.NET', '.IN', '.US', '.ORG', '.INFO', '.CLOUD']),
    price: random(300, 1000),
  }))

const DomainPrices = () => {
  const { i18n } = useLingui()

  // _Query
  const { data } = useQuery(
    ['domain-price-list'],
    () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(GET_MOCK_DOMAINS()), 500)
      }) as Promise<IDomainPrice[]>
    },
    // {
    //   enabled: !!search,
    // },
  )

  return (
    <Fragment>
      <h2 className={clsx(`mt-6 text-header-3`)}>{i18n._(t`DOMAIN PRICES`)}</h2>
      <div
        className={clsx(
          `mt-6 grid grid-cols-6 gap-4`,
          `2xl:grid-cols-5`,
          `xl:grid-cols-4`,
          `lg:grid-cols-3`,
          `sm:grid-cols-2`,
          `xs:grid-cols-1`,
        )}
      >
        {data?.map((item, idx) => (
          <Card key={idx}>
            <h3 className={clsx(`text-header-3`, `sm:text-header-4`)}>{item.name}</h3>
            <h2 className={clsx(`text-gradient-primary mt-2 w-fit text-header-2 font-semibold`, `sm:text-header-3`)}>
              {formatPrice(item.price)}
            </h2>
            <p className={clsx(`desc font-light`)}>THB / {i18n._(t`Yearly`)}</p>
          </Card>
        ))}
      </div>
    </Fragment>
  )
}

export default DomainPrices
