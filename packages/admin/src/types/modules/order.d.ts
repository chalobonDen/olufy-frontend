import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

export interface IOrder {
  id?: number
  orderId: string
  username: string
  orderDetail: string
  expiredAt: Date | string | number
  total: number | string
}

export interface IOrderQueryParams extends IPaginationQuery {
  search?: string
}

export interface IOrderPaginationResponse extends IPaginatedResponse<IOrder> {}
