import type { AxiosRequestConfig } from 'axios'

import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type { INewsData, INewsPaginationResponse, INewsQueryParams } from '@/types/modules/news'

export default class NewsService extends BaseService {
  /**
   * Get news list
   */
  static async list(params: INewsQueryParams, config?: AxiosRequestConfig): Promise<INewsPaginationResponse> {
    return this._get('/admin/news', {
      params,
      ...config,
    })
  }

  /**
   * Create news
   */
  static async create(payload: FormData): Promise<{ id: number }> {
    return this._post('/admin/news', payload)
  }

  /**
   * Get news by id
   */
  static async byId(id: string): Promise<INewsData> {
    return this._get('/admin/news', { params: { id } })
  }

  /**
   * [SSR] Get news by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<INewsData> {
    return this._getSSR(pageContext, `/admin/news/${id}`)
  }

  /**
   * Update news
   */
  static async update(id: number | string, payload: FormData): Promise<INewsData> {
    return this._patch(`/admin/news/${id}`, payload)
  }

  /**
   * Delete news by id
   */
  static async delete(id: string | number): Promise<void> {
    return this._delete(`/admin/news/${id}`)
  }
}
