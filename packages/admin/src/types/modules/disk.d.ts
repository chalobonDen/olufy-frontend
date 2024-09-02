import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

export interface IDisk {
  id?: number
  type: string
  capacity: number | string
  speed: number | string
  interface: string
  serialNumber: string
  flag?: string
}

export interface IDisks {
  disks: IDisk[]
}

export interface ISimpleDisk extends IDisk {}

export interface IDiskQueryParams extends IPaginationQuery {
  search?: string
}

export interface IDiskPaginationResponse extends IPaginatedResponse<ISimpleDisk> {}
