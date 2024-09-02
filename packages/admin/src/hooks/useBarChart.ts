import { useMemo } from 'react'

import type { ApexOptions } from 'apexcharts'
import { formatK, formatNumber } from '@olufy-frontend/shared/utils'

import { useSetting } from './stores/useSetting'

import { Theme } from '@/enums'

const useBarChart = () => {
  const { theme } = useSetting()

  // _Memo
  const isDark = useMemo(() => theme === Theme.DARK, [theme])

  const options = useMemo(() => {
    return {
      chart: {
        type: 'bar',
        height: 205,
        fontFamily: 'Kanit, sans-serif',
        background: 'transparent',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          borderRadius: 4,
        },
      },
      colors: ['#F44D29'],
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        labels: {
          style: {
            fontFamily: 'Kanit, sans-serif',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: 'Kanit, sans-serif',
          },
          formatter: (val) => {
            return `${formatK(String(val))}`
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val) => {
            return `${formatNumber({ number: val })}`
          },
        },
      },
      theme: {
        mode: isDark ? 'dark' : 'light',
        palette: 'palette1',
        monochrome: {
          enabled: false,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65,
        },
      },
      responsive: [
        {
          breakpoint: 1200,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '35%',
              },
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '40%',
              },
            },
          },
        },
        {
          breakpoint: 640,
          options: {
            chart: {
              height: 390,
            },
            plotOptions: {
              bar: {
                barHeight: '60%',
                horizontal: true,
              },
            },
          },
        },
      ],
    } as ApexOptions
  }, [isDark])

  return {
    options,
  }
}

export default useBarChart
