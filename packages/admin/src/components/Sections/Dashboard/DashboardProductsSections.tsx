import type { FC } from 'react'
import { Fragment } from 'react'

import { useLingui } from '@lingui/react'
import { Card, Divider } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { kebabCase } from 'lodash-es'
import { formatNumber } from '@olufy-frontend/shared/utils'
import { t } from '@lingui/macro'

import type { IProduct } from '@/types/modules/dashboard'

interface IDashboardProductsSectionsProps {
  data: IProduct[]
}

const DashboardProductsSections: FC<IDashboardProductsSectionsProps> = ({ data }) => {
  const { i18n } = useLingui()

  return (
    <Fragment>
      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`Product`)}</h3>
      <div className={clsx(`mt-6 grid grid-cols-4 gap-4`, `xl:grid-cols-3`, `md:grid-cols-2`, `sm:grid-cols-1`)}>
        {data.map((item, idx) => (
          <Card className={clsx(`p-0`)} key={idx}>
            <div className={clsx(`flex items-center space-x-6 p-4`)}>
              <img
                src={`/images/dashboard/${kebabCase(item.name)}.png`}
                alt={kebabCase(item.name)}
                className={clsx(`object-contain square-14`)}
              />
              <div>
                <div className={clsx(`desc text-body-14`)}>{item.name}</div>
                <div className={clsx(`text-header-4`)}>{formatNumber({ number: item.countAll })}</div>
              </div>
            </div>
            <Divider />
            <div className={clsx(`flex px-4 py-2`)}>
              <div className={clsx(`flex-1`)}>
                <div className={clsx(`desc text-body-14`)}>{i18n._(t`เปิดการขาย`)}</div>
                <div className={clsx(`text-header-4`)}>{formatNumber({ number: item.countActive })}</div>
              </div>
              <Divider type="vertical" className={clsx(`mr-4 h-[50px]`)} />
              <div className={clsx(`flex-1`)}>
                <div className={clsx(`desc text-body-14`)}>{i18n._(t`ปิดการขาย`)}</div>
                <div className={clsx(`text-header-4`)}>{formatNumber({ number: item.countSuspend })}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Fragment>
  )
}

export default DashboardProductsSections
