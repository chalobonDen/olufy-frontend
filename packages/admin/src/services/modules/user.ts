import type { AxiosRequestConfig } from 'axios'
import { omit } from 'lodash-es'

import { useUserStore } from '@/stores/user'
import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type { IManageUser, IUser, IUserPaginationResponse, IUserQueryParams, IUsersList } from '@/types/modules/user'
import type { UserFlag } from '@/enums'

export default class UserService extends BaseService {
  /**
   * Get user profile
   */
  static async me(): Promise<IUser> {
    try {
      const data = await this._get('/admin/profile')
      useUserStore.getState().setProfile(data)
      return data
    } catch (error) {
      throw error
    }
  }

  // ADMIN LIKE USER
  /**
   * Get admin list
   */
  static async list(params: IUserQueryParams, config?: AxiosRequestConfig): Promise<IUserPaginationResponse> {
    return this._get(`/admin`, {
      params,
      ...config,
    })
  }

  /**
   * Get admin by id
   */
  static async byId(id: number | string, config?: AxiosRequestConfig): Promise<IUser> {
    return this._get(`/admin/${id}`, config)
  }

  /**
   * [SSR] Get admin by id
   */
  static async byIdSsr(pageContext: PageContext, id: string): Promise<IUser> {
    return this._getSSR(pageContext, `/admin/${id}`)
  }

  /**
   * Create admin
   */
  static async create(payload: IManageUser): Promise<{ id: number }> {
    return this._post(`/admin`, payload)
  }

  /**
   * Update admin
   */
  static async update(payload: IManageUser): Promise<IManageUser> {
    return this._patch(`/admin/${payload.id}`, payload)
  }

  /**
   * Delete admin
   */
  static async delete(id: number | string): Promise<void> {
    return this._delete(`/admin/${id}`)
  }

  /**
   * Change password admin
   */
  static async changePassword(payload: { id: number; password: string }): Promise<void> {
    return this._patch(`/admin/${payload.id}/password`, omit(payload, ['id']))
  }

  /**
   * Change status admin
   */
  static async changeStatus(payload: { id: number; flag: UserFlag }): Promise<void> {
    return this._patch(`/admin/${payload.id}/status`, omit(payload, ['id']))
  }

  /**
   * Get user all
   */
  static async all(): Promise<IUsersList> {
    return this._get(`/admin/users/all`)
  }
}
