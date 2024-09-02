import type { FC } from 'react'
import { useMemo, Fragment } from 'react'

import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

interface IDashboardUserDonutChartProps {
  data: number[]
}

const options: ApexOptions = {
  chart: {
    type: 'donut',
    height: 210,
  },
  colors: ['#F2C94C', '#F44D29'],
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
      },
    },
  },
  stroke: {
    colors: ['transparant'],
  },
}

const DashboardUserDonutChart: FC<IDashboardUserDonutChartProps> = ({ data }) => {
  const series = useMemo(() => {
    return data
  }, [data])

  return (
    <Fragment>
      <ReactApexChart type="donut" options={options} series={series} height={210} />
    </Fragment>
  )
}

export default DashboardUserDonutChart
