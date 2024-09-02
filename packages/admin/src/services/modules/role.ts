import type { AxiosRequestConfig } from 'axios'
import { omit } from 'lodash-es'

import BaseService from './base'

import type { IRole, IManageRole, ISimpleRole } from '@/types/modules/role'

export default class RoleService extends BaseService {
  /**
   * Get role list
   */
  static async list(config?: AxiosRequestConfig): Promise<ISimpleRole[]> {
    try {
      const res = await this._get(`/admin/roles`, config)
      return res.roles
    } catch (error) {
      throw error
    }
  }

  /**
   * Get role by id
   */
  static async byId(id: number | string, config?: AxiosRequestConfig): Promise<IRole> {
    return this._get(`/admin/roles/${id}`, config)
  }

  /**
   * Create role
   */
  static async create(payload: IManageRole): Promise<{ id: number }> {
    return this._post(`/admin/roles`, payload)
  }

  /**
   * Update role
   */
  static async update(payload: IManageRole): Promise<IRole> {
    return this._patch(`/admin/roles/${payload.id}`, omit(payload, ['id']))
  }

  /**
   * Delete role
   */
  static async delete(id: number | string): Promise<void> {
    return this._delete(`/admin/roles/${id}`)
  }
}
