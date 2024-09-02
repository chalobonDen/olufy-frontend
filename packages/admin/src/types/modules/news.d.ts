import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

import type { Language } from '@/enums'

export interface INews {
  id?: number
  title: string
  detail: string
  description: string
  locale: Language
  image: string
  imageUrl?: string
  createdAt?: string
}

export interface INewsData {
  news: INews[]
}

export interface ISimpleNews extends Pick<INews, 'id' | 'locale' | 'title' | 'createdAt'> {}

export interface INewsQueryParams extends IPaginationQuery<ISimpleNews> {
  search?: string
}

export interface INewsPaginationResponse extends IPaginatedResponse<ISimpleNews> {}
