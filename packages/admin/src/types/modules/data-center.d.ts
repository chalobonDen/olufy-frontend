import type { IPaginatedResponse, IPaginationQuery } from '../pagination'
import type { IRack } from './rack'

export interface IDataCenter {
  id?: number
  name: string
  tel: string
  email: string
  address: string
  detail: string
}

export interface IDataCenters {
  dataCenters: IDataCenter[]
}

export interface ISimpleDataCenter extends Pick<IDataCenter, 'id' | 'name' | 'tel' | 'email' | 'address' | 'detail'> {}

export interface IDataCenterRackItem extends Pick<IRack, 'id' | 'name'> {}

export interface IDataCenterAll {
  dataCenters: {
    id: number
    name: string
    racks: IDataCenterRackItem[]
  }[]
}

export interface IDataCenterQueryParams extends IPaginationQuery<ISimpleDataCenter> {
  search?: string
}

export interface IDataCenterPaginationResponse extends IPaginatedResponse<IDataCenter> {}
