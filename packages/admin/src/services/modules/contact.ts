import type { AxiosRequestConfig } from 'axios'

import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type { IContact, IContactPaginationResponse, IContactQueryParams } from '@/types/modules/contact'

export default class ContactService extends BaseService {
  /**
   *  Get contact list
   */
  static async list(params: IContactQueryParams, config?: AxiosRequestConfig): Promise<IContactPaginationResponse> {
    return this._get(`/admin/contacts`, {
      params,
      ...config,
    })
  }

  /**
   * Get contact by id
   */
  static async byId(id: string): Promise<IContact> {
    return this._get('/admin/contacts', { params: { id } })
  }

  /**
   * [SSR] Get contact by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<IContact> {
    return this._getSSR(pageContext, `/admin/contacts/${id}`)
  }

  /**
   * Update contact
   */
  static async update(id: number | string, payload: Pick<IContact, 'status'>): Promise<IContact> {
    return this._patch(`/admin/contacts/${id}`, payload)
  }
}
