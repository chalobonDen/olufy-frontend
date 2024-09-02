import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

import type { Language } from '@/enums'

export interface IBanner {
  id?: number
  locale?: Language
  title: string
  createdAt?: Date
  imageDesktop?: string
  imageMobile?: string
  url: string
}

export interface IBanners {
  banners: IBanner[]
}

export interface ISimpleBanner extends Pick<IBanner, 'id' | 'locale' | 'title' | 'createdAt'> {}

export interface IBannerQueryParams extends IPaginationQuery<ISimpleBanner> {
  search?: string
}

export interface IBannerPaginationResponse extends IPaginatedResponse<ISimpleBanner> {}
