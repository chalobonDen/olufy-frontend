import type { AxiosRequestConfig } from 'axios'

import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type {
  ICreateOrderVpsServer,
  IOrderLogsVpsServerPaginationResponse,
  IOrderLogsVpsServerQueryParams,
  IOrderVpsServer,
  IOrderVpsServerPaginationResponse,
  IOrderVpsServerQueryParams,
  IVpsServer,
  IVpsServerPaginationResponse,
  IVpsServerQueryParams,
} from '@/types/modules/vps-server'

export default class VpsServerService extends BaseService {
  /**
   * Get VPS Server list
   */
  static async list(params: IVpsServerQueryParams, config?: AxiosRequestConfig): Promise<IVpsServerPaginationResponse> {
    return this._get(`/user/vps`, { params, ...config })
  }

  /**
   * [SSR] Get VPS Server by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<IVpsServer> {
    return this._getSSR(pageContext, `/user/vps/${id}`)
  }

  /**
   * Create Order
   */
  static async createOrder(payload: ICreateOrderVpsServer): Promise<{ id: number }> {
    return this._post('/user/vps/order', payload)
  }

  /**
   * Get VPS Server: Order list
   */
  static async orderList(
    // params: IVpsServerQueryParams,
    params: IOrderVpsServerQueryParams,
    config?: AxiosRequestConfig,
  ): Promise<IOrderVpsServerPaginationResponse> {
    return this._get(`/user/vps/order`, { params, ...config })
  }

  /**
   * [SSR] Get VPS Server: Order by id
   */
  static async orderByIdSsr(pageContext: PageContext, id: string): Promise<IOrderVpsServer> {
    return this._getSSR(pageContext, `/user/vps/${id}/order`)
  }

  /**
   * [SSR] Get VPS Server: activity logs by order id
   */
  static async orderLogs(
    id: string,
    params: IOrderLogsVpsServerQueryParams,
    config?: AxiosRequestConfig,
  ): Promise<IOrderLogsVpsServerPaginationResponse> {
    return this._get(`/user/vps/${id}/order/log`, { params, ...config })
  }
}
