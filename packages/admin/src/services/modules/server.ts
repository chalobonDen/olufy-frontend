import type { AxiosRequestConfig } from 'axios'

import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type { IServer, IServerAll, IServerPaginationResponse, IServerQueryParams } from '@/types/modules/server'
import type { IBaseAxiosRequestConfig } from '@/types/base'

export default class ServerService extends BaseService {
  /**
   *  Get server list
   */
  static async list(params: IServerQueryParams, config?: AxiosRequestConfig): Promise<IServerPaginationResponse> {
    return this._get(`/admin/server`, {
      params,
      ...config,
    })
  }

  /**
   *  Get server all
   */
  static async all(config?: IBaseAxiosRequestConfig): Promise<IServerAll> {
    return this._get(`/admin/server/all`, config)
  }

  /**
   * Create server
   */
  static async create(payload: IServer): Promise<{ id: number }> {
    return this._post('/admin/server', payload)
  }

  /**
   * Get server by id
   */
  static async byId(id: string): Promise<IServer> {
    return this._get('/admin/server', { params: { id } })
  }

  /**
   * [SSR] Get server by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<IServer> {
    return this._getSSR(pageContext, `/admin/server/${id}`)
  }

  /**
   * Update server
   */
  static async update(id: number | string, payload: IServer): Promise<IServer> {
    return this._patch(`/admin/server/${id}`, payload)
  }

  /**
   * Delete server by id
   */
  static async delete(id: string | number): Promise<void> {
    return this._delete(`/admin/server/${id}`)
  }
}
