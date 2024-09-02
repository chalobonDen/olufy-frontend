import type { AxiosRequestConfig } from 'axios'

import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type { IReceiptDocument, IReceiptsPaginationResponse, IReceiptsQueryParams } from '@/types/modules/receipt'

export default class ReceiptService extends BaseService {
  /**
   * Get receipt list
   */
  static async list(params: IReceiptsQueryParams, config?: AxiosRequestConfig): Promise<IReceiptsPaginationResponse> {
    return this._get(`/user/documents/receipt`, { params, ...config })
  }

  /**
   * [SSR] Get receipt by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<IReceiptDocument> {
    return this._getSSR(pageContext, `/user/documents/receipt/${id}`)
  }
}
