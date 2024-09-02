import type { AxiosRequestConfig } from 'axios'

import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type {
  IDataCenter,
  IDataCenterAll,
  IDataCenterPaginationResponse,
  IDataCenterQueryParams,
} from '@/types/modules/data-center'

export default class DataCenterService extends BaseService {
  /**
   *  Get data center list
   */
  static async list(
    params: IDataCenterQueryParams,
    config?: AxiosRequestConfig,
  ): Promise<IDataCenterPaginationResponse> {
    return this._get(`/admin/data-center`, {
      params,
      ...config,
    })
  }

  /**
   *  Get all data center
   */
  static async all(): Promise<IDataCenterAll> {
    return this._get(`/admin/data-center/all`)
  }

  /**
   * Create data center
   */
  static async create(payload: IDataCenter): Promise<{ id: number }> {
    return this._post('/admin/data-center', payload)
  }

  /**
   * Get data center by id
   */
  static async byId(id: string): Promise<IDataCenter> {
    return this._get('/admin/data-center', { params: { id } })
  }

  /**
   * [SSR] Get data center by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<IDataCenter> {
    return this._getSSR(pageContext, `/admin/data-center/${id}`)
  }

  /**
   * Update data center
   */
  static async update(id: number | string, payload: IDataCenter): Promise<IDataCenter> {
    return this._patch(`/admin/data-center/${id}`, payload)
  }

  /**
   * Delete data center by id
   */
  static async delete(id: string | number): Promise<void> {
    return this._delete(`/admin/data-center/${id}`)
  }
}
