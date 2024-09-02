import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type { ITicket, ITicketInformation, ITicketPaginationResponse, ITicketQueryParams } from '@/types/modules/ticket'
import type { IBaseAxiosRequestConfig } from '@/types/base'

export default class TicketService extends BaseService {
  /**
   * Get ticket list
   */
  static async list(params: ITicketQueryParams, config?: IBaseAxiosRequestConfig): Promise<ITicketPaginationResponse> {
    return this._get(`/user/tickets`, { params, ...config })
  }

  /**
   * Get ticket info
   */
  static async info(config?: IBaseAxiosRequestConfig): Promise<ITicketInformation> {
    return this._get(`/user/tickets/info`, { ...config })
  }

  /**
   * Create ticket
   */
  static async create(payload: FormData): Promise<{ id: number }> {
    return this._post(`/user/tickets`, payload)
  }

  /**
   * User reply message
   */
  static async reply(payload: FormData): Promise<ITicket> {
    return this._post(`/user/ticket_messages`, payload)
  }

  /**
   * Get ticket by id
   */
  static async byId(id: number, config?: IBaseAxiosRequestConfig): Promise<ITicket> {
    return this._get(`/user/tickets/${id}`, config)
  }

  /**
   * [SSR] Get ticket by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<ITicket> {
    return this._getSSR(pageContext, `/user/tickets/${id}`)
  }
}
