import type { IBillingData } from '@olufy-frontend/shared/UI/Document/Billing/types'

import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

export interface IReceipt {
  company: string
  createdAt: Date
  documentId: number
  documentNo: string
  name: string
  product: string
  total: number
  username: string
}

export interface ISimpleReceipt extends IReceipt {}

export interface IReceiptDocument extends IBillingData {}
export interface IReceiptQueryParams extends IPaginationQuery {
  search?: string
}

export interface IReceiptPaginationResponse extends IPaginatedResponse<ISimpleReceipt> {}
