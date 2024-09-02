import type { AxiosRequestConfig } from 'axios'

import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type { IBannerPaginationResponse, IBannerQueryParams, IBanners } from '@/types/modules/banner'

export default class BannerService extends BaseService {
  /**
   * Get banner list
   */
  static async list(params: IBannerQueryParams, config?: AxiosRequestConfig): Promise<IBannerPaginationResponse> {
    return this._get('/admin/banners', {
      params,
      ...config,
    })
  }

  /**
   * Create banner
   */
  static async create(payload: FormData): Promise<{ id: number }> {
    return this._post('/admin/banners', payload)
  }

  /**
   * Get banner by id
   */
  static async byId(id: string): Promise<IBanners> {
    return this._get('/admin/banners', { params: { id } })
  }

  /**
   * [SSR] Get banner by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<IBanners> {
    return this._getSSR(pageContext, `/admin/banners/${id}`)
  }

  /**
   * Update banner
   */
  static async update(id: number | string, payload: FormData): Promise<IBanners> {
    return this._patch(`/admin/banners/${id}`, payload)
  }

  /**
   * Delete banner by id
   */
  static async delete(id: string | number): Promise<void> {
    return this._delete(`/admin/banners/${id}`)
  }
}
