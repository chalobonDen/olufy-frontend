/* eslint-disable no-param-reassign */
import { range } from 'lodash-es'
import Numeral from 'numeral'
import BigNumber from 'bignumber.js'

export const formatNoRound = (value: string | number, decimals = 2, fixed = false) => {
  const zeroDecimal = range(0, decimals).reduce<string>((zero) => (zero += '0'), '')
  if (fixed) return Numeral(value).format(`0,0.${zeroDecimal}`)
  return Numeral(value).format(`0,0.[${zeroDecimal}]`, (n: number) => Math.floor(n))
}

export const formatK = (value: string) => {
  return Numeral(value).format('0.[00]a')
}

export function formatPercent(percentString: unknown) {
  if (typeof percentString !== 'string') return ''
  const percent = parseFloat(String(percentString))
  if (!percent || percent === Infinity || percent === 0) {
    return '0%'
  }
  if (percent < 0.0001 && percent > 0) {
    return '< 0.0001%'
  }
  if (percent < 0 && percent > -0.0001) {
    return '< 0.0001%'
  }
  const fixedPercent = percent.toFixed(2)
  if (fixedPercent === '0.00') {
    return '0%'
  }
  if (Number(fixedPercent) > 0) {
    if (Number(fixedPercent) > 100) {
      return `${percent?.toFixed(0).toLocaleString()}%`
    } else {
      return `${fixedPercent}%`
    }
  } else {
    return `${fixedPercent}%`
  }
}

export const formatNumber = ({
  number,
  price = false,
  scale = true,
  decimals = 0,
  fixed = false,
  iconSymbol = '$',
}: {
  number: any
  price?: boolean
  scale?: boolean
  decimals?: number
  fixed?: boolean
  iconSymbol?: string
}) => {
  const option = {
    decimals: price ? (decimals === 0 ? 2 : decimals) : decimals,
    fixed: price ? (!fixed ? true : fixed) : fixed,
  }

  if (isNaN(number) || number === '' || number === undefined) {
    return (price ? iconSymbol : '') + formatNoRound(0, option.decimals, option.fixed)
  }

  const num = parseFloat(number)

  if (num > 0 && num < 0.01) {
    return (price ? iconSymbol : '') + new BigNumber(num).toFixed()
  }

  if (num === 0) {
    return (price ? iconSymbol : '') + formatNoRound(0, option.decimals, option.fixed)
  }

  if (num > 500000000 && scale) {
    return (price ? iconSymbol : ``) + formatK(num.toFixed(option.decimals))
  }

  return (
    (num < 0 ? '-' : '') +
    (price ? iconSymbol : ``) +
    formatNoRound(String(Math.abs(num)), option.decimals, option.fixed)
  )
}

export const formatPrice = (number = 0, iconSymbol = '') => {
  return formatNumber({ number, price: true, iconSymbol })
}
