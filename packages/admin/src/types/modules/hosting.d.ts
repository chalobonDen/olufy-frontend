import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

export interface IHosting {
  id?: number
  name: number | string
  domain: number | string
  storage: number | string
  bandwidth: number | string
  database: number | string
  fipAccount: string
  webControlPanel: string
  price: number | string
  taxWithheld: number | string
  taxRate?: number | string
  taxAmount?: number | string
  status: boolean
}

export interface IHostingForm {
  id?: number
  name: number | string
  domain: number | string
  storage: number | string
  bandwidth: number | string
  database: number | string
  fipAccount: string
  webControlPanel: string
  price: number | string
  taxWithheld: number | string
  taxRate?: number | string
  taxAmount?: number | string
}

export interface IHostings {
  hostings: IHosting[]
}

export interface ISimpleHosting
  extends Pick<
    IHosting,
    'id' | 'name' | 'domain' | 'storage' | 'bandwidth' | 'database' | 'webControlPanel' | 'price' | 'status'
  > {}

export interface IHostingQueryParams extends IPaginationQuery {
  search?: string
}

export interface IHostingPaginationResponse extends IPaginatedResponse<ISimpleHosting> {}
