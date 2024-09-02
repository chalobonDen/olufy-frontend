import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

export interface IDomain {
  id?: number
  name: string
  domain: string
  price: number | string
  taxWithheld: number | string
  taxRate?: number | string
  taxAmount?: number | string
}

export interface IDomains {
  domains: IDomain[]
}

export interface ISimpleDomain extends Pick<IDomain, 'id' | 'domain' | 'price'> {}

export interface IDomainQueryParams extends IPaginationQuery {
  search?: string
}

export interface IDomainPaginationResponse extends IPaginatedResponse<ISimpleDomain> {}
