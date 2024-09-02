import type { IBillingData } from '@olufy-frontend/shared/UI/Document/Billing/types'

import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

export interface IReceipt {
  id?: number
  documentNo: string
  orderId: number
  name: string
  product: string
  createdAt: string
  total: number
  status: string
  documentId: number
}

export interface ISampleReceipts
  extends Pick<IReceipt, 'id' | 'documentNo' | 'orderId' | 'name' | 'createdAt' | 'total' | 'documentId'> {}

export interface IReceiptDocument extends IBillingData {}

export interface IReceiptsQueryParams extends IPaginationQuery<ISampleReceipts> {
  search?: string
}

export interface IReceiptsPaginationResponse extends IPaginatedResponse<ISampleReceipts> {}
