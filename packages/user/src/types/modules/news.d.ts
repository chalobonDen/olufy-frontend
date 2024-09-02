import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

export interface INews {
  id?: number
  createdAt: Date | number | string
  titleImageUrl: string
  title: string
  description: string
  detail: string
  slug: string
}

export interface INewsQueryParams extends IPaginationQuery {
  search?: string
}

export interface INewsPaginationResponse extends IPaginatedResponse<INews> {}
