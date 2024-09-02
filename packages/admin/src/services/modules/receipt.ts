import type { AxiosRequestConfig } from 'axios'

import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type { IReceiptDocument, IReceiptPaginationResponse, IReceiptQueryParams } from '@/types/modules/receipt'

export default class ReceiptService extends BaseService {
  /**
   * Get receipt list
   */
  static async list(params: IReceiptQueryParams, config?: AxiosRequestConfig): Promise<IReceiptPaginationResponse> {
    return this._get(`/admin/documents`, { params, ...config })
  }

  /**
   * [SSR] Get receipt by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<IReceiptDocument> {
    return this._getSSR(pageContext, `/admin/documents/${id}`)
  }
}
