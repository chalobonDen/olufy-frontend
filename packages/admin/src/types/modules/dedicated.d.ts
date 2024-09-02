import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

export interface IDedicated {
  id?: number
  name: string
  storageType: string
  storageCapacity: number | string
  cpu: string
  ram: number | string
  os: string
  networkShare: number | string
  bandwidth: string
  price: number | string
  status: boolean
  taxWithheld: number | string
  taxRate?: number | string
  taxAmount?: number | string
}

export interface IDedicatedForm {
  id?: number
  name: string
  storageType: string
  storageCapacity: number | string
  cpu: string
  ram: number | string
  os: string
  networkShare: number | string
  bandwidth: string
  price: number | string
  taxRate?: number | string
  taxAmount?: number | string
}

export interface IDedicateds {
  Dedicateds: IDedicated[]
}

export interface ISimpleDedicated
  extends Pick<
    IDedicated,
    | 'id'
    | 'name'
    | 'os'
    | 'cpu'
    | 'ram'
    | 'storageCapacity'
    | 'storageType'
    | 'networkShare'
    | 'bandwidth'
    | 'price'
    | 'status'
  > {}

export interface IDedicatedQueryParams extends IPaginationQuery {
  search?: string
}

export interface IDedicatedPaginationResponse extends IPaginatedResponse<ISimpleDedicated> {}
