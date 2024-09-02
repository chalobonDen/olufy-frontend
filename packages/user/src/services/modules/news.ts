import type { AxiosRequestConfig } from 'axios'

import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type { INews, INewsPaginationResponse, INewsQueryParams } from '@/types/modules/news'

export default class NewsService extends BaseService {
  /**
   * Get news list
   */
  static async list(params: INewsQueryParams, config?: AxiosRequestConfig): Promise<INewsPaginationResponse> {
    return this._get(`/homepage/news`, {
      params,
      ...config,
    })
  }

  /**
   * [SSR] Get news by slug
   */
  static async bySlugSsr(pageContext: PageContext, slug: string): Promise<INews> {
    return this._getSSR(pageContext, `/homepage/news/${slug}`)
  }
}
