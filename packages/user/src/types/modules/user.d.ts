import type { AccountVerityStatus } from '@/enums/verify'

export interface IUser {
  createdAt: Date
  credit: number
  email: string
  firebaseUid: string
  flag: 'active' | 'inactive'
  id: number
  identityCardNumber: string
  isNewUser: boolean
  isVerifyEmail: boolean
  isVerifyIdentityCard: boolean
  isVerifyMobile: boolean
  nameEn: string
  nameTh: string
  role: 'user'
  tel: string
  updatedAt: Date
}

export interface IUserSetupInfo {
  nameTh: string
  nameEn: string
  tel: string
  email: string
}

export interface IUserSetupAddress {
  address: string
  province: string
  district: string
  subDistrict: string
  zipCode: string
}

export interface IUserSetup extends IUserSetupInfo {
  address: IUserSetupAddress
}

export interface IUserTaxInvoice {
  id?: number
  name: string
  taxId: string
  branch: string | null
  tel: string
  address: string
  subDistrict: string
  district: string
  province: string
  zipCode: string
  type?: 'person' | 'company'
}

export interface IUserMemberShip {
  color: string
  maxOrderAmount: number
  orderAmount: number
  role: string
}

export interface IUserVerification {
  email: false
  identityCard: false
  identityCardFlag: AccountVerityStatus
  mobile: false
}

export interface IUserSettingProfile {
  accountAddress: IUserSetupAddress
  accountInformation: IUserSetupInfo
  accountMembership: IUserMemberShip
  accountVerification: IUserVerification
  taxInvoiceAddress: IUserTaxInvoice[]
}

export interface IUserContact {
  name: string
  email: string
  tel: string
  title: string
  message: string
}
