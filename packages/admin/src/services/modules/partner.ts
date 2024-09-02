import type { AxiosRequestConfig } from 'axios'

import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type { IPartner, IPartnerPaginationResponse, IPartnerQueryParams } from '@/types/modules/partner'

export default class PartnerService extends BaseService {
  /**
   * Get partner list
   */
  static async list(params: IPartnerQueryParams, config?: AxiosRequestConfig): Promise<IPartnerPaginationResponse> {
    return this._get('/admin/partner', {
      params,
      ...config,
    })
  }

  /**
   * Create partner
   */
  static async create(payload: FormData): Promise<{ id: number }> {
    return this._post('/admin/partner', payload)
  }

  /**
   * Get partner by id
   */
  static async byId(id: string): Promise<IPartner> {
    return this._get('/admin/partner/', { params: { id } })
  }

  /**
   * [SSR] Get partner by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<IPartner> {
    return this._getSSR(pageContext, `/admin/partner/${id}`)
  }

  /**
   * Update partner
   */
  static async update(id: number, payload: FormData): Promise<IPartner> {
    const data = await this._patch(`/admin/partner/${id}`, payload)
    await new Promise((resolve) => setTimeout(() => resolve(true), 500))
    return data
  }

  /**
   * Delete partner by id
   */
  static async delete(id: string | number): Promise<void> {
    return this._delete(`/admin/partner/${id}`)
  }
}
