import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

export interface IVpsAuto {
  id?: number
  name: string
  os: string
  cpu: string
  ram: string
  storage: string
  disk: string
  networkShare: string
  bandwidth: string
  price: number | string
  status?: boolean
  taxRate?: number | string
  taxAmount?: number | string
}

export interface IIVpsAutos {
  domains: IVpsAuto[]
}

export interface ISimpleVpsAuto
  extends Pick<
    IVpsAuto,
    'id' | 'name' | 'cpu' | 'os' | 'ram' | 'storage' | 'disk' | 'networkShare' | 'bandwidth' | 'price' | 'status'
  > {}

export interface IVpsAutoQueryParams extends IPaginationQuery {
  search?: string
}

export interface IVpsAutoPaginationResponse extends IPaginatedResponse<ISimpleVpsAuto> {}
