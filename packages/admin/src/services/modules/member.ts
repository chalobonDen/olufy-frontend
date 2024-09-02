import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type { IBaseAxiosRequestConfig } from '@/types/base'
import type { IMember, IMemberActivity, IMemberPaginationResponse, IMemberQueryParams } from '@/types/modules/member'
import type { IDepositPaginationResponse, IDepositQueryParams } from '@/types/modules/deposit'
import type { AccountVerityStatus, UserFlag } from '@/enums'

export default class MemberService extends BaseService {
  /**
   * Get member list
   */
  static async list(params: IMemberQueryParams, config?: IBaseAxiosRequestConfig): Promise<IMemberPaginationResponse> {
    return this._get(`/admin/users`, {
      params,
      ...config,
    })
  }

  /**
   * Get member by id
   */
  static async byId(id: number | string, config?: IBaseAxiosRequestConfig): Promise<IMember> {
    return this._get(`/admin/users/${id}`, config)
  }

  /**
   * [SSR] Get member by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<IMember> {
    return this._getSSR(pageContext, `/admin/users/${id}`)
  }

  /**
   * Get member credit list
   */
  static async creditList(
    id: number | string,
    params: IDepositQueryParams,
    config?: IBaseAxiosRequestConfig,
  ): Promise<IDepositPaginationResponse> {
    return this._get(`/admin/users/${id}/credit`, {
      params,
      ...config,
    })
  }

  /**
   * Add credit to member
   */
  static async addCredit(id: number | string, payload: { amount: number }): Promise<{ credit: number }> {
    return this._post(`/admin/users/${id}/credit`, payload)
  }

  /**
   * Get member activity
   */
  static async activity(id: number | string, config?: IBaseAxiosRequestConfig): Promise<IMemberActivity> {
    return this._get(`/admin/users/${id}/info`, config)
  }

  /**
   * Delete member by id
   */
  static async delete(id: number | string): Promise<void> {
    return this._delete(`/admin/users/${id}`)
  }

  /**
   * Update identity status of member
   */
  static async updateIdentity(id: number | string, flag: AccountVerityStatus): Promise<IMember> {
    return this._post(`/admin/users/${id}/identity`, { flag })
  }

  /**
   * Update member status
   */
  static async updateStatus(id: number | string, flag: UserFlag): Promise<void> {
    return this._patch(`/admin/users/${id}/update_status`, { flag })
  }

  /**
   * Update membership of member
   */
  static async updateMembership(id: number | string, membershipId: number): Promise<IMember> {
    return this._patch(`/admin/users/${id}/membership`, { id: membershipId })
  }
}
