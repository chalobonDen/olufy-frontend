import { Fragment, useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { t } from '@lingui/macro'
import { Button, Card, Divider, SvgIcon } from '@olufy-frontend/shared/UI'
import { formatNumber } from '@olufy-frontend/shared/utils'
import { useQuery } from '@tanstack/react-query'
import { values } from 'lodash'

import type { DocumentProps } from '@/renderer/types'
import { useUserStore } from '@/stores/user'
import DashboardUserDonutChart from '@/components/Charts/Dashboard/DashboardUserDonutChart'
import DashboardUserBarChart from '@/components/Charts/Dashboard/DashboardUserBarChart'
import DashboardService from '@/services/modules/dashboard'
import YearSelect from '@/components/Selects/YearSelect'
import DashboardContactSection from '@/components/Sections/Dashboard/DashboardContactSection'
import DashboardTicketSection from '@/components/Sections/Dashboard/DashboardTicketSection'
import DashboardProductsSections from '@/components/Sections/Dashboard/DashboardProductsSections'

import type { IDashboardQueryParams } from '@/types/modules/dashboard'

export const Page = () => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()

  // _State
  const [selectYear, setSelectYear] = useState<string | number>(new Date('01-01-2023').getFullYear())
  const [queryParams, setQueryParams] = useState<IDashboardQueryParams>({
    year: selectYear,
  })

  // _Query
  const { data } = useQuery(
    ['get-dashboard', queryParams, selectYear],
    ({ signal }) => DashboardService.dashboard(queryParams, { signal }),
    {
      enabled: !!profile,
    },
  )

  // _Memo
  const systemReport = useMemo(
    () => [
      {
        title: i18n._(t`จำนวนผู้ใช้งานในระบบ`),
        count: data?.countUser.countAllUser,
        icon: 'backoffice-dashboard-report-user-group',
        currency: i18n._(t`User`),
      },
      {
        title: i18n._(t`ยอดขายระบบ`),
        count: data?.totalSales,
        icon: 'backoffice-dashboard-report-receive-money',
        currency: i18n._(t`THB`),
      },
      {
        title: i18n._(t`ยอดออเดอร์`),
        count: data?.countOrder,
        icon: 'backoffice-dashboard-report-border-all',
        currency: i18n._(t`Order`),
      },
    ],
    [data?.countOrder, data?.countUser.countAllUser, data?.totalSales, i18n],
  )

  const totalSaleOfYear = useMemo(() => values(data?.totalSalesYear.month), [data?.totalSalesYear.month])

  return (
    <Fragment>
      <div className={clsx(`bg-gradient-primary rounded-lg px-4 py-6`)}>
        <h1 className={clsx(`text-[40px] text-white-900`, `sm:text-header-3`)}>
          {i18n._(t`ยินดีต้อนรับคุณ ${profile?.nameEn},`)}
        </h1>

        <div className={clsx(`flex items-center text-white-900`)}>
          <h3 className={clsx(`text-body-24`, `sm:text-body-16`)}>
            {i18n._(t`รายการคำสั่งซื้อใหม่ ${formatNumber({ number: data?.countNewOrder })} รายการ`)}{' '}
          </h3>
          <Button variant="default" buttonType="icon-text" className={clsx(`ml-auto`, `!p-0`)} as="a" href="#">
            <span className={clsx(`text-body-20`, `sm:text-body-16`, `xs:text-body-14`)}>{i18n._(t`คำสั่งซื้อ`)}</span>
            <SvgIcon name="arrow-right" className={clsx(`square-6`)} />
          </Button>
        </div>

        <div
          className={clsx(
            `mt-4 grid grid-cols-7 gap-2`,
            `2xl:grid-cols-4`,
            `md:grid-cols-3`,
            `sm:grid-cols-2`,
            `xs:grid-cols-1`,
          )}
        >
          {data?.countProductOrder.map((item, idx) => (
            <Card key={idx}>
              <p className={clsx(`text-header-5`)}>{item.name}</p>
              <h2 className={clsx(`mt-1 text-3xl font-normal text-primary-400`)}>
                {formatNumber({ number: item.countOrder })}
              </h2>
            </Card>
          ))}
        </div>
      </div>

      <h3 className={clsx(`mt-6 text-header-3`)}>{i18n._(t`System Report`)}</h3>
      <div className={clsx(`mt-6 grid grid-cols-3 gap-4`, `2xl:grid-cols-2`, `md:grid-cols-1`)}>
        {systemReport.map((item, reportIdx) => (
          <Card className={clsx(`flex items-center space-x-6 p-6`)} key={reportIdx}>
            <SvgIcon name={item.icon} className={clsx(`square-20`, `xl:square-16`)} />
            <div>
              <div className={clsx(`desc text-body-20 font-light`, `sm:text-body-16 sm:font-light`)}>{item.title}</div>
              <div>
                <span className={clsx(`text-header-2`, `xs:text-header-3`)}>
                  {formatNumber({ number: item.count })}
                </span>
                <span className={clsx(`desc ml-2 text-body-20 font-light`, `sm:text-body-16 sm:font-light`)}>
                  {item.currency}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className={clsx(`mt-6 grid grid-cols-3 gap-4`, `xl:grid-cols-1`)}>
        <div className={clsx(`col-span-1`, `xl:col-span-1`)}>
          <Card>
            <h4>{i18n._(t`ผู้ใช้งานระบบ`)}</h4>
            <div className={clsx(`relative mt-6`)}>
              {data && (
                <DashboardUserDonutChart
                  data={[data?.countUser.countNormalUser, data?.countUser.countOrganizationUser]}
                />
              )}
              <div
                className={clsx(
                  `absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center`,
                )}
              >
                <span className={clsx(`text-header-3`)}>{formatNumber({ number: data?.countUser.countAllUser })}</span>
                <span className={clsx(`text-body-14 font-light`)}>User</span>
              </div>
            </div>

            <div className={clsx(`flex`)}>
              <div className={clsx(`flex items-center space-x-2`)}>
                <div className={clsx(`rounded-md bg-warning square-4`)} />
                <span className={clsx(`text-body-16 font-light`)}>{i18n._(t`สมาชิกปกติ`)}</span>
              </div>
              <span className={clsx(`ml-auto text-header-5`)}>
                {formatNumber({ number: data?.countUser.countNormalUser })}
              </span>
            </div>
            <Divider className={clsx(`my-2`)} />
            <div className={clsx(`flex`)}>
              <div className={clsx(`flex items-center space-x-2`)}>
                <div className={clsx(`rounded-md bg-primary-500 square-4`)} />
                <span className={clsx(`text-body-16 font-light`)}>{i18n._(t`สมาชิกบริษัท`)}</span>
              </div>
              <span className={clsx(`ml-auto text-header-5`)}>
                {formatNumber({ number: data?.countUser.countOrganizationUser })}
              </span>
            </div>
          </Card>
        </div>
        <div className={clsx(`col-span-2`, `xl:col-span-1`)}>
          <Card>
            <div className={clsx(`flex items-start`)}>
              <h4>{i18n._(t`ยอดขายทั้งหมดของปี`)}</h4>
              <YearSelect
                id="taxRate"
                name="taxRate"
                className={clsx(`ml-auto`)}
                onChange={(e) => {
                  setSelectYear(e.target.value)
                  setQueryParams({ year: e.target.value })
                }}
                value={selectYear}
                endYear={new Date('01-01-2023')}
              />
            </div>
            <h2 className={clsx(`text-header-2`, `sm:text-header-3`)}>
              ฿ {formatNumber({ number: data?.totalSalesYear.year })}
            </h2>
            {data && <DashboardUserBarChart data={totalSaleOfYear} />}
          </Card>
        </div>
      </div>

      <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `lg:grid-cols-1`)}>
        {/* ข้อความใหม่จากเว็บไซต์ */}
        {data && <DashboardContactSection count={data?.countContact} data={data?.contacts} />}

        {/* ข้อความใหม่จากผู้ใช้งาน */}
        {data && <DashboardTicketSection count={data?.countTicket} data={data?.tickets} />}
      </div>

      {data && <DashboardProductsSections data={data?.products} />}
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: 'Dashboard',
}
