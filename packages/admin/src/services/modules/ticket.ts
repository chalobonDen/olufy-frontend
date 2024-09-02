import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type { ITicket, ITicketPaginationResponse, ITicketQueryParams } from '@/types/modules/ticket'
import type { IBaseAxiosRequestConfig } from '@/types/base'

export default class TicketService extends BaseService {
  /**
   * Get ticket list
   */
  static async list(params: ITicketQueryParams, config?: IBaseAxiosRequestConfig): Promise<ITicketPaginationResponse> {
    return this._get(`/admin/tickets`, {
      params,
      ...config,
    })
  }

  /**
   * Admin reply message
   */
  static async reply(payload: FormData): Promise<ITicket> {
    return this._post(`/admin/ticket-messages`, payload)
  }

  /**
   * Get ticket by id
   */
  static async byId(id: number, config?: IBaseAxiosRequestConfig): Promise<ITicket> {
    return this._get(`/admin/tickets/${id}`, config)
  }

  /**
   * [SSR] Get ticket by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<ITicket> {
    return this._getSSR(pageContext, `/admin/tickets/${id}`)
  }

  /**
   * Close ticket
   */
  static async close(id: number): Promise<void> {
    return this._patch(`/admin/tickets/${id}/closed`)
  }
}
