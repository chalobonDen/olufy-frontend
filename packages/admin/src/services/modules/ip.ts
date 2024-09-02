import type { AxiosRequestConfig } from 'axios'

import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type {
  IInternetProtocolQueryParams,
  IInternetProtocolPaginationResponse,
  IInternetProtocolMultiple,
  IInternetProtocol,
} from '@/types/modules/ip'
import type { IBaseAxiosRequestConfig } from '@/types/base'

export default class ipService extends BaseService {
  /**
   *  Get rack list
   */
  static async list(
    params: IInternetProtocolQueryParams,
    config?: AxiosRequestConfig,
  ): Promise<IInternetProtocolPaginationResponse> {
    return this._get(`/admin/ip-address`, {
      params,
      ...config,
    })
  }

  /**
   * Create IP
   */
  static async create(payload: IInternetProtocolMultiple, config?: IBaseAxiosRequestConfig): Promise<void> {
    return this._post('/admin/ip-address', payload, config)
  }

  /**
   * Get IP by id
   */
  static async byId(id: string): Promise<IInternetProtocol> {
    return this._get('/admin/ip-address', { params: { id } })
  }

  /**
   * [SSR] Get IP by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<IInternetProtocol> {
    return this._getSSR(pageContext, `/admin/ip-address/${id}`)
  }

  /**
   * Update IP
   */
  static async update(
    id: number | string,
    payload: IInternetProtocol,
    config?: IBaseAxiosRequestConfig,
  ): Promise<IInternetProtocol> {
    return this._patch(`/admin/ip-address/${id}`, payload, config)
  }

  /**
   * Delete IP by id
   */
  static async delete(id: string | number): Promise<void> {
    return this._delete(`/admin/ip-address/${id}`)
  }
}
