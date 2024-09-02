import type { AxiosRequestConfig } from 'axios'

import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type { IRack, IRackPaginationResponse, IRackQueryParams } from '@/types/modules/rack'

export default class RackService extends BaseService {
  /**
   *  Get rack list
   */
  static async list(params: IRackQueryParams, config?: AxiosRequestConfig): Promise<IRackPaginationResponse> {
    return this._get(`/admin/rack`, {
      params,
      ...config,
    })
  }

  /**
   * Create rack
   */
  static async create(payload: IRack): Promise<{ id: number }> {
    return this._post('/admin/rack', payload)
  }

  /**
   * Get rack by id
   */
  static async byId(id: string): Promise<IRack> {
    return this._get('/admin/rack', { params: { id } })
  }

  /**
   * [SSR] Get rack by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<IRack> {
    return this._getSSR(pageContext, `/admin/rack/${id}`)
  }

  /**
   * Update rack
   */
  static async update(id: number | string, payload: IRack): Promise<IRack> {
    return this._patch(`/admin/rack/${id}`, payload)
  }

  /**
   * Delete rack by id
   */
  static async delete(id: string | number): Promise<void> {
    return this._delete(`/admin/rack/${id}`)
  }
}
