import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

import type { DepositStatus, PaymentChannel } from '@/enums'

export interface IDeposit {
  id: number
  amount: number
  detail: string
  registrationDate: Date
  status: DepositStatus
  link: string
}

export interface ISimpleDeposit
  extends Pick<IDeposit, 'id' | 'amount' | 'detail' | 'registrationDate' | 'status' | 'link'> {}

export interface IDepositQueryParams extends IPaginationQuery<ISimpleDeposit> {
  search?: string
}

export interface IDepositPaginationResponse extends IPaginatedResponse<IDeposit> {}

export interface IPaymentChannelOption {
  fees: number
  img: string
  key: PaymentChannel
  name: string
}

export interface IManageDeposit {
  paymentChannel: PaymentChannel
  amount: number
  urlCallbackSuccess?: string
  urlCallbackError?: string
}
