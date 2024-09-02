import type { INews } from './news'

export interface IBanner {
  id?: number
  locale?: Language
  title: string
  createdAt?: Date
  imageDesktop?: string
  imageMobile?: string
  url: string
}

export interface IPartner {
  id?: number
  name: string
  endDate: Date
  imageLight?: string
  imageDark?: string
  createdAt?: Date

  // custom
  dark?: {
    width: number
    height: number
  }
  light?: {
    width: number
    height: number
  }
}

export interface IStatistics {
  countDedicatedServer: number
  countHosting: number
  countServer: number
  countUser: number
}

export interface IHomepageResponse {
  banners: IBanner[]
  news: INews[]
  partners: IPartner[]
  statistics: IStatistics
}
