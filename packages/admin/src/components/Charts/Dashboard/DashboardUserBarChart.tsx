import type { FC } from 'react'
import { Fragment, useMemo } from 'react'

import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'

import useBarChart from '@/hooks/useBarChart'

interface IDashboardUserBarChartProps {
  data: number[]
}

const DashboardUserBarChart: FC<IDashboardUserBarChartProps> = ({ data }) => {
  const { i18n } = useLingui()
  const { options: defaultOptions } = useBarChart()

  // _Memo
  const series = useMemo(() => {
    return [
      {
        name: i18n._(t`ยอดขายทั้งหมดของเดือน`),
        data: data,
      },
    ]
  }, [data, i18n])

  const options = useMemo(() => {
    return {
      ...defaultOptions,
      xaxis: {
        ...defaultOptions.xaxis,
        categories: [
          i18n._(t`มกราคม`),
          i18n._(t`กุมภาพันธ์`),
          i18n._(t`มีนาคม`),
          i18n._(t`เมษายน`),
          i18n._(t`พฤษภาคม`),
          i18n._(t`มิถุนายน`),
          i18n._(t`กรกฏาคม`),
          i18n._(t`สิงหาคม`),
          i18n._(t`กันยายน`),
          i18n._(t`ตุลาคม`),
          i18n._(t`พฤศจิกายน`),
          i18n._(t`ธันวาคม`),
        ],
      },
    } as ApexOptions
  }, [defaultOptions, i18n])

  return (
    <Fragment>
      <ReactApexChart className={clsx(`!min-h-[190px]`)} type="bar" options={options} series={series} height={205} />
    </Fragment>
  )
}

export default DashboardUserBarChart
