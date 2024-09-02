import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

export interface IPartner {
  id?: number
  name: string
  endDate: Date
  fileLight?: string
  fileDark?: string
  createdAt?: Date
}

export interface ISimplePartner extends Pick<IPartner, 'id' | 'name' | 'endDate' | 'createdAt'> {}

export interface IPartnerQueryParams extends IPaginationQuery<ISimplePartner> {
  search?: string
}

export interface IPartnerPaginationResponse extends IPaginatedResponse<ISimplePartner> {}
