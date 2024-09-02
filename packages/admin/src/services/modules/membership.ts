import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type {
  IManageMembership,
  IMembership,
  IMembershipAll,
  IMembershipPaginationResponse,
  IMembershipQueryParams,
} from '@/types/modules/membership'
import type { IBaseAxiosRequestConfig } from '@/types/base'

export default class MembershipService extends BaseService {
  /**
   *  Get membership list
   */
  static async list(
    params: IMembershipQueryParams,
    config?: IBaseAxiosRequestConfig,
  ): Promise<IMembershipPaginationResponse> {
    return this._get(`/admin/membership`, {
      params,
      ...config,
    })
  }

  /**
   *  Get all membership list
   */
  static async all(config?: IBaseAxiosRequestConfig): Promise<IMembershipAll> {
    return this._get(`/admin/membership/all`, config)
  }

  /**
   * Create membership
   */
  static async create(payload: IManageMembership): Promise<{ id: number }> {
    return this._post('/admin/membership', payload)
  }

  /**
   * Get membership by id
   */
  static async byId(id: string): Promise<IMembership> {
    return this._get('/admin/membership', { params: { id } })
  }

  /**
   * [SSR] Get membership by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<IMembership> {
    return this._getSSR(pageContext, `/admin/membership/${id}`)
  }

  /**
   * Update membership
   */
  static async update(id: number | string, payload: IManageMembership): Promise<IMembership> {
    return this._patch(`/admin/membership/${id}`, payload)
  }

  /**
   * Delete membership by id
   */
  static async delete(id: string | number): Promise<void> {
    return this._delete(`/admin/membership/${id}`)
  }
}
