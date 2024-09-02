import type { AxiosRequestConfig } from 'axios'

import BaseService from './base'

import type { IDashboard, IDashboardQueryParams } from '@/types/modules/dashboard'

export default class DashboardService extends BaseService {
  /**
   * Get dashboard
   */
  static async dashboard(params: IDashboardQueryParams, config?: AxiosRequestConfig): Promise<IDashboard> {
    return this._get(`/admin/dashboard`, { params: params, ...config })
  }
}
