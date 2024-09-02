import { omit } from 'lodash-es'

import { useUserStore } from '@/stores/user'
import type { PageContext } from '@/renderer/types'

import BaseService from './base'

import type {
  IUser,
  IUserContact,
  IUserSettingProfile,
  IUserSetup,
  IUserSetupAddress,
  IUserSetupInfo,
  IUserTaxInvoice,
} from '@/types/modules/user'

export default class UserService extends BaseService {
  /**
   * Get user profile
   */
  static async me(): Promise<IUser> {
    try {
      const data = await this._get('/user/profile')
      useUserStore.getState().setProfile(data)
      return data
    } catch (error) {
      throw error
    }
  }

  /**
   * Setup user profile
   */
  static async setup(payload: IUserSetup): Promise<IUser> {
    return this._post('/user/setup', payload)
  }

  /*---------------SETTING PROFILE---------------*/
  /**
   * Get setting profile
   */
  static async settingProfile(): Promise<IUserSettingProfile> {
    return this._get(`/user/setting_profile`)
  }

  /**
   * Update user profile info
   */
  static async updateProfileInfo(payload: IUserSetupInfo): Promise<IUser> {
    try {
      const data = await this._patch('/user/profile', omit(payload, 'email'))
      useUserStore.getState().setProfile(data)
      return data
    } catch (error) {
      throw error
    }
  }

  /**
   * Update user profile address
   */
  static async updateProfileAddress(payload: IUserSetupAddress): Promise<void> {
    return this._patch(`/user/address`, payload)
  }

  /**
   * User verify email
   */
  static async verifyEmail(payload: { email: string; confirmUrl: string }): Promise<void> {
    return this._post(`/user/verify-email`, payload)
  }

  /**
   * User confirm verify email
   */
  static async confirmVerifyEmailSsr(pageContext: PageContext, token: string): Promise<void> {
    return this._postSSR(pageContext, `/user/verify-email/confirm`, { token })
  }

  /**
   * User request SMS OTP
   */
  static async requestOtp(): Promise<{ refno: string; token: string }> {
    return this._post(`/user/request_sms_otp`)
  }

  /**
   * User request SMS OTP
   */
  static async verifyOtp(payload: { otp: string; token: string }): Promise<void> {
    return this._post(`/user/verify_sms_otp`, payload)
  }

  /**
   * User upload identity
   */
  static async uploadIdentity(payload: FormData): Promise<void> {
    return this._post(`/user/upload_identity`, payload)
  }

  /**
   * Create Tax Invoice
   */
  static async createTaxInvoice(payload: IUserTaxInvoice): Promise<{ id: number }> {
    return this._post(`/user/address_document`, payload)
  }

  /**
   * Update Tax Invoice
   */
  static async updateTaxInvoice(payload: IUserTaxInvoice): Promise<void> {
    return this._patch(`/user/address_document`, payload)
  }

  /**
   * Delete Tax Invoice
   */
  static async deleteTaxInvoice(id: number): Promise<void> {
    return this._delete(`/user/address_document`, { id })
  }

  /*---------------CONTACT FORM LANDING PAGE---------------*/
  /**
   *  Send Contact Form
   */
  static async sendContact(payload: IUserContact): Promise<void> {
    return this._post(`/user/contacts`, payload)
  }
}
