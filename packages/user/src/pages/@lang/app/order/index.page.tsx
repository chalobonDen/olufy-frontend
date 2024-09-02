import { Fragment } from 'react'

import { Card, SvgIcon } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import { GET_ORDER_LIST } from '@/constants/product-order'
import type { DocumentProps } from '@/renderer/types'
import Link from '@/components/Link'

export const Page = () => {
  const { i18n } = useLingui()

  return (
    <Fragment>
      <Card className={clsx(`flex items-center space-x-4 p-6`)}>
        <SvgIcon name="backoffice-order-icon" className={clsx(`square-[60px]`)} />
        <div>
          <h3 className={clsx(`text-header-3`)}>{i18n._(t`ORDER`)}</h3>
          <p className={clsx(`font-light`)}>({i18n._(t`Select Order`)})</p>
        </div>
      </Card>

      <div className={clsx(`mt-4 grid grid-cols-4 gap-4`, `lg:grid-cols-3`, `md:grid-cols-2`, `sm:grid-cols-1`)}>
        {GET_ORDER_LIST().map((item, itemIdx) => (
          <Card key={itemIdx}>
            <div className={clsx(`space-y-2`)}>
              <img src={item.imageUrl} alt={item.title} className={clsx(`pointer-events-none square-20`)} />
              <h4 className={clsx(`text-header-3`)}>{item.title}</h4>
              <p className={clsx(`desc`)}>{item.description}</p>
            </div>
            <Link
              href={item.readmore.path}
              title={item.readmore.label}
              className={clsx(`mt-4 flex items-center space-x-1 text-primary-500`)}
            >
              <span>{item.readmore.label}</span>
              <SvgIcon name="arrow-right" className={clsx(`square-6`)} />
            </Link>
          </Card>
        ))}
      </div>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Order`,
}
