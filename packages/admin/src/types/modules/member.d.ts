import type { IPaginatedResponse, IPaginationQuery } from '../pagination'
import type { IMembership } from './membership'

import type { AccountVerityStatus, UserFlag } from '@/enums'

export interface IMemberVerification {
  email: false
  identityCard: false
  identityCardFlag: AccountVerityStatus
  mobile: false
}

export interface IMemberTaxInvoice {
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

export interface IMemberAddress {
  address: string
  district: string
  id: number
  province: string
  subDistrict: string
  userId: number
  zipCode: string
}

export interface IMember {
  id: number
  email: string
  nameEn: string
  nameTh: string
  tel: string
  membership: IMembership
  accountAddress: IMemberAddress
  accountVerification: IMemberVerification
  taxInvoiceAddresses: IMemberTaxInvoice[]
  userIdentity: {
    idCardImage?: string
    idCardNo?: string
  }
  credit: number
  flag?: UserFlag
}

export interface ISimpleMember extends Pick<IMember, 'id' | 'email' | 'nameEn' | 'nameTh' | 'tel' | 'membership'> {
  totalDomainAmount: number
  totalProductAmount: number
}

export interface IMemberQueryParams extends IPaginationQuery<ISimpleMember> {
  search?: string
}

export interface IMemberPaginationResponse extends IPaginatedResponse<ISimpleMember> {}

export interface IMemberActivity {
  countProduct: number
  countDomain: number
  countPendingPayment: number
  countTicket: number
  products: {
    id: number
    name: string
    detail: string
    status: 'success'
  }[]
  pendingPayment: unknown[]
  tickets: unknown[]
  news: {
    id: number
    title: string
    description: string
  }[]
}
