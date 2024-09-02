import type { AxiosRequestConfig } from 'axios'

export interface IBaseResponseError {
  message: string
  statusCode: number
  status: number
  error?: string
  data?: unknown
}

export interface IBaseAxiosRequestConfig extends AxiosRequestConfig {
  ignoreSnakeKeys?: string[]
}
