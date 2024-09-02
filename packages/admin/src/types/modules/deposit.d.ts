import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

import type { DepositStatus, PaymentChannel } from '@/enums'

interface IDeposit {
  id: number
  amount: number
  detail: PaymentChannel
  registrationDate: Date
  status: DepositStatus
  createdBy: string
  createdAt: string
}

export interface IDepositQueryParams extends IPaginationQuery {
  search?: string
}

export interface IDepositPaginationResponse extends IPaginatedResponse<IDeposit> {}

export interface IPaymentChannelOption {
  name: string
  icon: string
  value: PaymentChannel
}

export interface IManageDeposit {
  paymentChannel: PaymentChannel
  amount: number
  urlCallbackSuccess?: string
  urlCallbackError?: string
}
