import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

export interface IMembership {
  id: number
  name: string
  minPrice: number
  minOrder: number
  color: string
  orderAmount?: number
  maxOrderAmount?: number
}

export interface ISimpleMembership extends Pick<IMembership, 'id' | 'name' | 'minPrice' | 'minOrder'> {}

export interface IManageMembership extends Pick<IMembership, 'color' | 'name' | 'minPrice' | 'minOrder'> {
  id?: number
}

export interface IMembershipAll extends Pick<IMembership, 'id', 'name', 'color'> {
  memberShips: IMembership[]
}

export interface IMembershipQueryParams extends IPaginationQuery<ISimpleMembership> {
  search?: string
}

export interface IMembershipPaginationResponse extends IPaginatedResponse<ISimpleMembership> {}
