import type { IPaginatedResponse, IPaginationQuery } from '../pagination'
import type { IDataCenter } from './data-center'

export interface IRack {
  id?: number
  name: string
  maxSlot: number | string
  detail: string
  dataCenterId: number | string
}

export interface IRacks {
  racks: IRack[]
}

export interface ISimpleRack extends Pick<IRack, 'id' | 'name' | 'maxSlot' | 'detail'> {
  dataCenter: string
}

export interface IRackQueryParams extends IPaginationQuery<ISimpleRack> {
  search?: string
  dataCenterId?: number | string
}

export interface IRackPaginationResponse extends IPaginatedResponse<ISimpleRack> {
  dataCenters: Pick<IDataCenter, 'id', 'name'>
}
