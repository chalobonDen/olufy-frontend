import type { AxiosRequestConfig } from 'axios'

import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type {
  IManageVpsServer,
  IVpsServer,
  IVpsServerPaginationResponse,
  IVpsServerQueryParams,
} from '@/types/modules/vps-server'

export default class VpsServerService extends BaseService {
  /**
   * Get VPS Server list
   */
  static async list(params: IVpsServerQueryParams, config?: AxiosRequestConfig): Promise<IVpsServerPaginationResponse> {
    return this._get(`/admin/vps`, { params, ...config })
  }

  /**
   * Create VPS Server
   */
  static async create(payload: IManageVpsServer): Promise<{ id: number }> {
    return this._post(`/admin/vps`, payload)
  }

  /**
   * [SSR] Get VPS Server by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<IVpsServer> {
    return this._getSSR(pageContext, `/admin/vps/${id}`)
  }

  /**
   * Update VPS Server
   */
  static async update(payload: IManageVpsServer): Promise<IVpsServer> {
    return this._patch(`/admin/vps/${payload.id}`, payload)
  }

  /**
   * Update Status VPS Server
   */
  static async changeStatus(id: string | number): Promise<void> {
    return this._patch(`/admin/vps/status/${id}`)
  }

  /**
   * Delete VPS Server by id
   */
  static async delete(id: string | number): Promise<void> {
    return this._delete(`/admin/vps/${id}`)
  }
}
