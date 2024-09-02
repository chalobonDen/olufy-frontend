export enum Order {
  ASC = 'asc', // ascend
  DESC = 'desc', // descend
}

export interface IPaginationSortOrder<T> {
  sort: 'id' | keyof T
  order: Order
}

export interface IPaginationQuery<T = any> extends Partial<IPaginationSortOrder<T>> {
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
