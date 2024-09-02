import type { AxiosRequestConfig } from 'axios'

import BaseService from './base'

import type { IBaseAxiosRequestConfig } from '@/types/base'
import type { IPlanAll } from '@/types/modules/plan'

export default class PlanService extends BaseService {
  /**
   *  Get server all
   */
  static async all(config?: IBaseAxiosRequestConfig): Promise<IPlanAll> {
    return this._get(`/admin/vps/plans`, config)
  }
}
