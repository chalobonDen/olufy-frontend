import BaseService from './base'

import type {
  IDepositPaginationResponse,
  IDepositQueryParams,
  IManageDeposit,
  IPaymentChannelOption,
} from '@/types/modules/deposit'
import type { IBaseAxiosRequestConfig } from '@/types/base'

export default class DepositService extends BaseService {
  /**
   * Get deposit list
   */
  static async list(
    params: IDepositQueryParams,
    config?: IBaseAxiosRequestConfig,
  ): Promise<IDepositPaginationResponse> {
    try {
      const res = await this._get(`/user/deposit`, {
        params,
        ...config,
      })
      return res.deposit
    } catch (error) {
      throw error
    }
  }

  /**
   * Create deposit order
   */
  static async createOrder(payload: IManageDeposit): Promise<{ link: string }> {
    return this._post(`/user/deposit`, payload)
  }

  /**
   * Get payment channel configs
   */
  static async configs(config?: IBaseAxiosRequestConfig): Promise<{ payments: IPaymentChannelOption[] }> {
    return this._get(`/user/deposit/ksher-fees`, config)
  }
}
