import type { AxiosRequestConfig } from 'axios'

export interface IBaseResponseError {
  message: string
  statusCode: number
  status: number
  error?: string
  data?: unknown
}

export interface ICalculateSummaryOrderResponse {
  price: number
  priceBeforeVat: number
  vat: number
  vatAmount: number
  withholdTax: number
  withholdTaxAmount: number
  netPrice: number
  totalAmount: number
}

export interface IBaseAxiosRequestConfig extends AxiosRequestConfig {
  ignoreSnakeKeys?: string[]
}

export interface IBaseOptionItem {
  id: number
  name: string
}
