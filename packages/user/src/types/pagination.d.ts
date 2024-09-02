import type { Order } from '@/enums'

export interface IPaginationSortOrder<T> {
  sort: 'id' | keyof T
  order: Order
}

export interface IPaginationQuery<T = unknown> extends Partial<IPaginationSortOrder<T>> {
  page: number
  perPage: number
  search?: string
}

export interface IPaginatedResponse<T> {
  items: T[]
  lastPage: number
  page: number
  perPage: number
  total: number
}
